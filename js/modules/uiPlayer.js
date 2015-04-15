// uiPlayer object
define(["modules/media"], function(media) {
	var uiPlayer = {};

	uiPlayer.init = function() {             
                uiPlayer.sessionId = document.getElementById("sessionId");
                uiPlayer.addUrlBtn = document.getElementById("addUrl");
                uiPlayer.urlInput = document.getElementById("url");
                
                uiPlayer.playList = ['M7lc1UVf-VE']; /*"3wtYaiFhANY", "J6kSeL_qWd4"*/
                
                // session id
                uiPlayer.setSessionIdFunction();
                
                uiPlayer.registerEvents();
	};

	// register uiPlayer events
	uiPlayer.registerEvents = function() {
            uiPlayer.addUrlBtn.addEventListener("click", uiPlayer.addUrl, false);
	};
        
        uiPlayer.addUrl = function() {
            console.log("******************");
            var url = uiPlayer.urlInput.value;
            var temp = url.split("://")[1];
            var site = temp.split("?")[0];
            if (site.toLowerCase() !== "www.youtube.com/watch") {
                console.log("invalid youtube url");
                return;
            }
            var param = temp.split("=")[1];
            param = param.split("&")[0];
            console.log("param: " + param);
            uiPlayer.playList.push(param);
            media.updateLengthByUi(uiPlayer.playList.length);
            uiPlayer.loadPlayList();
        };
        
	// uiPlayer event handlers
	function onYouTubeIframeAPIReady() {
		uiPlayer.player = new YT.Player('player', {
					width: 600, 
					height: 400, 
					videoId: 'M7lc1UVf-VE',
	    				events: { 
						'onReady': uiPlayer.onPlayerReady,
						'onStateChange': uiPlayer.onStateChange
					}
		});
	};

	uiPlayer.onPlayerReady = function() {
                uiPlayer.loadPlayList();
	};

	uiPlayer.onStateChange = function() {
            var isPlaying = uiPlayer.player.getPlayerState();
		
            if (app.debug)
                console.log("isPlaying: " + isPlaying);

            var play = (isPlaying === 1);
            
            media.updatePlayByUi(play);
/*
		if (isPlaying === 1) {
                        if(!media.play)
                                media.playFunction();
                } 
                else
                        media.pauseFunction();
		*/
            var vol = uiPlayer.player.getVolume();
	
            vol = parseInt(vol);
                
            if (app.debug)
		console.log("volume: " + vol);
                    
            media.updateVolumeByUi(vol);
                /*
		if (vol !== media.vol)
			media.updateVolumeFunction(vol);
                */
            var index = uiPlayer.player.getPlaylistIndex();
            
            media.updateIndexByUi(index);
                /*
                if (index !== media.index)
                        media.updatePlaylistIndex(index);
                */
	};

	// uiPlayer functions
	uiPlayer.updatePlayByMedia = function(play) {
		if (app.debug)
			console.log("uiPlayer.updatePlayFunction");
		if (play)
			uiPlayer.player.playVideo();
		else
			uiPlayer.player.pauseVideo();
	};

	uiPlayer.updateVolByMedia = function(volume) {
		if (app.debug)
			console.log("uiPlayer.updateVolFunction");
		//var vol = media.vol;// / 100.0;
		
		if (app.debug)
			console.log(vol);

		uiPlayer.player.setVolume(volume);
	};
        
        uiPlayer.updateIndexByMedia = function(index) {
                if (app.debug)
                        console.log("uiPlayer.updatePlaylistIndexFunction");
                    
                uiPlayer.player.playVideoAt(index);
        };
        
        uiPlayer.loadPlayList = function() {
                if (app.debug)
                        console.log("loadList");
                uiPlayer.player.cuePlaylist(uiPlayer.playList);//, 0, 0, "large");
        };
        
        // 
        uiPlayer.setSessionIdFunction = function(t) {
                uiPlayer.sessionId.value = t;
        };
        
        return uiPlayer;
});