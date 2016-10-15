GLOBALS = {}

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
}

function accessTokenSubmit(token) {
	console.log(token);
	makeFacebookMessagesQuery(token);
}

function makeFacebookMessagesQuery(token) {
	return $.ajax({
		url: "https://graph.facebook.com/v2.3/me/inbox?access_token=" + token + "&format=json&method=get&pretty=0&suppress_http_code=1",
		success: function(data) {
			console.log(data);
			if ('error' in data) {
				alert("Whoops! Something went wrong with your query. Check your Access Token and try again.");
			}
			else {
				fbTokenQuerySuccess(token, data);
			}
		},
		error: function() {
			// well facebook doesn't do error status parsing whoops
			alert("Whoops! Something went wrong with your query. Check your Access Token and try again");
		}
	});
}

function fbTokenQuerySuccess(token, data) {
	alert("Success!");
	GLOBALS.raw = data;
	GLOBALS.conversations = data['data'];
	console.log(data);
	getUserName();
	alert("Hi, " + GLOBALS.username + "!");
	makeConversationsHumanReadable();

}

// some convention which seems to be holding true is that you are listed as the last
// individual in the conversation thread
function getUserName() {
	var len = GLOBALS.conversations[0]['to']['data'].length;
	GLOBALS.username = GLOBALS.conversations[0]['to']['data'][len - 1]['name'];
	console.log(GLOBALS.username);
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