import os
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))

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

