// backEnd object
define(["firebase"], function() {
	var backEnd = {url: null, appName: null, sessionId: null, ref: null};
        
	backEnd.init = function() {
            var temp = backEnd.url + (backEnd.appName + '/' + backEnd.sessionId  + '/');
            
            backEnd.ref = new Firebase(temp);
            backEnd.listRef = backEnd.ref.child("playList");
        };
        
        backEnd.send = function(obj) {
            backEnd.ref.update(obj);
	};
        
        backEnd.push = function(value) {
            //var listRef = backEnd.ref.child(list);
            var obj = {};
            obj[value] = 1;
            backEnd.listRef.update(obj);
        };
        
        backEnd.delete = function(key) {
            //var listRef = backEnd.ref.child(list).child(key);
            backEnd.listRef.child(key).remove();
        };
        
	backEnd.receiveValue = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
        
            backEnd.updateValueCallback(key, value);
	};
        
        backEnd.receiveListAdd = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
            var task = 'add';
            
            console.log("backEnd.receiveListAdd " + task + ":" + key);
            backEnd.updateListCallback(task, key);
        };
        
        backEnd.receiveListDelete = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
            var task = 'delete';
            
            backEnd.updateListCallback(task, key);
        };
        
        ////////// set methods ///////////////
        backEnd.setUrl = function(url) {
            backEnd.url = url;
        };
        
        backEnd.setAppName = function(name) {
            backEnd.appName = name;
        };
        
        backEnd.setSessionId = function(sessionId) {
            backEnd.sessionId = sessionId;
        };
        
        backEnd.setUpdateValueCallback = function(callback) {
            backEnd.updateValueCallback = callback;
            backEnd.ref.on('child_added', backEnd.receiveValue); 
            backEnd.ref.on('child_changed', backEnd.receiveValue);
        };
        
        backEnd.setUpdateListCallback = function(callback) {
            backEnd.updateListCallback = callback;
            backEnd.listRef.on('child_added', backEnd.receiveListAdd);
            backEnd.listRef.on('child_removed', backEnd.receiveListDelete);
        };
        
    return backEnd;
});