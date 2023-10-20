# google apps script

This directory contains a series of Google Apps Scripts that can be used to queue entries from a Google Sheet to a 
Youtube playlist.

## Setup

### Google Sheet

Link the response from a Form (Google, Squarespace, etc) to a Google Sheet, with the following columns:

- Submitted On
- Your Name
- Song Title
- Artist

Manually add a 5th column called "submitted".

### Google Apps Scripts

On the Google Sheet, open Apps Scripts. Recreate each of the files from this directory in the Google Apps Scripts 
editor. Follow the instructions in [triggers.js](./triggers.js) to run 