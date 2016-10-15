import json
import requests
import flask
import os
from watson_developer_cloud import AlchemyLanguageV1

def get_emotion(sent):
	alchemy_language = AlchemyLanguageV1(api_key=os.environ['WATSON_KEY'])
	return json.dumps(alchemy_language.emotion(text=sent))
