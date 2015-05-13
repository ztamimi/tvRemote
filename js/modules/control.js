// control object
define(["modules/backEnd"], function(backEnd) {
	var control = {};
        
	control.init = function() {
            control.play = null;
            control.volume = null;
            control.videoId = null;
            control.playList = [];
	};
        
        control.set = function () {
            control.updateByUi('volume', 50);
            control.updateByUi('play', false);
            control.updateByUi('index', 0);
            
            //control.playList = [];
        };
        
        control.addVideo = function(videoId) {
            if (control.playList.indexOf(videoId) >= 0) // video does exist in list
                return;
            control.playList.push(videoId);
            backEnd.addItem(videoId, 1);
        };
        
        control.deleteVideo = function(videoId) {
            var index = control.playList.indexOf(videoId); // video does not exist in list
            if (index < 0)
                return;
            if (videoId === control.videoId) {
                var current = control.playList.indexOf(videoId);
                var next = (current + 1) % control.playList.length;
                control.videoId = control.playList[next];
                control.updateByUi("videoId", control.videoId);
            }
            control.playList.splice(index, 1);
            backEnd.deleteItem(videoId);
        };
        
        control.updateByUi = function(key, value) {
            console.log("control.updateByUi called " + key + ":" + value);
            
            if (control[key] === value)
                return;
            
            control[key] = value;
            
            var obj = {}; 
            obj[key] = control[key];
            backEnd.updateValue(obj);
        };

        control.clickItem = function(videoId) {
            var index = control.playList.indexOf(videoId);
            if (index < 0)
                return;
            
            control.updateByUi("videoId", videoId);
            control.updateByUi("play", true);

        };
        
        control.updateValueByBackEnd = function(key, value) {
            console.log(key + ":" + value);
            if (control[key] === value)
                return;
            
            control[key] = value;
            control.uiValueCallback(key, value);
            control.uiValueCallback2(key, value);
        };
    
        control.updateListByBackEnd = function(task, key, value) {
            //console.log("control.updateListByBackEnd: "+ task + ":" + videoId);
            var videoId = key;
            if (task === 'add') {
                if (control.playList.indexOf(videoId) >= 0) // video does exist in list
                    return;
                control.playList.push(videoId);
                control.uiListCallback("add", videoId);
            }
                
            if (task === 'delete') {
                var index = control.playList.indexOf(videoId);
                if (index < 0)  // video does not exist in list
                    return;
                control.playList.splice(index, 1);
                control.uiListCallback("delete", videoId);
            }
        };
        
        /// setter methods //////////////////
        control.setUiValueCallback = function(callback) {
            control.uiValueCallback = callback;
        };
        
        control.setUiValueCallback2 = function(callback) {
            control.uiValueCallback2 = callback;
        };
        
        control.setUiListCallback = function(callback) {
            control.uiListCallback = callback;
        };
        
    return control;
});