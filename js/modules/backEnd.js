// backEnd object
define(["firebase"], function() {
	var backEnd = {url: null, appName: null, sessionId: null, ref: null};
        
	backEnd.init = function() {
            var temp = backEnd.url + (backEnd.appName + '/' + backEnd.sessionId  + '/');              
            backEnd.ref = new Firebase(temp);
            backEnd.ref.on('child_added', backEnd.receive); 
            backEnd.ref.on('child_changed', backEnd.receive);
            
            backEnd.listRef = backEnd.ref.child("playList");
            
            backEnd.listRef.on('child_added', backEnd.listItemAdd);
            //backEnd.listRef.on('child_changed', backEnd.listReceive);
            backEnd.listRef.on('child_removed', backEnd.listItemDelete);
            if (backEnd.firstWriteCallback)
                backEnd.ref.once('child_added', backEnd.firstWriteCallback);
        };
        
        backEnd.send = function(obj) {
            //backEnd.log = obj;
            backEnd.ref.update(obj);
	};
        
        backEnd.push = function(list, value) {
            var listRef = backEnd.ref.child(list);
            var obj = {};
            obj[value] = 1;
            //console.log(JSON.stringify(obj));
            listRef.update(obj);
        };
        
        backEnd.delete = function(list, key) {
            var listRef = backEnd.ref.child(list).child(key);
            listRef.remove();
        };
        
        backEnd.listItemAdd = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
            
            console.log("++++ backEnd.listItemAdd");
            console.log(key + ":" + value);
            
            if (backEnd.receiveCallback)
                backEnd.receiveCallback('addVideoId', key);
        };
        
        backEnd.listItemDelete = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
            console.log("----backEnd.listItemDelete");
            console.log(key + ":" + value);
            
            if (backEnd.receiveCallback)
                backEnd.receiveCallback('deleteVideoId', key);
            
        };
        
	backEnd.receive = function(snapshot) {

            var value = snapshot.val();
            var key = snapshot.key();
        /*    
            var obj = {};
            obj[key] = value;
            if (JSON.stringify(obj) == JSON.stringify(backEnd.log)) {
                return;
            }
            */
            if (backEnd.receiveCallback)
                backEnd.receiveCallback(key, value);
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
        
        backEnd.setReceiveCallback = function(callback) {
            backEnd.receiveCallback = callback;
            //backEnd.ref.on('child_added', backEnd.receive); 
            //backEnd.ref.on('child_changed', backEnd.receive);
        };
        
        backEnd.setFirstWriteCallback = function(callback) {
            backEnd.firstWriteCallback = callback;
            if (backEnd.ref)
                backEnd.ref.once('child_added', callback);
        };
        
    return backEnd;
});