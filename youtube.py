"""
Downloads videos using https://github.com/yt-dlp/yt-dlp.
Deletes videos from playlists using https://developers.google.com/youtube/v3/quickstart/python.
"""

import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from yt_dlp import YoutubeDL

SCOPES = ["https://www.googleapis.com/auth/youtube"]
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

PLAYLIST_ID = os.environ['YOUTUBE_PLAYLIST_ID']
FETCH_PLAYLIST_ITEMS_LIMIT = 5

YDL_OPTS = {
    'paths': {
        'home': os.environ['YOUTUBE_DOWNLOAD_DIR']
    }
}


def download_and_delete_playlist_items(youtube_client):
    """
    Downloads a batch of videos from a given playlist and deletes them.
    :param youtube_client:
    """
    playlist_items = fetch_playlist_items(youtube_client, PLAYLIST_ID)
    for item in playlist_items:
        download_playlist_item(item)
        delete_playlist_item(item, youtube_client)


def download_playlist_item(item):
    """
    Downloads the given video.
    :param item:
    :return:
    """
    video_id = item["snippet"]["resourceId"]["videoId"]
    url = f'https://www.youtube.com/watch?v={video_id}'
    urls = [url]
    with YoutubeDL(YDL_OPTS) as ydl:
        ydl.download(urls)


def delete_playlist_item(item, youtube_client):
    """
    Deletes the given video from the playlist.
    :param item:
    :param youtube_client:
    :return:
    """
    snippet = item['snippet']
    title = snippet['title']
    playlist_id = snippet['playlistId']
    print(f'Deleting {title} from {playlist_id}')

    item_id = item['id']
    request = youtube_client.playlistItems().delete(
        id=item_id
    )
    request.execute()
    print(f'Deleted {title} from {playlist_id}')


def fetch_playlist_items(youtube_client, playlist_id):
    """
    Fetches a portion of Playlist Items from Youtube.
    :param youtube_client:
    :param playlist_id:
    :return:
    """
    print(f'Fetching playlist items for playlist={playlist_id}')
    request = youtube_client.playlistItems().list(
        part="snippet,contentDetails",
        maxResults=FETCH_PLAYLIST_ITEMS_LIMIT,
        playlistId=playlist_id
    )
    response = request.execute()
    playlist_items = response['items']
    print(f'Fetched {len(playlist_items)} playlist items for playlist={playlist_id}')
    return playlist_items


def create_api_client():
    """
    Creates a credentialed Youtube API client
    :return:
    """
    credentials = get_credentials()
    # create an API client
    youtube_client = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)
    return youtube_client


def get_credentials():
    """
    Fetches and transforms the credentials
    :return:
    """
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    client_secrets_file = "YOUR_CLIENT_SECRET_FILE.json"
    # Get credentials
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        client_secrets_file, SCOPES)
    credentials = flow.run_local_server()
    return credentials
