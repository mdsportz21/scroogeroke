# scroogeroke

## server setup
```shell
# Create virtual environment
virtualenv scroogeroke

# Change default python to virtual one
source scroogeroke/bin/activate

# Install bottle to virtual environment
pip install -U bottle

# Run the file
python server.py
```

## scheduler setup
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

# run the file
python scheduler.py
```