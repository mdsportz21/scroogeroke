function testProcessSubmissions() {
  processSubmissions(SpreadsheetApp.getActiveSheet(), PLAYLIST_ID);
}

function testMarkSubmissionAsUploaded() {
  markSubmissionAsUploaded(5, 2, SpreadsheetApp.getActiveSheet());
}

function testGetSubmissions() {
  const submissions = getSubmissions(SpreadsheetApp.getActiveSheet());
  console.log(`${submissions}`);
}

function testSearchForVideosTrackAndAddToPlaylist() {
  const result = searchForVideosTrackAndAddToPlaylist('odb', 'got your money', PLAYLIST_ID);
  console.log(`${result}`);
}

function testAddVideoToPlaylist() {
  addVideoToPlaylist(PLAYLIST_ID, TEST_VIDEO_ID);
}

function testSearchByKeyword() {
  searchByKeyword('dogs');
}