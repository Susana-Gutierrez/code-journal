/* global data */
/* exported data */

const $mainPhotoURL = document.forms[0].elements[1];
const $mainClickNew = document.querySelector('.new-button');
const $mainEntryForm = document.querySelector('.entry-journal');
const $mainEntries = document.querySelector('.entries-journal');
const $mainImageElement = document.querySelector('img');

function handleInput(event) {
  const photoURL = event.target.value;
  $mainImageElement.src = photoURL;
}

$mainPhotoURL.addEventListener('input', handleInput);

function handleClickNew(event) {
  $mainEntryForm.className = 'entry';
  $mainEntries.className = 'hidden';

}

$mainClickNew.addEventListener('click', handleClickNew);
