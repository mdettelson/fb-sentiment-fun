from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/login')
def login(user):
    if (user.logged_in == True):
        if (user.fb_logged_in == True):
            # redirect to /home
        else:
            # redirect to /login/fbauth

@app.route('/login/fbauth')
# if we do this in a webview we must send them to 'https://www.facebook.com/connect/login_success.html'
redirect_url = app_home + '/login/fbauth_return'
def fb_oauth():
    # redirect client to fb oauth

@app.route('/login/fbauth_return')
def fb_oauth_return():
    # add client fb info to user 
