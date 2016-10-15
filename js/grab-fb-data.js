$("#button").click(function() {
    $.get("https://graph.facebook.com/v2.3/me/inbox?access_token=" + $("#access-token-box").text()),
        function(data, status) {
        	var partner = data.$("#partner-name-box").text();
        	for (var key in partner.data) {		//this part might really not work
        		if(obj.hasOwnProperty(key)) {
        			$.post("http://search-by-emotion.herokuapp.com/analyze", 
        			{
        				text: key.message;
        			});
        		}
        	}
        }
    }});
});

