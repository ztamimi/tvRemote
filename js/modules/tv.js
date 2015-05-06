// control object
define(["modules/backEnd"], function(backEnd) {
	var tv = {};
        
	tv.init = function() {
            tv.index = 0;
            tv.playList = [];
            tv.volume = 100;
            tv.play = false;
	};
        
        tv.set = function (volume, play, index) {
            tv.updateByUi('volume', volume);
            tv.updateByUi('play', play);
            tv.updateByUi('index', index);
            tv.playList = [];
        };
        
        tv.addVideo = function(videoId) {
            if (tv.playList.indexOf(videoId) >= 0) // video does exist in list
                return;
            tv.playList.push(videoId);
            backEnd.push(videoId);
        };
        
        tv.deleteVideo = function(videoId) {
            var index = tv.playList.indexOf(videoId); // video does not exist in list
            if (index < 0)
                return;
            tv.playList.splice(index, 1);
            backEnd.delete(videoId);
        };
        
        tv.updateByUi = function(key, value) {
            console.log("tv.updateByUi called " + key + ":" + value);
            
            if (tv[key] === value)
                return;
            
            tv[key] = value;
            
            var obj = {}; 
            obj[key] = tv[key];
            backEnd.send(obj);
        };

        tv.clickItem = function(videoId) {
            var index = tv.playList.indexOf(videoId);
            if (index < 0)
                return;
            tv.updateByUi("index", index);
        };
        
        tv.updateValueByBackEnd = function(key, value) {
            if (key == "playList")
                return;
            console.log(key + ":" + value);
            if (tv[key] === value)
                return;
            
            tv[key] = value;
            tv.uiValueCallback(key, value);
        };
    
        tv.updateListByBackEnd = function(task, videoId) {
            console.log("tv.updateListByBackEnd: "+ task + ":" + videoId);
            if (task === 'add') {
                if (tv.playList.indexOf(videoId) >= 0) // video does exist in list
                    return;
                tv.playList.push(videoId);
                tv.uiListCallback("add", videoId);
            }
                
            if (task === 'delete') {
                var index = tv.playList.indexOf(videoId);
                if (index < 0)  // video does not exist in list
                    return;
                tv.playList.splice(index, 1);
                tv.uiListCallback("delete", videoId);
            }
        };
        
        /// setter methods //////////////////
        tv.setUiValueCallback = function(callback) {
            tv.uiValueCallback = callback;
        };
        
        tv.setUiListCallback = function(callback) {
            tv.uiListCallback = callback;
        };
        
        
    return tv;
});