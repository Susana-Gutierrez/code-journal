/* global data */
/* exported data */

const $form = document.forms[0];
const $title = document.forms[0].elements[0];
const $PhotoURL = document.forms[0].elements[1];
const $notes = document.forms[0].elements[2];
var codeJournal = [];
var previouscodeJournalJSON = localStorage.getItem('javascript-local-storage');

if (previouscodeJournalJSON !== null) {
  codeJournal = JSON.parse(previouscodeJournalJSON);
}

var $imageElement = document.querySelector('img');

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
  $imageElement.src = 'images/placeholder-image-square.jpg';
  $form.reset();

}

function handleBeforeUnload(event) {
  const codeJournalJSON = JSON.stringify(codeJournal);
  localStorage.setItem('javascript-local-storage', codeJournalJSON);

}

$PhotoURL.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('beforeunload', handleBeforeUnload);
