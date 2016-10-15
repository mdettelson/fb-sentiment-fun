import os
import sys
from flask import Flask, request, send_from_directory
from src import analyzemessage as polyhack

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('html', 'index.html')

@app.route('/js/<path:path>')
def send_js(path):
	return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
	return send_from_directory('css', path)

@app.route('/img/<path:path>')
def send_img(path):
	return send_from_directory('img', path)

@app.route('/analyze', methods=['POST'])
def analyze():
	data = request.form
	print data
	try:
		text = data['text']
		print text
		result = polyhack.get_emotion(text)
		print result
		return result
	except:
		print "error"
		return '{"error":"invalid"}'


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))




# @app.route('/login')
# def login(user):
#     if (user.logged_in == True):
#         if (user.fb_logged_in == True):
#             # redirect to /home
#         else:
#             # redirect to /login/fbauth

# @app.route('/login/fbauth')
# # if we do this in a webview we must send them to 'https://www.facebook.com/connect/login_success.html'
# redirect_url = app_home + '/login/fbauth_return'
# def fb_oauth():
#     # redirect client to fb oauth

# @app.route('/login/fbauth_return')
# def fb_oauth_return():
#     # add client fb info to user 


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
