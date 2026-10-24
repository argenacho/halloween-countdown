const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { createContext, runInContext } = require('node:vm');
const { createHash } = require('node:crypto');

const source = readFileSync(require('node:path').join(__dirname, '../google-apps-script/Code.gs'), 'utf8');
const credentials = { id: '82b212ca-8d0c-466d-a409-386100445331', token: 'a'.repeat(64) };

function backend() {
  const rows = [];
  let locked = false;
  let sheetExists = false;
  let properties = {};
  function range(row, col, height = 1, width = 1) {
    return {
      getValues: () => Array.from({ length: height }, (_, i) => Array.from({ length: width }, (_, j) => rows[row - 1 + i]?.[col - 1 + j] ?? '')),
      getValue() { return this.getValues()[0][0]; },
      setValues(values) {
        values.forEach((valuesRow, i) => valuesRow.forEach((value, j) => {
          rows[row - 1 + i] ||= [];
          rows[row - 1 + i][col - 1 + j] = value;
        }));
      },
      setValue(value) { this.setValues([[value]]); },
      setFontWeight() {},
      createTextFinder(value) {
        return { matchEntireCell() { return this; }, findNext() {
          const index = rows.findIndex((r, i) => i >= row - 1 && i < row - 1 + height && r[col - 1] === value);
          return index < 0 ? null : { getRow: () => index + 1 };
        } };
      },
    };
  }
  const sheet = { getLastRow: () => rows.length, appendRow: (row) => rows.push(Array.from(row)), getRange: range, setFrozenRows() {} };
  const spreadsheet = { getId: () => 'private-test-sheet', getSheetByName: () => sheetExists ? sheet : null, insertSheet() { sheetExists = true; return sheet; } };
  const context = createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => spreadsheet, openById: (id) => { assert.equal(id, 'private-test-sheet'); return spreadsheet; }, flush() {} },
    PropertiesService: { getScriptProperties: () => ({ setProperty: (k, v) => { properties[k] = v; }, getProperty: (k) => properties[k] }) },
    LockService: { getScriptLock: () => ({ waitLock() { assert.equal(locked, false); locked = true; }, hasLock: () => locked, releaseLock() { locked = false; } }) },
    Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' }, computeDigest: (_, value) => [...createHash('sha256').update(value).digest()].map((v) => v > 127 ? v - 256 : v) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }) },
  });
  runInContext(source, context);
  context.setup();
  return { rows, setup: () => context.setup(), locked: () => locked,
    post: (payload) => context.doPost({ postData: { contents: JSON.stringify(payload) } }),
    raw: (value) => context.doPost(value), get: () => context.doGet() };
}

const rsvp = (more = {}) => ({ ...credentials, action: 'rsvp', name: 'Nacho', people: 2, ...more });
const food = (more = {}) => ({ ...credentials, action: 'food', foodId: 'huevos-arana', food: 'Huevos de araña', ...more });

test('RSVP, food and changes stay in one row; retries preserve food', () => {
  const api = backend();
  assert.equal(api.post(rsvp()).ok, true);
  assert.equal(api.post(food()).ok, true);
  assert.equal(api.post(food({ foodId: 'custom', food: 'Galletas fantasma' })).ok, true);
  assert.equal(api.post(rsvp({ people: 3 })).ok, true);
  assert.equal(api.rows.length, 2);
  assert.equal(api.rows[1][3], 'Nacho');
  assert.equal(api.rows[1][4], 3);
  assert.equal(api.rows[1][6], 'Galletas fantasma');
  assert.equal(api.rows[1][8], '2026-10-30T19:30:00-03:00');
  assert.equal(api.locked(), false);
  api.setup();
  assert.equal(api.rows.length, 2, 'repeat setup preserves guests');
});

test('an ID alone cannot overwrite either RSVP or food', () => {
  const api = backend();
  api.post(rsvp());
  const snapshot = JSON.stringify(api.rows);
  for (const payload of [rsvp({ token: 'b'.repeat(64), name: 'Otro' }), food({ token: 'b'.repeat(64) }), food({ token: '' })]) {
    assert.equal(api.post(payload).ok, false);
    assert.equal(JSON.stringify(api.rows), snapshot);
    assert.equal(api.locked(), false);
  }
  assert.equal(api.rows[1][7], createHash('sha256').update(credentials.id + ':' + credentials.token).digest('hex'));
  assert.ok(!JSON.stringify(api.rows).includes(credentials.token));
});

test('food cannot create an RSVP and malformed input cannot write', () => {
  const api = backend();
  const invalid = [food(), rsvp({ name: '' }), rsvp({ name: 'x'.repeat(101) }), rsvp({ name: 'x\n=1' }), rsvp({ people: 0 }), rsvp({ people: 1.2 }), rsvp({ people: '2' }), rsvp({ people: 1001 }), rsvp({ honey: 'bot' }), rsvp({ action: 'delete' }), rsvp({ id: '../row' }), null];
  invalid.forEach((payload) => assert.equal(api.post(payload).ok, false));
  assert.equal(api.raw({ postData: { contents: '{bad' } }).ok, false);
  assert.equal(api.raw({ postData: { contents: 'x'.repeat(4097) } }).ok, false);
  assert.equal(api.raw({}).ok, false);
  assert.equal(api.rows.length, 1);
});

test('food validates length and ID before updating', () => {
  const api = backend();
  api.post(rsvp());
  for (const payload of [food({ food: '' }), food({ food: 'x'.repeat(121) }), food({ foodId: '=x' }), food({ foodId: '' })]) {
    assert.equal(api.post(payload).ok, false);
  }
  assert.equal(api.rows[1][6], '');
});

test('spreadsheet formulas are neutralized in both free text fields', () => {
  const api = backend();
  for (const prefix of ['=', '+', '-', '@']) {
    assert.equal(api.post(rsvp({ name: prefix + 'test' })).ok, true);
    assert.equal(api.post(food({ food: prefix + 'test' })).ok, true);
    assert.equal(api.rows[1][3], "'" + prefix + 'test');
    assert.equal(api.rows[1][6], "'" + prefix + 'test');
  }
});

test('GET and errors disclose no RSVP data or credentials', () => {
  const api = backend();
  api.post(rsvp());
  const status = api.get();
  assert.equal(status.service, 'halloween199');
  assert.equal(status.event, '2026-10-30T19:30:00-03:00');
  assert.ok(!JSON.stringify(status).includes('Nacho'));
  const error = api.post(food({ token: 'b'.repeat(64) }));
  assert.deepEqual(Object.keys(error).sort(), ['error', 'ok']);
  assert.equal(api.locked(), false);
});

test('header changes fail closed without modifying rows', () => {
  const api = backend();
  api.rows[0][3] = 'Changed column';
  assert.equal(api.post(rsvp()).ok, false);
  assert.equal(api.rows.length, 1);
  assert.equal(api.locked(), false);
});
