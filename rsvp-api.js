'use strict';

(() => {
  const config = window.HALLOWEEN_RSVP_CONFIG || {};
  const endpoint = config.endpoint || '';
  const demo = !endpoint && config.demo === true;
  const validCredentials = (value) => value && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value.id) && /^[a-f0-9]{64}$/.test(value.token);

  async function send(action, payload) {
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint)) {
      throw new Error('Missing Apps Script deployment');
    }
    // A simple POST avoids the CORS preflight Apps Script does not implement.
    // Always read the acknowledgement; an opaque no-cors response proves nothing.
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      credentials: 'omit',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ ...payload, action }),
      signal: AbortSignal.timeout(30000),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true || result.id !== payload.id || result.action !== action) {
      throw new Error('Save not acknowledged');
    }
    return result;
  }

  function pendingCredentials() {
    let saved;
    try {
      saved = JSON.parse(sessionStorage.getItem('halloween199.pending') || 'null');
    } catch (error) {
      // Overwrite malformed data; a blocked storage write below prevents submission.
    }
    if (validCredentials(saved)) return saved;
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const value = { id: crypto.randomUUID(), token: Array.from(bytes, (n) => n.toString(16).padStart(2, '0')).join('') };
    // Retain before sending so a timeout can be retried with the same ID.
    sessionStorage.setItem('halloween199.pending', JSON.stringify(value));
    return value;
  }

  window.HalloweenRSVP = Object.freeze({ endpoint, demo, send, pendingCredentials, validCredentials });
})();
