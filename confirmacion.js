'use strict';

// This is a display receipt; the external RSVP receiver remains the source of truth.
// Personal details stay in this browser tab and never enter a public URL.
let receipt = null;
try {
  const saved = JSON.parse(sessionStorage.getItem('halloween199.rsvp'));
  if (saved && typeof saved.name === 'string' && saved.name.trim() && saved.name.length <= 100 && Number.isSafeInteger(saved.people) && saved.people >= 1) {
    receipt = saved;
  }
} catch (error) {
  // A generic receipt still works when browser storage is unavailable.
}

const isDemo = window.location.hash === '#demo' || receipt?.demo === true;
if (receipt || window.location.hash === '#recibido' || isDemo) {
  document.title = isDemo ? 'Confirmación de ejemplo · Halloween en Casa 199' : 'Asistencia confirmada · Halloween en Casa 199';
  document.getElementById('receipt-label').textContent = isDemo ? 'Modo demostración · RSVP de ejemplo' : 'Señal recibida · Asistencia confirmada';
  document.getElementById('receipt-title').replaceChildren(
    document.createTextNode('Ya estás'),
    document.createElement('br'),
  );
  const accent = document.createElement('em');
  accent.textContent = 'del otro lado.';
  document.getElementById('receipt-title').append(accent);
  document.getElementById('receipt-message').textContent = receipt
    ? `¡${receipt.name}, ${isDemo ? 'este es tu pase de prueba' : 'recibimos tu confirmación'}! ${receipt.people === 1 ? 'Te esperamos' : `Los esperamos: ${receipt.people} personas`} para una noche fuera de este mundo.`
    : isDemo ? 'Este es tu pase de prueba. Así se verá la confirmación de tu asistencia.' : 'Recibimos tu confirmación. Te esperamos para una noche fuera de este mundo.';
  document.getElementById('receipt-demo-note').hidden = !isDemo;
}
