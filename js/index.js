GLOBALS = {}

GLOBALS.threshold = 0.2;
GLOBALS.colormappings = {}
GLOBALS.colormappings['joy'] = [255, 211, 0];
GLOBALS.colormappings['anger'] = [255, 0, 0];
GLOBALS.colormappings['sadness'] = [0, 105, 185];
GLOBALS.colormappings['fear'] = [140, 57, 152];
GLOBALS.colormappings['disgust'] = [10, 120, 17];
GLOBALS.colormappings['none'] = [255, 255, 255];

$(document).ready(function() {
	initEventListeners();
});


function initEventListeners() {
	$('#token').on('keydown', function(e) {
		console.log(this);
		if (e.keyCode === 13) {
			e.preventDefault();
			console.log(this);
			accessTokenSubmit($(this).val());
		}
	});
	$('#conversations').on('click', '.conversation', function(e) {
		e.preventDefault();
		drillDownIntoConversation($(this).attr('id').split('_')[1]); // index # of position in global conversations
	});
	$('#showtut').on('click', function(e) { 
		$('#tutorial').toggleClass('hidden');
	});
}

function accessTokenSubmit(token) {
	console.log(token);
	showLoadScreen();
	makeFacebookMessagesQuery(token);
}

function makeFacebookMessagesQuery(token) {
	return $.ajax({
		url: "https://graph.facebook.com/v2.3/me/inbox?access_token=" + token + "&format=json&method=get&pretty=0&suppress_http_code=1",
		success: function(data) {
			console.log(data);
			if (data.hasOwnProperty('error')) {
				alert("Whoops! Something went wrong with your query. Check your Access Token and try again.");
			}
			else {
				fbTokenQuerySuccess(token, data);
			}
		},
		error: function() {
			// well facebook doesn't do error status parsing whoops
			alert("Whoops! Something went wrong with your query. Check your Access Token and try again");
			hideLoadScreen();
		}
	});
}

function fbTokenQuerySuccess(token, data) {
	hideLoadScreen();
	alert("Success!");
	GLOBALS.raw = data;
	GLOBALS.conversations = data['data'];
	console.log(data);
	getUserName();
	alert("Hi, " + GLOBALS.username + "!");
	filterConversationsWithNoComments();
	makeConversationsHumanReadable();
	displayConversations();
}

// some convention which seems to be holding true is that you are listed as the last
// individual in the conversation thread
function getUserName() {
	var len = GLOBALS.conversations[0]['to']['data'].length;
	GLOBALS.username = GLOBALS.conversations[0]['to']['data'][len - 1]['name'];
	console.log(GLOBALS.username);
}

function filterConversationsWithNoComments() {
	GLOBALS.conversations = GLOBALS.conversations.filter(function(d) { return d.hasOwnProperty('comments')});
	for (var i = GLOBALS.conversations.length - 1; i >= 0; i--) {
		GLOBALS.conversations[i]['comments']['data'] = GLOBALS.conversations[i]['comments']['data'].filter(function(d) { return d.hasOwnProperty('message')});
	}
}

// display conversations as "X and Y" or "X, Y, and Z"
function makeConversationsHumanReadable() {
	for (var i = GLOBALS.conversations.length - 1; i >= 0; i--) {
		var convo = GLOBALS.conversations[i];
		var first_names = GLOBALS.conversations[i]['to']['data'].map(function(d) { return d.name.split(' ')[0]; });
		var n_people = GLOBALS.conversations[i]['to']['data'].length;
		// case 1: only two people
		if (n_people <= 2) {
			convo['readable-name'] = first_names[0] + " and You";
		}
		else if (n_people < 3) {
			convo['readable-name'] = first_names[0] + ', ' + first_names[1] + ', and You';
		}
		else if (n_people < 4) {
			convo['readable-name'] = first_names[0] + ', ' + first_names[1] + ', ' + first_names[2] + ', and You';
		}
		else {
			convo['readable-name'] = first_names[0] + ', ' + first_names[1] + ', ' + first_names[2] + ', You and ' + (n_people - 4) + ' others';
		}
		console.log(convo['readable-name']);
	}
}

function displayConversations() {
	for (var i = GLOBALS.conversations.length - 1; i >= 0; i--) {
		$('#conversations').append(makeConversationDisplay(GLOBALS.conversations[i], i));
	}
}

function makeConversationDisplay(conversation, index) {
	return "<div id='convo_"+index+"' class='conversation'><h2 class='conversation-title'>" + conversation['readable-name'] + "</h2></div>";
}

function drillDownIntoConversation(index) {
	analyzeConversation(index);	
}

function makeSentimentAnalysisQuery(conversation, index, sentence) {
	return conversation['comments']['data'][index].hasOwnProperty('sentiment') || $.ajax({
		url: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/analyze',
		method: 'POST',
		data: {'text': sentence},
		success: function(data) {
			if (data.hasOwnProperty('error')) {
				console.log(sentence);
				console.log(data);
				console.log('data errored. silently failing');
				console.log('TODO implement fail that we can recover from');
			}
			else {
				sentimentAnalysisQuerySuccess(conversation, index, data);
			}
		},
		error: function(data) {
			console.log(sentence);
			console.log(data);
			console.log('silently fail somehow');
			sentimentAnalysisQueryFailure(conversation, index, data);
		}
	})
}

function sentimentAnalysisQuerySuccess(conversation, index, data) {
	conversation['comments']['data'][index]['sentiment'] = JSON.parse(data);

	// do more stuff idk
}

function sentimentAnalysisQueryFailure(conversation, index, data) {
	conversation['comments']['data'][index]['sentiment'] = { status: "ERR", usage: "By accessing AlchemyAPI or using in…", docEmotions: { anger: "0", joy: "0", fear: "0", sadness: "0", disgust: "0" }, totalTransactions: "1", language: "english" }
}

function analyzeConversation(index_no) {
	// console.log(index_no);
	showLoadScreen();
	var comments = GLOBALS.conversations[index_no]['comments']['data'];
	var deferreds = $.map(GLOBALS.conversations[index_no]['comments']['data'], function(v,k) {
		return makeSentimentAnalysisQuery(GLOBALS.conversations[index_no], k, v['message']);
	});
	$.when.apply(window, deferreds).then(function() { 
		console.log('hello');
		hideLoadScreen();
		displayMessages(comments, GLOBALS.username);
	});
}

function findWinner(sentiments_object) {
<<<<<<< HEAD
	var winner1 = 'none';
	var winner2 = 'none';
	var cur_win1 = GLOBALS.threshold;
	var cur_win2 = GLOBALS.threshold;
=======
	var winner = 'none';
	var cur_win = 0.6;
>>>>>>> 677e8383243d06ff8ffff8c2d9f3bce0b717097d
	sentiments_object = sentiments_object['docEmotions'];
	for (sentiment in sentiments_object) {
		if (sentiments_object[sentiment] >= cur_win2) {
			if (sentiments_object[sentiment] >= cur_win1) {
				cur_win2 = cur_win1;
				winner2 = winner1;
				cur_win1 = sentiments_object[sentiment];
				winner1 = sentiment;
			}
			else {
				cur_win2 = sentiments_object[sentiment];
				winner2 = sentiment;
			}
		}
	}
	var out = {};
	out[winner1] = cur_win1;
	out[winner2] = cur_win2;
	return out;
}

function getColorBySentiment(sentiment_pair) {
	var sentiment = Object.keys(sentiment_pair)[0];
	var intensity = Math.pow(sentiment_pair[sentiment], 2);

	if (sentiment == 'joy') {
		return 'rgba(255, 211, 0, '+intensity+')';
	}
	else if (sentiment == 'anger') {
		return 'rgba(255, 0, 0, '+intensity+')';
	}
	else if (sentiment == 'sadness') {
		return 'rgba(0, 105, 185, '+intensity+')';
	}
	else if (sentiment == 'fear') {
		return 'rgba(140, 57, 152, '+intensity+')';
	}
	else if (sentiment == 'disgust') {
		return 'rgba(10, 120, 17, '+intensity+')';
	}
	else {
		return '#fff';
	}
}




/// strategy
// begin UX
// user clicks conversation
// pop up loading screen
// send data to server (check if they have sentiment data already)
// retrieve data from server
// pair data with conversation elements
// render sentiments 
// display "load more" button
// end UX



// potential future development?
// loading more conversations (pagination is already there for loading more conversations)

function displayMessages(conversation, yourname) {
	$("#message-display").empty();
	for (message in conversation) {
		var sentiment = findWinner(conversation[message]['sentiment']);
		var div;
		if (conversation[message].from.name == yourname) {
			div = $("<div style='background-color:"+getColorBySentiment(sentiment)+";' class='your message'>");
		}
		else {
			div = $("<div style='background-color:"+getColorBySentiment(sentiment)+";' class='their message'>");
		}
			div.append("<br><span>"+Object.keys(sentiment)[0]+"</span> <span class='author'>" + 
									  conversation[message].from.name + 
									  "</span> <span class='message-text'>" + 
									  conversation[message].message + 
									  "</span></div>");
			div.appendTo("#message-display");
	}

}


function showLoadScreen() {
	$('#loader').addClass('active');
	$('body').addClass('loading');
}

function hideLoadScreen() {
	$('#loader').removeClass('active');
	$('body').removeClass('loading');
}