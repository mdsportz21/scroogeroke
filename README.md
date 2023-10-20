# scroogeroke

This repo contains two scripts:

1. A Google Apps Script that reads additions to a Google Sheet and adds corresponding YouTube videos to a playlist.
2. A Python scrip that polls a YouTube playlist for videos, downloads the videos, and deletes them from the playlist.

## Google Apps Script

See [README.md](./google-apps-script/README.md)

## Python Script

### setup

#### install libraries

```shell
# Create virtual environment
virtualenv scroogeroke

# Change default python to virtual one
source scroogeroke/bin/activate

# install the Google APIs Client Library for Python
pip install --upgrade google-api-python-client

# install the google-auth-oauthlib and google-auth-httplib2 libraries for user authorization.
pip install --upgrade google-auth-oauthlib google-auth-httplib2

# install yt-dlp
python3 -m pip install -U yt-dlp
```

#### generate credentials

Follow the [Youtube Data API Python Quickstart instructions](https://developers.google.com/youtube/v3/quickstart/python)
to generate credentials. Copy the credentials file to the root and name it `YOUR_CLIENT_SECRET_FILE.json`.

#### add env vars

Create two environment variables.

```shell
# The ID of the youtube playlist that you want to poll
export YOUTUBE_PLAYLIST_ID=<your_youtube_playlist_id>
# The location that you want your videos to download to
export YOUTUBE_DOWNLOAD_DIR=<your_download_dir>
```

### run

```shell

# Change default python to virtual one
source scroogeroke/bin/activate

# run the file
python scheduler.py
```