// backEnd object
define(["firebase"], function() {
	var backEnd = {url: null, appName: null, sessionId: null, ref: null, log: null};
        
	backEnd.init = function() {
            var temp = backEnd.url + (backEnd.appName + '/' + backEnd.sessionId  + '/');              
            backEnd.ref = new Firebase(temp);
        };
        
        backEnd.send = function(obj) {
            backEnd.log = obj;
            backEnd.ref.update(obj);
	};
        
	backEnd.receive = function(snapshot) {

            var value = snapshot.val();
            var key = snapshot.key();
            
            var obj = {};
            obj[key] = value;
            if (JSON.stringify(obj) == JSON.stringify(backEnd.log)) {
                return;
            }
            
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
            backEnd.ref.on('child_added', backEnd.receive); 
            backEnd.ref.on('child_changed', backEnd.receive);
        };
        
        backEnd.setFirstWriteCallback = function(callback) {
            backEnd.ref.once('child_added', callback);
        };
        
    return backEnd;
});