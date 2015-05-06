// tv object
define(["modules/ytplayer", "modules/backEnd", "jquery"], function(ytplayer, backEnd, $) {
	var tv = {};

	tv.init = function() {             
            tv.sessionId = document.getElementById("sessionId");
            tv.addUrlBtn = document.getElementById("addUrl");
            tv.urlInput = document.getElementById("url");

            var sessionId = 'abc123'; //tv.generateSessionId();
            tv.setSessionId(sessionId);
            
            backEnd.setUrl('https://blazing-heat-3187.firebaseio.com/');
            backEnd.setAppName('tvRemote');
            backEnd.setSessionId(sessionId);
            
            tv.registerEvents();
            ytplayer.init();
            ytplayer.playVideo('player', '');
            
            backEnd.init();
	};

	tv.registerEvents = function() {
            ///tv.addUrlBtn.addEventListener("click", tv.addUrl, false);
	};
        
        tv.setSessionId = function(t) {
            tv.sessionId.innerText = t;
        };
        
        tv.generateSessionId = function() {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";//abcdefghiklmnopqrstuvwxyz";
                var string_length = 6;
                var randomstring = '';
                for (var i=0; i<string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum,rnum+1);
                }
                return randomstring;
        };
        
        return tv;
});