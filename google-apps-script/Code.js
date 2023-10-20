// TODO: enter your playlist ID here
const PLAYLIST_ID = 'YOUR_PLAYLIST_ID';

function myFunction() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const submissions = getSubmissions(sheet);
  const unUploadedSubmissions = submissions.submissions.filter(submission => !submission.wasUploaded);

  for (const submission of unUploadedSubmissions) {
    const columnIndex = submissions.submissionSheetWasUploadedColumnIndex;
    const rowIndex = submission.submissionSheetRowIndex;
    markSubmissionAsUploaded(columnIndex, rowIndex, sheet);
  }
}

/**
 * Gets list of videos that haven't been added to the Youtube playlist yet.
 * For each, query Youtube for top result and add to playlist.
 */
function processSubmissions(sheet, playlistId) {
  const submissions = getSubmissions(sheet);
  const unUploadedSubmissions = submissions.submissions.filter(submission => !submission.wasUploaded);

  for (const submission of unUploadedSubmissions) {
    const video = searchForKaraokeVideo(submission.artist, submission.songTitle);
    addVideoToPlaylist(playlistId, video.id.videoId);
    const columnIndex = submissions.submissionSheetWasUploadedColumnIndex;
    const rowIndex = submission.submissionSheetRowIndex;
    markSubmissionAsUploaded(columnIndex, rowIndex, sheet);
  }
}

/**
 * @param {number}  columnIndex - the index of the column of the cell to update. note that sheet indexes are 1-indexed.
 * @param {number}  rowIndex - the index of the row of the cell to update.
 * @param {Sheet}   sheet - the sheet to update
 */
function markSubmissionAsUploaded(columnIndex, rowIndex, sheet) {
  console.log(`Updating value at row=${rowIndex}, column=${columnIndex}`);
  const rangeToUpdate = sheet.getRange(rowIndex, columnIndex);
  rangeToUpdate.setValue(true);
  console.log(`Updated value to true at row=${rowIndex}, column=${columnIndex}`);
}

/**
 * Get all karaoke requests.
 *
 * @returns {Submissions} list of karaoke requests submissions
 */
function getSubmissions(sheet) {
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  const [headers, ...rows] = values.filter(hasContent);

  return new Submissions(headers, rows);
}

/**
 * @param {Array<Object>} row
 * @returns {Boolean}
 */
function hasContent(row) {
  return row.length > 0 && row[0];
}

/**
 * Adds the top result from a search for a karaoke video for the given parameters, and adds to the given playlist.
 * @param {string}  artist - the song artist name
 * @param {string}  title - the song title
 * @param {string}  playlistId - the Youtube playlist ID
 */
function searchForVideosTrackAndAddToPlaylist(artist, title, playlistId) {
  const firstPlaylistItem = searchForKaraokeVideo(artist, title);
  console.log(`Adding video ${firstPlaylistItem.snippet.title} to playlist=${playlistId}`);
  const videoId = firstPlaylistItem.id.videoId;
  const result = addVideoToPlaylist(playlistId, videoId);
  console.log(`Added video ${firstPlaylistItem.snippet.title} to playlist=${playlistId}`);
  return result;
}


/**
 * Get the top result from a search for a karaoke video for the given parameters.
 * @param {string}  artist - the song artist name
 * @param {string}  title - the song title
 */
function searchForKaraokeVideo(artist, title) {
  const results = searchForKaraokeVideos(artist, title, 1);
  if (results === null) {
    console.log('Unable to search videos: null results returned');
    return null;
  }

  return results.items[0];
}

/**
 * Queries the Youtube API and returns a list of 5 search results.
 * @param {string}  artist - the name of the artist
 * @param {string}  title - the title of the song
 * @param {number}  maxResults - the maximum number of search results to return
 * @returns {Array|null}  List of videos objects of type https://developers.google.com/youtube/v3/docs/videos#resource
 */
function searchForKaraokeVideos(artist, title, maxResults) {
  const keyword = `${title} ${artist} karaoke`;
  console.log(`Searching youtube for query="${keyword}"`);

  try {
    const results = YouTube.Search.list('id,snippet', {
      q: keyword,
      maxResults: maxResults
    });
    if (results === null) {
      console.log('Unable to search videos: null results returned');
    } else {
      console.log(`Search returned ${results.items.length} results for ${keyword}`);
    }

    return results;
  } catch (err) {
    console.log('Failed to search youtube for query="${keyword}": Failed with an error %s', err.message);
    throw err;
  }
}

/**
 * Searches for videos about dogs, then logs the video IDs and title.
 * Note that this sample limits the results to 25. To return more
 * results, pass additional parameters as shown in the YouTube Data API docs.
 * @see https://developers.google.com/youtube/v3/docs/search/list
 */
function searchByKeyword(keyword) {
  try {
    const results = YouTube.Search.list('id,snippet', {
      q: keyword,
      maxResults: 25
    });
    if (results === null) {
      console.log('Unable to search videos');
      return;
    }
    results.items.forEach((item) => {
      console.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    });
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

/**
 * Adds the video to the Youtube playlist
 * @param {string}  playlistId - the ID of the Youtube playlist to add the video to
 * @param {string}  videoId - the ID of the Youtube video to add to the playlist
 */
function addVideoToPlaylist(playlistId, videoId) {
  console.log(`Adding video=${videoId} into playlist=${playlistId}`)
  try {
    const snippet = buildPlaylistInsertSnippet(playlistId, videoId);
    const result = YouTube.PlaylistItems.insert({
      snippet: snippet
    }, 'snippet');
    console.log(`Added video=${videoId} into playlist=${playlistId} at position ${result.snippet.position}`);
    return result;
  } catch (err) {
    console.log(`Failed to insert video=${videoId} into playlist=${playlistId}: Failed with an error ${err.message}`);
  }
}

/**
 * Builds the request object for inserting a video into a playlist.
 * @param {string}  playlistId - the ID of the Youtube playlist to add the video to
 * @param {string}  videoId - the ID of the Youtube video to add to the playlist
 */
function buildPlaylistInsertSnippet(playlistId, videoId) {
  return {
    playlistId: playlistId,
    resourceId: {
      kind: "youtube#video",
      videoId: videoId
    }
  };
}

/**
 * (Debugging) Write all of the playlists on my Youtube account to the console.
 */
function listMyPlaylists() {
  const result = getMyPlaylists();
  result.items.forEach((item) => console.log(`[${item.id}]: ${item.snippet.title}`));
}

/**
 * (Debugging) Retrieve all of the playlists on my Youtube account.
 */
function getMyPlaylists() {
  return YouTube.Playlists.list('snippet', {
    "maxResults": 25,
    "mine": true
  });
}