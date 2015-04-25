define(['jquery', 'modules/media'], function($, media) {
    
    var ytplayer = {};
    
    ytplayer.init = function() {
        ytplayer.playList = ['ErDkRerNKvQ'];
        media.init();
        media.setUpdateByMediaCallback(ytplayer.updateByMedia);
        console.log(media.volume + " " + media.play + " " + media.index + " " + media.length);
        media.set(-1, -1, -1, -1, -1);
    };
        
    ytplayer.playVideo = function(container, videoId) {
        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
            window.onYouTubeIframeAPIReady = function() {
                ytplayer.loadPlayer(container, videoId);
            };
            $.getScript('http://www.youtube.com/iframe_api');
        } 
        else {
            ytplayer.loadPlayer(container, videoId);
        }
    };
    
    ytplayer.loadPlayer = function(container, videoId) {
        ytplayer.player = new YT.Player(container, {
            videoId: videoId,
            width: 640,
            height: 480,
            events: {
                'onReady': ytplayer.onPlayerReady,
		'onStateChange': ytplayer.onStateChange
            }
        // For a list of all parameters, see:
        // https://developers.google.com/youtube/player_parameters
        });
    };
    
    ytplayer.onStateChange = function() {
        console.log("ytplayer.onStateChange called");
        
        var play = (ytplayer.player.getPlayerState() === 1);
        media.updateByUi("play", play);

        var volume = parseInt(ytplayer.player.getVolume());        
        media.updateByUi("volume", volume);
            
        var index = ytplayer.player.getPlaylistIndex();
        media.updateByUi("index", index);
        
        media.updateByUi("length", ytplayer.playList.length);
    };
    
    ytplayer.onPlayerReady = function() {
        ytplayer.loadPlayList();
    };
    
    ytplayer.loadPlayList = function() {
        ytplayer.player.cuePlaylist(ytplayer.playList);//, 0, 0, "large");
    };
    
    ytplayer.updateByMedia = function(key, value) {
        console.log("ytplayer.updateByMedia called");
        switch(key) {
            case "play":
                if (value)
                    ytplayer.player.playVideo();
		else
                    ytplayer.player.pauseVideo();
                break;
            case "volume":
                ytplayer.player.setVolume(value);
                break;
                
            case "index":
                ytplayer.player.playVideoAt(value);
                
            case "fullscreen":
                if (value) {
                    ytplayer.player.setSize(window.innerWidth, window.innerHeight);
                    ytplayer.player.setPlaybackQuality("default");// "hd720");
                }
                else {
                    ytplayer.player.setSize(640, 480);
                    ytplayer.player.setPlaybackQuality("default");
                }
	};
    };
    
    return ytplayer;
});

