// media object
define(["modules/backEnd"], function(backEnd) {
	var media = {};
        
	// media init function
	media.init = function() {
            media.volume = null;
            media.play = null;
            media.index = null;
            media.length = null;
            media.fullscreen = null;
        
            backEnd.setReceiveCallback(media.updateByBackend);
	};
        
        media.set = function () {
            media.updateByUi('volume', 50);
            media.updateByUi('play', false);
            media.updateByUi('index', 0);
            media.updateByUi('length', 0);
            media.updateByUi('fullscreen', false);
            media.playList = [];
        };
        
        /*
        media.set = function(v, p, i, l, f) {
            media.volume = v;
            media.play = p;
            media.index = i;
            media.length = l;
            media.fullscreen = f;
        };
        */
        media.addPlayListItemByUi = function(videoId) {
            if (media.playList.indexOf(videoId) == -1) {
                media.playList.push(videoId);
                backEnd.push('playList', videoId);
                backEnd.send({'length': media.playList.length});
            }
        };
        
        media.deletePlayListItemByUi = function(videoId) {
            var mediaIndex = media.playList.indexOf(videoId);
            media.playList.splice(mediaIndex, 1);
            backEnd.delete('playList', videoId);
            backEnd.send({'length': media.playList.length});
        };
        
        media.updateByUi = function(key, value) {
            console.log("media.updateByUi called " + key + ":" + value);
            
            if (media[key] === value)
                return;
            
            media[key] = value;
            var obj = {}; 
            obj[key] = media[key];
            backEnd.send(obj);
        };

        media.clickItem = function(videoId) {
            var index = media.playList.indexOf(videoId);
            console.log("index: " + index);
            media.updateByUi("index", index);
            //media.updateByUi("play", true);
        };
        
        media.updateByBackend = function(key, value) {
            console.log("media.updateByBackend called: " + key + ":" + value);
            console.log("%%% " + media.playList + "      " + media.index);
            
            if (media[key] === value)
                return;
            
            switch(key) {
		case 'volume':
                    if (value !== media.volume) {
                        media.volume = value;
                        media.updateUiByMediaCallback("volume", media.volume);
                    }
                    break;
                                
		case 'play':
                    if (value !== media.play) {
                        media.play = value;
                        media.updateUiByMediaCallback("play", media.play);
                    }
                    break;
                                
                case 'index':
                    if (value !== media.index) {
                        media.index = value;
                        media.updateUiByMediaCallback("index", media.index);
                    }
                    break;
                                
                case 'length':
                    if (value !== media.length) {
                        media.length = value;
                        media.updateUiByMediaCallback("length", media.length);
                    }
                    break;
                    
                case 'fullscreen':
                    if (value != media.fullscreen) {
                        media.fullscreen = value;
                        media.updateUiByMediaCallback("fullscreen", media.fullscreen);
                    }
                    break;
                    
                case 'addVideoId':
                    var videoId = value;
                    if (media.playList.indexOf(videoId) === -1) {
                        media.playList.push(videoId);
                        media.updateUiByMediaCallback("playList", videoId);
                    }
                    break;
                    
                case 'deleteVideoId':
                    var videoId = value;
                    var mediaIndex = media.playList.indexOf(videoId);
                    if (media.playList.indexOf(videoId) !== -1) {
                        media.playList.splice(mediaIndex, 1);
                        media.updateUiByMediaCallback("playList", videoId);
                    }
                    break;
            }  
        };
        
        /// setter methods //////////////////
        media.setUpdateByMediaCallback = function(callback) {
            media.updateUiByMediaCallback = callback;
        };
        
    return media;
});