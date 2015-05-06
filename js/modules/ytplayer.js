define(['jquery', 'modules/tv'], function($, tv) {
    
    var ytplayer = {};
    
    ytplayer.init = function() {
        ytplayer.initPlayer("player");
        //tv.init();
        //tv.setUpdateByTvCallback(ytplayer.updateByTv);
        //console.log(tv.volume + " " + tv.play + " " + tv.index + " " + tv.length);

        //tv.set = function(v, p, i, l, f) {
        //tv.set(50, false, 0, 0, false);
    };
        
    ytplayer.initPlayer = function(container, videoId) {
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
        
        console.log(ytplayer.player.getPlayerState());
        
        var play = (ytplayer.player.getPlayerState() === 1);
      tv.updateByUi("play", play);

        var volume = parseInt(ytplayer.player.getVolume());        
      tv.updateByUi("volume", volume);
            
        var index = ytplayer.player.getPlaylistIndex();
      tv.updateByUi("index", index);
    };
    
    ytplayer.onPlayerReady = function() {
        ytplayer.loadPlayList();
    };
    
    ytplayer.loadPlayList = function() {
        console.log("!!!!!!!!!!!!!!!!!!!!!!11");
        if (! ytplayer.player)
            console.log("BIG problem");
        
        ytplayer.player.cuePlaylist(tv.playList);
    };  

    ytplayer.updateValueByTv = function(key, value) {
        if (key === 'playList')
            return;
        
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
                if (!tv.playList.length)
                    return;
               // var i = ytplayer.player.getPlaylistIndex();
                //console.log("=========== " + i);
               
                //if (i < 0)
                //    ytplayer.loadPlayList();
                ytplayer.player.playVideoAt(value);
                brefile:///home/zakiya/projects/tvRemote/control.html#ak;
	};
    };
    
    ytplayer.updateListByTv = function(key, value) {
        var status = ytplayer.player.getPlayerState();
        if (status === 1 || status === 2) {
            var i = ytplayer.player.getPlaylistIndex();
            ytplayer.player.pauseVideo();
            var t = ytplayer.player.getCurrentTime();
            
            ytplayer.player.loadPlaylist(tv.playList, i, t);
            if (status === 2)
                ytplayer.player.pauseVideo();
        }
        else
            ytplayer.loadPlayList();
    };
    
    return ytplayer;
});

