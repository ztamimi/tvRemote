require.config({
    baseUrl: 'js',
    
    paths: {
        "firebase": "http://cdn.firebase.com/js/client/2.2.2/firebase",
        "jquery": "http://code.jquery.com/jquery-1.11.1.min"
       // "ytplayer": "http://www.youtube.com/iframe_api"
    }
});

//requirejs(["jquery"]);
//requirejs(["ytplayer"]);

require(['modules/backEnd','modules/media','modules/tv'], function(backEnd, media, tv) {
    
    var url = 'https://blazing-heat-3187.firebaseio.com/';
    var name = 'tvRemote';    
    
    var session = 'abc123';

    backEnd.setUrl(url);    
    backEnd.setAppName(name);
    backEnd.setSessionId(session);
    
    //backEnd.setFirstWriteCallback(doNothing);
    
    //backEnd.init();
    
    //media.set(-1, -1, -1, -1);
    
    	// app object
/*
	app.init = function(n, d, url) {
		app.name = n;
		app.debug = d;
                // generate token
                app.generateToken();
                backEnd.init(url, app.token);
                media.init(-1, -1, -1, 0);	
                ui.init();
                ui.setTokenFunction(app.token);
	};    
*/    
    tv.init();
        

});