# -*- coding: utf-8 -*-

# Sample Python code for youtube.playlistItems.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from yt_dlp import YoutubeDL

SCOPES = ["https://www.googleapis.com/auth/youtube"]
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

# ID for https://www.youtube.com/playlist?list=PLINB3ebud-ZjoTqhFjN90TyW8VGbLfxQr
PLAYLIST_ID = 'PLINB3ebud-ZjoTqhFjN90TyW8VGbLfxQr'
FETCH_PLAYLIST_ITEMS_LIMIT = 5

YDL_OPTS = {
    'paths': {
        'home': '/Users/ttaylor/Movies/scroogeroke'
    }
}


def main():
    # debug_fetch_playlist_items()
    # debug_delete_playlist_item()
    debug_download_video()
    pass


def debug_download_video():
    urls = ['https://www.youtube.com/watch?v=HuA4-D9S3Gw']
    with YoutubeDL(YDL_OPTS) as ydl:
        ydl.download(urls)
    pass


def debug_delete_playlist_item():
    youtube = create_api_client()
    playlist_items = fetch_playlist_items(youtube, PLAYLIST_ID)
    for item in playlist_items:
        delete_playlist_item(item, youtube)


def delete_playlist_item(item, youtube):
    snippet = item['snippet']
    title = snippet['title']
    playlist_id = snippet['playlistId']
    print(f'Deleting {title} from {playlist_id}')

    item_id = item['id']
    request = youtube.playlistItems().delete(
        id=item_id
    )
    request.execute()
    print(f'Deleted {title} from {playlist_id}')


def debug_fetch_playlist_items():
    youtube = create_api_client()
    playlist_items = fetch_playlist_items(youtube, PLAYLIST_ID)
    print(playlist_items)


def fetch_playlist_items(youtube, playlist_id):
    print(f'Fetching playlist items for playlist={playlist_id}')
    request = youtube.playlistItems().list(
        part="snippet,contentDetails",
        maxResults=FETCH_PLAYLIST_ITEMS_LIMIT,
        playlistId=playlist_id
    )
    response = request.execute()
    playlist_items = response['items']
    print(f'Fetched {len(playlist_items)} playlist items for playlist={playlist_id}')
    return playlist_items


def create_api_client():
    credentials = get_credentials()
    # create an API client
    youtube = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)
    return youtube


def get_credentials():
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    client_secrets_file = "YOUR_CLIENT_SECRET_FILE.json"
    # Get credentials
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        client_secrets_file, SCOPES)
    credentials = flow.run_local_server()
    return credentials


if __name__ == "__main__":
    main()
