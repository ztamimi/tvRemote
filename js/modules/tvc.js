// control object
define(["modules/backEnd"], function(backEnd) {
	var control = {};
        
	control.init = function() {
            //control.set();
	};
        
        control.set = function () {
            control.updateByUi('volume', 50);
            control.updateByUi('play', false);
            control.updateByUi('index', 0);
            //control.updateByUi('length', 0);
            //control.updateByUi('fullscreen', false);
            control.playList = [];
        };
        
        control.addVideo = function(videoId) {
            if (control.playList.indexOf(videoId) >= 0) // video does exist in list
                return;
            control.playList.push(videoId);
            backEnd.push(videoId);
            //control.updateByUi('length', control.playList.length);
        };
        
        control.deleteVideo = function(videoId) {
            var index = control.playList.indexOf(videoId); // video does not exist in list
            if (index < 0)
                return;
            control.playList.splice(index, 1);
            backEnd.delete(videoId);
            //control.updateByUi('length', control.playList.length);
        };
        
        control.updateByUi = function(key, value) {
            console.log("control.updateByUi called " + key + ":" + value);
            
            if (control[key] === value)
                return;
            
            control[key] = value;
            
            var obj = {}; 
            obj[key] = control[key];
            backEnd.send(obj);
        };

        control.clickItem = function(videoId) {
            var index = control.playList.indexOf(videoId);
            if (index < 0)
                return;
            control.updateByUi("index", index);
        };
        
        control.updateValueByBackEnd = function(key, value) {
            if (key == "playList")
                return;
            console.log(key + ":" + value);
            if (control[key] === value)
                return;
            
            control[key] = value;
            control.uiValueCallback(key, value);
        };
    
        control.updateListByBackEnd = function(task, videoId) {
            console.log("control.updateListByBackEnd: "+ task + ":" + videoId);
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
        
        control.setUiListCallback = function(callback) {
            control.uiListCallback = callback;
        };
        
        
    return control;
});