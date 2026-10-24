// Bound to the organizer's PRIVATE spreadsheet. Deploy as a Web App executing
// as the owner, accessible to Anyone. No credentials belong in frontend files.
const RSVP_TAB = 'Confirmaciones';
const RSVP_EVENT = '2026-10-30T19:30:00-03:00';
const RSVP_HEADERS = ['ID', 'Creado', 'Actualizado', 'Nombre', 'Personas', 'Comida ID', 'Comida elegida', 'Token SHA256', 'Fiesta'];

// Run once from the spreadsheet's Extensions > Apps Script editor and authorize.
// It never makes the spreadsheet public or erases existing rows.
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open Apps Script from the destination spreadsheet.');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
    let sheet = spreadsheet.getSheetByName(RSVP_TAB);
    if (!sheet) sheet = spreadsheet.insertSheet(RSVP_TAB);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(RSVP_HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, RSVP_HEADERS.length).setFontWeight('bold');
    }
    checkHeaders_(sheet);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  // Public health information only. Never return rows, names or tokens.
  return json_({ ok: true, service: 'halloween199', event: RSVP_EVENT });
}

function doPost(e) {
  let lock;
  try {
    const raw = e && e.postData && e.postData.contents;
    if (typeof raw !== 'string' || raw.length > 4096) throw new Error('invalid');
    const input = JSON.parse(raw);
    if (!input || !['rsvp', 'food'].includes(input.action) || input.honey) throw new Error('invalid');
    if (typeof input.id !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(input.id)) throw new Error('invalid');
    if (typeof input.token !== 'string' || !/^[a-f0-9]{64}$/.test(input.token)) throw new Error('invalid');
    const name = input.action === 'rsvp' ? text_(input.name, 100) : '';
    if (input.action === 'rsvp' && (!Number.isInteger(input.people) || input.people < 1 || input.people > 1000)) throw new Error('invalid');
    const food = input.action === 'food' ? text_(input.food, 120) : '';
    const foodId = input.action === 'food' ? text_(input.foodId, 80) : '';
    if (foodId && !/^[a-z0-9-]+$/.test(foodId)) throw new Error('invalid');

    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('setup');
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(RSVP_TAB);
    checkHeaders_(sheet);
    const count = sheet.getLastRow();
    const match = count > 1 ? sheet.getRange(2, 1, count - 1, 1).createTextFinder(input.id).matchEntireCell(true).findNext() : null;
    const row = match ? match.getRow() : 0;
    const tokenHash = hash_(input.id + ':' + input.token);
    if (row && sheet.getRange(row, 8).getValue() !== tokenHash) throw new Error('unauthorized');
    if (!row && input.action !== 'rsvp') throw new Error('unauthorized');
    const now = new Date();
    if (input.action === 'rsvp') {
      if (row) {
        // Retried submissions update this row and preserve its food choice.
        sheet.getRange(row, 3, 1, 3).setValues([[now, cell_(name), input.people]]);
      } else {
        if (count >= 10001) throw new Error('capacity');
        sheet.appendRow([input.id, now, now, cell_(name), input.people, '', '', tokenHash, RSVP_EVENT]);
      }
    } else {
      sheet.getRange(row, 3).setValue(now);
      sheet.getRange(row, 6, 1, 2).setValues([[foodId, cell_(food)]]);
    }
    SpreadsheetApp.flush();
    return json_({ ok: true, id: input.id, action: input.action });
  } catch (error) {
    // Do not expose data, implementation details, or credentials to anonymous callers.
    return json_({ ok: false, error: 'No se pudo guardar. Revisá los datos e intentá de nuevo.' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function checkHeaders_(sheet) {
  if (!sheet || JSON.stringify(sheet.getRange(1, 1, 1, RSVP_HEADERS.length).getValues()[0]) !== JSON.stringify(RSVP_HEADERS)) {
    throw new Error('Unexpected sheet layout.');
  }
}

function text_(value, max) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max || /[\u0000-\u001f\u007f]/.test(value)) throw new Error('invalid');
  return value.trim();
}

function cell_(value) {
  // Treat user text as text rather than a spreadsheet/CSV formula.
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function hash_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(function (n) { return ('0' + ((n + 256) % 256).toString(16)).slice(-2); }).join('');
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
