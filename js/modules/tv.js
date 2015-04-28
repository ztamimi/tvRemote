// tv object
define(["modules/ytplayer", "modules/backEnd", "jquery"], function(ytplayer, backEnd, $) {
	var tv = {};

	tv.init = function() {             
            tv.sessionId = document.getElementById("sessionId");
            tv.addUrlBtn = document.getElementById("addUrl");
            tv.urlInput = document.getElementById("url");

            var sessionId = tv.generateSessionId();
            tv.setSessionId(sessionId);
            
            backEnd.setUrl('https://blazing-heat-3187.firebaseio.com/');
            backEnd.setAppName('tvRemote');
            backEnd.setSessionId(sessionId);
            
            tv.registerEvents();
            ytplayer.init();
            ytplayer.playVideo('player', '');
            
            backEnd.init();
	};

	// register tv events
	tv.registerEvents = function() {
            tv.addUrlBtn.addEventListener("click", tv.addUrl, false);
	};
        
        tv.addUrl = function() {
            var url = tv.urlInput.value;
            var temp = url.split("://")[1];
            var site = temp.split("?")[0];
            if (site.toLowerCase() !== "www.youtube.com/watch") {
                console.log("invalid youtube url");
                return;
            }
            var param = url.split("?")[1].split("v=")[1].split("&")[0];
            ytplayer.playList.push(param);
            ytplayer.loadPlayList();
            tv.urlInput.value = "copy the url of a youtube video here ...  ";
            
            $.getJSON("https://www.googleapis.com/youtube/v3/videos", {
					key: "AIzaSyDgq3-_e1fweUdRd1-yIZp_V5EvEFgdlF4",
					part: "snippet,statistics",
					id: param
				}, function(data) {
					if (data.items.length === 0) {
						$("<p style='color: #F00;'>Video not found.</p>").appendTo("#video-data-1");
						return;
					}
					$("<img>", {
						src: data.items[0].snippet.thumbnails.medium.url,
						width: data.items[0].snippet.thumbnails.medium.width,
						height: data.items[0].snippet.thumbnails.medium.height
					}).appendTo("#video-data-1");
					$("<h1></h1>").text(data.items[0].snippet.title).appendTo("#video-data-1");
					$("<p></p>").text(data.items[0].snippet.description).appendTo("#video-data-1");
					$("<li></li>").text("Published at: " + data.items[0].snippet.publishedAt).appendTo("#video-data-2");
					$("<li></li>").text("View count: " + data.items[0].statistics.viewCount).appendTo("#video-data-2");
					$("<li></li>").text("Favorite count: " + data.items[0].statistics.favoriteCount).appendTo("#video-data-2");
					$("<li></li>").text("Like count: " + data.items[0].statistics.likeCount).appendTo("#video-data-2");
					$("<li></li>").text("Dislike count: " + data.items[0].statistics.dislikeCount).appendTo("#video-data-2");
				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});
        };
         
        tv.setSessionId = function(t) {
            tv.sessionId.innerText = t;
        };
        
        tv.generateSessionId = function() {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";//abcdefghiklmnopqrstuvwxyz";
                var string_length = 3;
                var randomstring = '';
                for (var i=0; i<string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum,rnum+1);
                }
                return randomstring;
        };
        
        return tv;
});