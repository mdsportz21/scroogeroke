const SHEET_NAME = 'Sheet1';

/**
 * To run automatically on spreadsheet changes, change AUTO_UPDATE_FORM to true.
 * To run manually, run testProcessSubmissions()
 */
const AUTO_UPDATE_FORM = true;

/**
 * From https://developers.google.com/apps-script/guides/triggers#onedite
 * runs automatically when a user changes the value of any cell in a spreadsheet.
 * Most onEdit(e) triggers use the information in the event object to respond appropriately.
 *
 * @param {Event} e
 */
function updateFormOnEdit(e) {
  if (!AUTO_UPDATE_FORM) {
    return;
  }

  console.log(`source: ${e.source}, changeType: ${e.changeType}`);
  const sheet = e.source.getSheetByName(SHEET_NAME);
  processSubmissions(sheet, PLAYLIST_ID);
}

/**
 * This needs to be run once to install the trigger.
 * The built-in `onEdit` trigger does not have permissions to run `FormApp.openById()`,
 * so we need to install our own trigger.
 */
function createEditTrigger() {
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('updateFormOnEdit')
    .forSpreadsheet(ss)
    .onChange()
    .create();
}
