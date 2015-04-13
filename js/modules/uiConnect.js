define([""], function() {
	var uiConnect = {};
	uiConnect.init = function() {
            uiConnect.tokenInput = $('#token');
            uiConnect.connectBtn = $('#connect');
            uiConnect.registerEvents();
        };
        // register uiConnect events
	uiConnect.registerEvents = function() {
            uiConnect.connectBtn.on('click', uiConnect.setTokenFunction);
        };
        
        uiConnect.setTokenFunction = function() {
                var t = uiConnect.tokenInput.val();
                app.setTokenFunction(t);
                uiConnect.slide();
        };
        
        uiConnect.slide = function() {
                $.mobile.changePage("#remote", {transition: "slide", changeHash: false});
        };
});