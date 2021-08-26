/* global data */
/* exported data */

const $form = document.forms[0];
const $title = document.forms[0].elements[0];
const $PhotoURL = document.forms[0].elements[1];
const $notes = document.forms[0].elements[2];

var $clickNew = document.querySelector('.new-button');
var $entryForm = document.querySelector('.entry-journal');
var $entries = document.querySelector('.entries-journal');
var $noEntry = document.querySelector('.no-entry-message');
var $imageElement = document.querySelector('img');

var codeJournal = [];

var previouscodeJournalJSON = localStorage.getItem('javascript-local-storage');

if (previouscodeJournalJSON !== null) {
  codeJournal = JSON.parse(previouscodeJournalJSON);
}

if (codeJournal.length !== 0) {
  $noEntry.className = 'hidden';
}

function handleInput(event) {
  const photoURL = event.target.value;
  $imageElement.src = photoURL;
}

function handleSubmit(event) {
  event.preventDefault();
  const formObject = {
    nextEntryId: codeJournal.length + 1,
    title: $title.value,
    photoURL: $PhotoURL.value,
    note: $notes.value
  };

  codeJournal.push(formObject);
  newEntryDOM(-1);
  $imageElement.src = 'images/placeholder-image-square.jpg';

  $form.reset();
  $entryForm.className = 'hidden';
  $entries.className = 'entries-journal';
  $noEntry.className = 'hidden';

}

function handleBeforeUnload(event) {
  const codeJournalJSON = JSON.stringify(codeJournal);
  localStorage.setItem('javascript-local-storage', codeJournalJSON);
}

$PhotoURL.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('beforeunload', handleBeforeUnload);

function newEntryDOM(jornalElement) {

  var elementDiv = document.createElement('div');
  elementDiv.setAttribute('class', 'row');
  var elementDiv2 = document.createElement('div');
  elementDiv2.setAttribute('class', 'column-full column-half');
  var elementImg = document.createElement('img');

  var elementDiv3 = document.createElement('div');
  elementDiv3.setAttribute('class', 'column-half');
  var elementLi = document.createElement('li');
  var elementH2 = document.createElement('h2');

  var elementLi2 = document.createElement('li');

  if (jornalElement === -1) {
    elementImg.setAttribute('src', $PhotoURL.value);
    elementH2.textContent = $title.value;
    elementLi2.textContent = $notes.value;
  } else {
    elementImg.setAttribute('src', codeJournal[jornalElement].photoURL);
    elementH2.textContent = codeJournal[jornalElement].title;
    elementLi2.textContent = codeJournal[jornalElement].note;
  }

  document.querySelector('ul').appendChild(elementDiv);
  elementDiv.appendChild(elementDiv2);
  elementDiv2.appendChild(elementImg);
  elementDiv.appendChild(elementDiv3);
  elementDiv3.appendChild(elementLi);
  elementLi.appendChild(elementH2);
  elementDiv3.appendChild(elementLi2);

}

function handleDOMContentLoaded(event) {
  for (var i = 0; i < codeJournal.length; i++) {
    newEntryDOM(i);
  }

}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleClickNew(event) {
  $entryForm.className = 'entry';
  $entries.className = 'hidden';

}

$clickNew.addEventListener('click', handleClickNew);
