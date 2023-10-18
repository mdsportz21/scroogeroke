import sched
import time
import datetime

import youtube

DELAY_SECONDS = 60
PRIORITY = 1


def poll_youtube_playlist(scheduler):
    # schedule the next call first
    scheduler.enter(DELAY_SECONDS, PRIORITY, poll_youtube_playlist, (scheduler,))
    print(f"Polling youtube playlist at {datetime.datetime.now()}")
    youtube.download_and_delete_playlist_items(youtube_client)
    print(f"Finished polling youtube playlist at {datetime.datetime.now()}")


youtube_client = youtube.create_api_client()
my_scheduler = sched.scheduler(time.time, time.sleep)
poll_youtube_playlist(my_scheduler)
my_scheduler.run()
