'use strict';

const isDemo = HalloweenRSVP.demo;

const form = document.getElementById('rsvp-form');
const nameInput = document.getElementById('nombre');
const peopleInput = document.getElementById('personas');
const button = document.getElementById('submit-rsvp');
const status = document.getElementById('form-status');
const privacyNote = document.getElementById('privacy-note');
button.disabled = !HalloweenRSVP.endpoint && !isDemo;

function showStatus(message, kind) {
  status.textContent = message;
  status.className = `form-status ${kind}`;
}

if (!HalloweenRSVP.endpoint && !isDemo) {
  button.disabled = true;
  button.classList.add('rsvp-pending');
  button.textContent = 'RSVP próximamente';
  showStatus('La confirmación de asistencia estará disponible pronto.', '');
}

if (isDemo) {
  showStatus('Modo demostración: probá el recorrido. No se registra asistencia real.', '');
  privacyNote.textContent = 'Estos datos se usan únicamente para mostrar la confirmación de ejemplo en esta pestaña.';
}

if (HalloweenRSVP.endpoint) {
  privacyNote.textContent = 'Guardamos tu nombre, la cantidad de personas y, si la elegís, la comida que vas a traer en una planilla privada de quien organiza. Usamos estos datos únicamente para organizar la fiesta.';
}

nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
peopleInput.addEventListener('input', () => peopleInput.setCustomValidity(''));

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  const name = nameInput.value.trim();
  const people = Number(peopleInput.value);
  nameInput.setCustomValidity(name ? '' : 'Escribí tu nombre.');
  peopleInput.setCustomValidity(Number.isSafeInteger(people) && people >= 1 && people <= 1000 ? '' : 'Ingresá una cantidad entera de personas entre 1 y 1000, incluyéndote a vos.');
  if (!form.reportValidity()) return;

  if (!HalloweenRSVP.endpoint && !isDemo) {
    showStatus('La confirmación todavía no está habilitada. Volvé a intentar cuando esté disponible.', 'error');
    return;
  }
  if (form.elements._honey.value) return;

  button.disabled = true;
  button.textContent = isDemo ? 'Preparando tu pase…' : 'Enviando tu confirmación…';
  showStatus(isDemo ? 'Abriendo tu confirmación de ejemplo…' : 'Estamos enviando tu RSVP.', '');
  let redirecting = false;
  try {
    if (isDemo) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      try {
        sessionStorage.removeItem('halloween199.food');
        sessionStorage.setItem('halloween199.rsvp', JSON.stringify({ name, people, demo: true }));
      } catch (error) {
        // The demo can render without personal details when storage is unavailable.
      }
      redirecting = true;
      window.location.assign('confirmacion.html#demo');
      return;
    }
    const credentials = HalloweenRSVP.pendingCredentials();
    // Verify storage before sending: these credentials are needed on the next page.
    const savedReceipt = { ...credentials, name, people, demo: false, confirmed: false };
    sessionStorage.setItem('halloween199.rsvp', JSON.stringify(savedReceipt));
    await HalloweenRSVP.send('rsvp', { ...credentials, name, people, honey: form.elements._honey.value });
    sessionStorage.removeItem('halloween199.food');
    sessionStorage.setItem('halloween199.rsvp', JSON.stringify({ ...savedReceipt, confirmed: true }));
    showStatus(`¡Listo, ${name}! Nos vemos el viernes 30 desde las 19:30 en Casa 199. No te olvides del disfraz.`, 'success');
    redirecting = true;
    window.location.assign('confirmacion.html#recibido');
  } catch (error) {
    const storageBlocked = ['SecurityError', 'QuotaExceededError'].includes(error.name);
    showStatus(storageBlocked
      ? 'Tu navegador no permite conservar el pase. Habilitá el almacenamiento de este sitio para confirmar y después elegir la comida. Tus datos siguen en el formulario.'
      : 'No pudimos confirmar la recepción. Tus datos siguen en el formulario. Intentá de nuevo en unos minutos.', 'error');
  } finally {
    if (!redirecting) {
      button.disabled = false;
      button.replaceChildren(document.createTextNode('Confirmar mi asistencia '));
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      button.append(arrow);
    }
  }
});
