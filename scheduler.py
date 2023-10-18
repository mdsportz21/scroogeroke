import sched
import time

import youtube

DELAY_SECONDS = 60
PRIORITY = 1


# TODO:
#   download youtube videos using https://github.com/ytdl-org/youtube-dl/blob/master/README.md#embedding-youtube-dl
#   delete youtube videos from playlist using 

def poll_youtube_playlist(scheduler):
    # schedule the next call first
    scheduler.enter(DELAY_SECONDS, PRIORITY, poll_youtube_playlist, (scheduler,))
    print(f"Polling youtube playlist at {time.time()}")



youtube = youtube.create_api_client()
my_scheduler = sched.scheduler(time.time, time.sleep)
poll_youtube_playlist(my_scheduler)
my_scheduler.run()
