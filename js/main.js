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

require(['modules/backEnd', 'modules/tv', 'modules/ytplayer'], function(backEnd, tv, ytplayer) {
   
    ytplayer.init();
    ytplayer.setPlayerLoadedCallback(init);
    
    function init() {
        console.log("player loaded **************");
    
    tv.setUiValueCallback(ytplayer.updateValueByTv);
    tv.setUiListCallback(ytplayer.updateListByTv);
    
  
    var sessionId = "abc123";              
    backEnd.setUrl('https://blazing-heat-3187.firebaseio.com/');
    backEnd.setAppName('tvRemote');
    backEnd.setSessionId(sessionId);
    
    tv.init();
    
    backEnd.init();
    
    backEnd.setUpdateValueCallback(tv.updateValueByBackEnd);
    backEnd.setUpdateListCallback(tv.updateListByBackEnd);
}
});