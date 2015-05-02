define(["modules/backEnd", "modules/ui"], function(backEnd, ui) {
    
	var uiConnect = {};
        
	uiConnect.init = function() {
            //uiConnect.wait = false;
            uiConnect.sessionId = "abc123";  //uiConnect.generateSessionId();//$('#sessionId');
            //uiConnect.connectBtn = $('#connect');
            
            backEnd.setUrl('https://blazing-heat-3187.firebaseio.com/');
            backEnd.setAppName('tvRemote');
            backEnd.sessionId = uiConnect.sessionId;
            backEnd.init();
            //ui.init();
            
            //uiConnect.registerEvents();
        };
        
        // register uiConnect events
	uiConnect.registerEvents = function() {
            uiConnect.connectBtn.on('click', uiConnect.setSessionIdFunction);
        };
        
        uiConnect.setSessionIdFunction = function() {
            var session = uiConnect.sessionId.val();
            
            backEnd.setSessionId(session);
            
            uiConnect.slide();
            
            backEnd.setFirstWriteCallback(uiConnect.slide);
            backEnd.init();
        };
        
        uiConnect.slide = function() {
            $.mobile.changePage("#remote", {transition: "slide", changeHash: false});
            if (!uiConnect.wait) {
                $.mobile.loading('show');
                uiConnect.wait = !uiConnect.wait;
            }
            else {
                $.mobile.loading('hide');
                uiConnect.wait = !uiConnect.wait;
            }
        };
        
        uiConnect.generateSessionId = function() {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";//abcdefghiklmnopqrstuvwxyz";
                var string_length = 3;
                var randomstring = '';
                for (var i=0; i<string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum,rnum+1);
                }
                return randomstring;
        };
        
    return uiConnect;
});