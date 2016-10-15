function displayMessages(conversation, yourname) {
	for (message in conversation) {
		if (name == yourname) {
			$("#message-display").append("<div class='your message'>");
		}
		else {
			$("#message-display").append("<div class='their message'>");
		}
		$("#message-display").append("<span class='author'>" + 
									  message.from.name + 
									  "</span><span class='message-text'>" + 
									  message.message + 
									  "</span></div>");
	}

}