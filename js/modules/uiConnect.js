define(["modules/backEnd"], function(backEnd) {
    
	var uiConnect = {};
        
	uiConnect.init = function() {
            uiConnect.wait = false;
            uiConnect.sessionId = $('#sessionId');
            uiConnect.connectBtn = $('#connect');
            uiConnect.registerEvents();
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
        
    return uiConnect;
});