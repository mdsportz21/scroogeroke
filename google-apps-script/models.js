class Submissions {

  constructor(headers, rows) {
    const songTitleIndex = headers.findIndex(header => header.toLowerCase() === 'song title');
    const artistIndex = headers.findIndex(header => header.toLowerCase() === 'artist');
    const wasUploadedIndex = headers.findIndex(header => header.toLowerCase() === 'submitted');

    this.submissions = rows.map((row, index) => {
      const songTitle = row[songTitleIndex];
      const artist = row[artistIndex];
      const wasUploaded = (row[wasUploadedIndex] === true);
      const rowIndex = index + 2;

      return new Submission(songTitle, artist, wasUploaded, rowIndex);
    });
    this.submissionSheetWasUploadedColumnIndex = wasUploadedIndex + 1;
  }

  toString() {
    return `{submissions: ${this.submissions}, submissionSheetWasUploadedColumnIndex: ${this.submissionSheetWasUploadedColumnIndex}}`;
  }
}

class Submission {
  /**
   * @param {String} songTitle
   * @param {String} artist
   * @param {Boolean} wasUploaded
   * @param {Number} submissionSheetRowIndex
   */
  constructor(songTitle, artist, wasUploaded, submissionSheetRowIndex) {
    this.songTitle = songTitle;
    this.artist = artist;
    this.wasUploaded = wasUploaded;
    this.submissionSheetRowIndex = submissionSheetRowIndex;
  }

  toString() {
    return `{songTitle: ${this.songTitle}, artist: ${this.artist}, wasUploaded: ${this.wasUploaded}, submissionSheetRowIndex: ${this.submissionSheetRowIndex}}`;
  }
}