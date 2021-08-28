/* global data */
/* exported data */

const $form = document.forms[0];
const $title = document.forms[0].elements[0];
const $PhotoURL = document.forms[0].elements[1];
const $notes = document.forms[0].elements[2];

const $clickNew = document.querySelector('.new-button');
const $entryForm = document.querySelector('.entry-journal');
const $entries = document.querySelector('.entries-journal');
const $noEntry = document.querySelector('.no-entry-message');
const $imageElement = document.querySelector('img');

if (data.entries.length !== 0) {
  $noEntry.className = 'hidden';
}

function handleInput(event) {
  const photoURL = event.target.value;
  $imageElement.src = photoURL;
}

$PhotoURL.addEventListener('input', handleInput);

function handleClickNew(event) {
  $entryForm.className = 'entry';
  $entries.className = 'hidden';
  document.querySelector('ul').innerHTML = '';
}

$clickNew.addEventListener('click', handleClickNew);

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

  elementImg.setAttribute('src', data.entries[jornalElement].photoURL);
  elementH2.textContent = data.entries[jornalElement].title;
  elementLi2.textContent = data.entries[jornalElement].note;

  document.querySelector('ul').appendChild(elementDiv);
  elementDiv.appendChild(elementDiv2);
  elementDiv2.appendChild(elementImg);
  elementDiv.appendChild(elementDiv3);
  elementDiv3.appendChild(elementLi);
  elementLi.appendChild(elementH2);
  elementDiv3.appendChild(elementLi2);

}

function handleSubmit(event) {
  event.preventDefault();

  const formObject = {
    title: $title.value,
    photoURL: $PhotoURL.value,
    note: $notes.value,
    entryId: data.nextEntryId

  };

  data.entries.unshift(formObject);
  data.nextEntryId = data.nextEntryId + 1;
  $imageElement.src = 'images/placeholder-image-square.jpg';
  $entryForm.className = 'hidden';
  $entries.className = 'entries-journal';
  $noEntry.className = 'hidden';

  $form.reset();

  if (data.entries.length === 1) {
    newEntryDOM(0);
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      newEntryDOM(i);
    }
  }

}

$form.addEventListener('submit', handleSubmit);

function handleDOMContentLoaded(event) {
  for (let i = 0; i < data.entries.length; i++) {
    newEntryDOM(i);
  }
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
