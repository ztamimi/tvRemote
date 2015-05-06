require.config({
    baseUrl: 'js',
    
    paths: {
        "firebase": "http://cdn.firebase.com/js/client/2.2.2/firebase",
        "jquery": "http://code.jquery.com/jquery-1.11.1.min"
    }
});

require(['modules/backEnd', 'modules/tv', 'modules/ytplayer'], function(backEnd, tv, ytplayer) {
    
    ytplayer.init();
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
    
});