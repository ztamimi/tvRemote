// tv object
define(["modules/ytplayer", "modules/backEnd"], function(ytplayer, backEnd) {
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
            var param = temp.split("=")[1];
            param = param.split("&")[0];
            console.log("param: " + param);
            ytplayer.playList.push(param);
            //media.updateLengthByUi(tv.playList.length);
            ytplayer.loadPlayList();
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