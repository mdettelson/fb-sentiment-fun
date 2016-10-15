import os
from flask import Flask, redirect, url_for, session, request, send_from_directory
from flask_oauthlib.client import OAuth, OAuthException

app = Flask(__name__)
oauth = OAuth(app)


@app.route('/')
def index():
    return 

@app.route('/js/<path:path>')
def send_js(path):
	return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
	return send_from_directory('css', path)

@app.route('/img/<path:path>')
def send_img(path):
	return send_from_directory('img', path)



# FBSECRET = os.environ['FBSECRET']

# facebook = oauth.remote_app(
#     'facebook',
#     consumer_key={380276585694848},
#     consumer_secret={FBSECRET},
#     request_token_params={'scope': 'email'},
#     base_url='https://graph.facebook.com',
#     request_token_url=None,
#     access_token_url='/oauth/access_token',
#     access_token_method='GET',
#     authorize_url='https://www.facebook.com/dialog/oauth'
# )

# @app.route('/home')
# def home():
#     # show home page
#     return

# @app.route('/login')
# def login(user):
#     if (user.logged_in == True):
#         if (user.fb_logged_in == True):
#             return
#             # redirect to /home
#         else:
#             return
#             # redirect to /login/fbauth

# @app.route('/login/fbauth')
# def facebook_login():
#     callback = url_for(
#         'facebook_authorized',
#         next=request.args.get('next') or request.referrer or None,
#         _external=True
#     )
#     return facebook.authorize(callback=callback)



# @app.route('/login/fbauth/authorized')
# def facebook_authorized():
#     resp = facebook.authorized_response()
#     if resp is None:
#         return 'Access denied: reason=%s error=%s' % (
#             request.args['error_reason'],
#             request.args['error_description']
#         )
#     if isinstance(resp, OAuthException):
#         return 'Access denied: %s' % resp.message

#     session['oauth_token'] = (resp['access_token'], '')
#     me = facebook.get('/me')
#     return 'Logged in as id=%s name=%s redirect=%s' % \
#         (me.data['id'], me.data['name'], request.args.get('next'))


# @facebook.tokengetter
# def get_facebook_oauth_token():
#     return session.get('oauth_token')




# # bootstrapping the NLTK
# from nltk.classify import NaiveBayesClassifier
# from nltk.corpus import subjectivity
# from nltk.sentiment import SentimentAnalyzer
# from nltk.sentiment.util import *

# n_instances = 100
# subj_docs = [(sent, 'subj') for sent in subjectivity.sents(categories='subj')[:n_instances]]
# obj_docs = [(sent, 'obj') for sent in subjectivity.sents(categories='obj')[:n_instances]]

# train_subj_docs = subj_docs[:80]
# test_subj_docs = subj_docs[80:100]
# train_obj_docs = obj_docs[:80]
# test_obj_docs = obj_docs[80:100]
# training_docs = train_subj_docs + train_obj_docs
# testing_docs = test_subj_docs + test_obj_docs

# sentim_analyzer = SentimentAnalyzer()
# all_words_neg = sentim_analyzer.all_words([mark_negation(doc) for doc in training_docs])

# unigram_feats = sentim_analyzer.unigram_word_feats(all_words_neg, min_freq=4)
# sentim_analyzer.add_feat_extractor(extract_unigram_feats, unigrams=unigram_feats)

# training_set = sentim_analyzer.apply_features(training_docs)
# test_set = sentim_analyzer.apply_features(testing_docs)

# trainer = NaiveBayesClassifier.train
# classifier = sentim_analyzer.train(trainer, training_set)

# from nltk.sentiment.vader import SentimentIntensityAnalyzer
# from nltk import tokenize

# sid = SentimentIntensityAnalyzer()

# def sentiment_analyze(sentence):
# 	print sentence
# 	ss = sid.polarity_scores(sentence)
# 	for k in sorted(ss):
# 		print('{0}: {1}, '.format(k, ss[k]))
# 	print
