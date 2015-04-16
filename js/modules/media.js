// media object
define(["modules/backEnd"], function(backEnd) {
	var media = {};
        
	// media init function
	media.init = function() {
            media.volume = 0;
            media.play = false;
            media.index = 0;
            media.length = 1;
                        
            backEnd.setReceiveCallback(media.updateByBackend);
	};
        
        media.set = function(v, p, i, l) {
            media.volume = v;
            media.play = p;
            media.index = i;
            media.length = l;
        };
        
        media.updateByUi = function(key, value) {
            console.log("media.updateByUi called " + key + ":" + value);
            
            if (key === "shift") {
                key = "index";
                value = value + media.index;
            }
            if (media[key] === value)
                return;
            
            media[key] = value;
            var obj = {}; 
            obj[key] = media[key];
            backEnd.send(obj);
        };

        media.shiftIndexByUi = function(shift) {
            if (media.length < 2)
                return;
            
            var index = (media.index + shift) % media.length;
            media.updateByUi("index", index);
        };
        
        media.updateByBackend = function(key, value) {
            console.log("media.updateByBackend() called");
            
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
            }  
        };
        
        /// setter methods //////////////////
        media.setUpdateByMediaCallback = function(callback) {
            media.updateUiByMediaCallback = callback;
        };
        
    return media;
});