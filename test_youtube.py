from unittest import TestCase

import youtube


class Test(TestCase):
    def test_download_and_delete_playlist_items(self):
        youtube_client = youtube.create_api_client()
        youtube.download_and_delete_playlist_items(youtube_client)

    def test_delete_playlist_item(self):
        youtube_client = youtube.create_api_client()
        playlist_items = youtube.fetch_playlist_items(youtube_client, youtube.PLAYLIST_ID)
        for item in playlist_items:
            youtube.delete_playlist_item(item, youtube_client)

    def test_fetch_playlist_items(self):
        youtube_client = youtube.create_api_client()
        playlist_items = youtube.fetch_playlist_items(youtube_client, youtube.PLAYLIST_ID)
        print(playlist_items)
