require.config({
    baseUrl: 'js',
    
    paths: {
        "firebase": "http://cdn.firebase.com/js/client/2.2.2/firebase",
        "jquery": "http://code.jquery.com/jquery-1.11.1.min",
        "jqueryMobile": "http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min"
    }
});

requirejs(["jquery"]);
requirejs(["jqueryMobile"]);

require(['modules/uiConnect', 'modules/ui', 'modules/list'], function(uiConnect, ui, list) {
    
    uiConnect.init();
    ui.init();
    list.init();
    //list.init();
    //uiConnect.init();
    
    //backEnd.setSessionId(session);
    
    //backEnd.init();
    //backEnd.setReceiveCallback(receiveCallback);
    //backEnd.setFirstWriteCallback(firstWriteCallback);
    /*
    media.init();
    media.updateByUi("volume", 50);
    media.updateByUi("length", 4);
    media.shiftIndexByUi(1);
    */
   
    //ui.init();
   

});