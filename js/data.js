/* exported data */

var data = [];

const $form = document.forms[0];
const $title = document.forms[0].elements[0];
const $PhotoURL = document.forms[0].elements[1];
const $notes = document.forms[0].elements[2];

const $entryForm = document.querySelector('.entry-journal');
const $entries = document.querySelector('.entries-journal');
const $noEntry = document.querySelector('.no-entry-message');
const $imageElement = document.querySelector('img');

const previouscodeJournalJSON = localStorage.getItem('javascript-local-storage');

if (previouscodeJournalJSON !== null) {
  data = JSON.parse(previouscodeJournalJSON);
}

if (data.length !== 0) {
  $noEntry.className = 'hidden';
}

function newEntryDOM(jornalElement) {

  const elementDiv = document.createElement('div');
  elementDiv.setAttribute('class', 'row');
  const elementDiv2 = document.createElement('div');
  elementDiv2.setAttribute('class', 'column-full column-half');
  const elementImg = document.createElement('img');

  const elementDiv3 = document.createElement('div');
  elementDiv3.setAttribute('class', 'column-half');
  const elementLi = document.createElement('li');
  const elementH2 = document.createElement('h2');

  const elementLi2 = document.createElement('li');

  if (jornalElement === -1) {
    elementImg.setAttribute('src', $PhotoURL.value);
    elementH2.textContent = $title.value;
    elementLi2.textContent = $notes.value;
  } else {
    elementImg.setAttribute('src', data[jornalElement].entries.photoURL);
    elementH2.textContent = data[jornalElement].entries.title;
    elementLi2.textContent = data[jornalElement].entries.note;
  }

  document.querySelector('ul').appendChild(elementDiv);
  elementDiv.appendChild(elementDiv2);
  elementDiv2.appendChild(elementImg);
  elementDiv.appendChild(elementDiv3);
  elementDiv3.appendChild(elementLi);
  elementLi.appendChild(elementH2);
  elementDiv3.appendChild(elementLi2);

}

function handleSubmit(event) {
  let index = 1;
  event.preventDefault();

  const formObject = {
    title: $title.value,
    photoURL: $PhotoURL.value,
    note: $notes.value
  };

  if (data.length !== 0) {
    index = data[data.length - 1].nextEntryId + 1;
  }

  data.push({ view: 'entry-form', entries: formObject, editing: null, nextEntryId: index });
  index = index + 1;

  newEntryDOM(-1);

  $form.reset();
  $imageElement.src = 'images/placeholder-image-square.jpg';
  $entryForm.className = 'hidden';
  $entries.className = 'entries-journal';
  $noEntry.className = 'hidden';

}

$form.addEventListener('submit', handleSubmit);

function handleBeforeUnload(event) {
  const codeJournalJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', codeJournalJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);

function handleDOMContentLoaded(event) {
  for (let i = 0; i < data.length; i++) {
    newEntryDOM(i);
  }
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
