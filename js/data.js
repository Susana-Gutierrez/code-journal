/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const previouscodeJournalJSON = localStorage.getItem('javascript-local-storage');

if (previouscodeJournalJSON !== null) {
  data = JSON.parse(previouscodeJournalJSON);
}

function handleBeforeUnload(event) {
  const codeJournalJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', codeJournalJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
