import sched
import time

DELAY_SECONDS = 5
PRIORITY = 1

# TODO:
#   download youtube videos using https://github.com/ytdl-org/youtube-dl/blob/master/README.md#embedding-youtube-dl
#   delete youtube videos from playlist using 

def do_something(scheduler):
    # schedule the next call first
    scheduler.enter(DELAY_SECONDS, PRIORITY, do_something, (scheduler,))
    print(f"Doing stuff... at {time.time()}")
    # then do your stuff


my_scheduler = sched.scheduler(time.time, time.sleep)
do_something(my_scheduler)
my_scheduler.run()
