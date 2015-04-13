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

require(['modules/backEnd', 'modules/media', 'modules/ui'], function(backEnd, media, ui) {
    
    var url = 'https://blazing-heat-3187.firebaseio.com/';
    var name = 'tvRemote';
    var session = 'abc123';
    
    var receiveCallback = function(key, value) {
        console.log(key + ":" + value);
    };
    
    var firstWriteCallback = function() {
        console.log("first write");
    };
    
    backEnd.setUrl(url);
    
    backEnd.setAppName(name);
    backEnd.setSessionId(session);
    
    backEnd.init();
    //backEnd.setReceiveCallback(receiveCallback);
    //backEnd.setFirstWriteCallback(firstWriteCallback);
    /*
    media.init();
    media.updateByUi("volume", 50);
    media.updateByUi("length", 4);
    media.shiftIndexByUi(1);
    */
   
   ui.init();
   

});