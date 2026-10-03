'use strict';

// Replace with the activated FormSubmit AJAX endpoint for the party organizer.
// Never place API keys or server credentials in this public file.
const RSVP_ENDPOINT = '';

const form = document.getElementById('rsvp-form');
const nameInput = document.getElementById('nombre');
const peopleInput = document.getElementById('personas');
const button = document.getElementById('submit-rsvp');
const status = document.getElementById('form-status');
const privacyNote = document.getElementById('privacy-note');

function showStatus(message, kind) {
  status.textContent = message;
  status.className = `form-status ${kind}`;
}

if (!RSVP_ENDPOINT) {
  button.disabled = true;
  button.classList.add('rsvp-pending');
  button.textContent = 'RSVP próximamente';
  showStatus('La confirmación de asistencia estará disponible pronto.', '');
}

if (RSVP_ENDPOINT) {
  privacyNote.textContent = 'Tu nombre y la cantidad de personas se envían por FormSubmit a quien organiza la fiesta. Los usamos únicamente para organizarla.';
}

nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
peopleInput.addEventListener('input', () => peopleInput.setCustomValidity(''));

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  const name = nameInput.value.trim();
  const people = Number(peopleInput.value);
  nameInput.setCustomValidity(name ? '' : 'Escribí tu nombre.');
  peopleInput.setCustomValidity(Number.isSafeInteger(people) && people >= 1 ? '' : 'Ingresá una cantidad entera de personas, incluyéndote a vos.');
  if (!form.reportValidity()) return;

  if (!RSVP_ENDPOINT) {
    showStatus('La confirmación todavía no está habilitada. Volvé a intentar cuando esté disponible.', 'error');
    return;
  }
  if (form.elements._honey.value) return;

  button.disabled = true;
  button.textContent = 'Enviando tu confirmación…';
  showStatus('Estamos enviando tu RSVP.', '');
  try {
    const response = await fetch(RSVP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        nombre: name,
        personas: people,
        _subject: 'RSVP · Halloween en Casa 199 · 31/10/2026',
        _template: 'table',
        _honey: '',
      }),
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      throw new Error('RSVP not accepted');
    }
    showStatus(`¡Listo, ${name}! Confirmamos ${people === 1 ? 'tu asistencia' : `la asistencia de ${people} personas`}. Nos vemos el 31 en Casa 199. No te olvides del disfraz.`, 'success');
    form.reset();
  } catch (error) {
    showStatus('No pudimos confirmar la recepción. Tus datos siguen en el formulario. Intentá de nuevo en unos minutos.', 'error');
  } finally {
    button.disabled = false;
    button.replaceChildren(document.createTextNode('Confirmar mi asistencia '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    button.append(arrow);
  }
});
