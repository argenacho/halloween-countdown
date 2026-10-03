'use strict';

const categoryLabels = { dulce: 'Dulce', salado: 'Salado', bebida: 'Bebida' };
const track = document.getElementById('food-track');
const filters = [...document.querySelectorAll('.food-filters button')];
const previousButton = document.getElementById('food-prev');
const nextButton = document.getElementById('food-next');
const counter = document.getElementById('food-counter');
const choicePanel = document.getElementById('food-choice');
const choiceTitle = document.getElementById('food-choice-title');
const choiceHelp = document.getElementById('food-choice-help');
const saveButton = document.getElementById('food-save');
const foodStatus = document.getElementById('food-status');
const customForm = document.getElementById('food-custom-form');
const customInput = document.getElementById('food-custom-name');
let visibleIdeas = FOOD_IDEAS;
let currentIndex = 0;
let selected = null;
let scrollFrame = null;

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function updateControls() {
  counter.textContent = `${currentIndex + 1} / ${visibleIdeas.length}`;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === visibleIdeas.length - 1;
}

function pickIdea(idea) {
  selected = { id: idea.id || 'custom', title: idea.title };
  choicePanel.hidden = false;
  choiceTitle.textContent = selected.title;
  choiceHelp.textContent = 'Podés cambiar de idea antes de guardar.';
  foodStatus.textContent = '';
  saveButton.textContent = 'Guardar elección de prueba';
  document.querySelectorAll('.food-pick').forEach((button) => {
    const active = button.dataset.ideaId === selected.id;
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? 'Idea elegida' : 'Voy a llevar esto';
  });
}

function renderIdeas() {
  track.replaceChildren();
  currentIndex = 0;
  visibleIdeas.forEach((idea, index) => {
    const card = makeElement('article', 'food-card');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'diapositiva');
    card.setAttribute('aria-label', `${index + 1} de ${visibleIdeas.length}: ${idea.title}`);
    const figure = makeElement('figure', 'food-photo');
    const image = document.createElement('img');
    image.src = idea.image;
    image.alt = idea.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 1100;
    image.height = 825;
    figure.append(image);
    if (idea.photoNote) {
      figure.append(makeElement('figcaption', '', idea.photoNote));
    }
    const info = makeElement('div', 'food-info');
    const isPartyPhoto = idea.credit.kind === 'party';
    const category = `${categoryLabels[idea.category]}${isPartyPhoto ? ' · De nuestras fiestas' : ''}`;
    info.append(makeElement('p', 'food-category', category));
    info.append(makeElement('h3', '', idea.title));
    info.append(makeElement('p', 'food-description', idea.description));
    info.append(makeElement('p', 'food-tip', idea.tip));
    const pick = makeElement('button', 'button button-red food-pick', selected?.id === idea.id ? 'Idea elegida' : 'Voy a llevar esto');
    pick.type = 'button';
    pick.dataset.ideaId = idea.id;
    pick.setAttribute('aria-pressed', String(selected?.id === idea.id));
    pick.setAttribute('aria-label', `Elegir ${idea.title}`);
    pick.addEventListener('click', () => {
      pickIdea(idea);
      choicePanel.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
    info.append(pick);
    const credit = makeElement('details', 'food-credit');
    credit.append(makeElement('summary', '', 'Créditos de la foto'));
    if (isPartyPhoto) {
      credit.append(makeElement('p', '', 'Foto propia de fiestas anteriores, compartida por quien organiza Casa 199.'));
    } else {
      const attribution = makeElement('p', '', `${idea.credit.author} · `);
      const license = makeElement('a', '', idea.credit.license);
      license.href = idea.credit.licenseUrl;
      license.target = '_blank';
      license.rel = 'noopener noreferrer';
      const source = makeElement('a', '', 'Original en Wikimedia Commons');
      source.href = idea.credit.source;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      attribution.append(license, document.createTextNode(' · '), source, document.createTextNode('. Foto sin modificaciones.'));
      credit.append(attribution);
    }
    info.append(credit);
    card.append(figure, info);
    track.append(card);
  });
  track.scrollLeft = 0;
  updateControls();
}

function navigateTo(index) {
  currentIndex = Math.max(0, Math.min(index, visibleIdeas.length - 1));
  const card = track.children[currentIndex];
  track.scrollTo({ left: card.offsetLeft - track.children[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  updateControls();
}

previousButton.addEventListener('click', () => navigateTo(currentIndex - 1));
nextButton.addEventListener('click', () => navigateTo(currentIndex + 1));
track.addEventListener('keydown', (event) => {
  if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const index = event.key === 'Home' ? 0 : event.key === 'End' ? visibleIdeas.length - 1 : currentIndex + (event.key === 'ArrowRight' ? 1 : -1);
  navigateTo(index);
});
track.addEventListener('scroll', () => {
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    const first = track.children[0];
    const second = track.children[1];
    const step = second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
    currentIndex = Math.max(0, Math.min(Math.round(track.scrollLeft / step), visibleIdeas.length - 1));
    updateControls();
  });
}, { passive: true });
filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
  visibleIdeas = button.dataset.category === 'all' ? FOOD_IDEAS : FOOD_IDEAS.filter((idea) => idea.category === button.dataset.category);
  renderIdeas();
}));

customInput.addEventListener('input', () => customInput.setCustomValidity(''));
customForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = customInput.value.trim();
  customInput.setCustomValidity(title ? '' : 'Contanos qué vas a traer.');
  if (!customForm.reportValidity()) return;
  pickIdea({ id: 'custom', title });
  choicePanel.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

saveButton.addEventListener('click', () => {
  if (!selected) return;
  let retained = false;
  try {
    sessionStorage.setItem('halloween199.food', JSON.stringify({ ...selected, person: receipt?.name || '' }));
    retained = true;
  } catch (error) {
    // Selection still works in this view when browser storage is blocked.
  }
  choiceHelp.textContent = 'Podés elegir otra idea cuando quieras.';
  saveButton.textContent = 'Actualizar elección de prueba';
  foodStatus.textContent = `Elegiste «${selected.title}». ${retained ? 'Tu elección de prueba queda en esta pestaña.' : 'Podés verla acá, pero no se conservará al recargar.'} No se envió a quien organiza.`;
});

try {
  const saved = JSON.parse(sessionStorage.getItem('halloween199.food'));
  if (saved && saved.person === (receipt?.name || '') && typeof saved.title === 'string' && saved.title.trim() && saved.title.length <= 120) {
    const idea = FOOD_IDEAS.find((item) => item.id === saved.id);
    if (idea || saved.id === 'custom') {
      pickIdea(idea || { id: 'custom', title: saved.title });
      choiceHelp.textContent = 'Esta es tu elección de prueba. Podés cambiarla.';
    }
  }
} catch (error) {
  // A fresh selection remains available without storage.
}
renderIdeas();
