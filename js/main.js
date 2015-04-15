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

require(['modules/backEnd','modules/media','modules/ytplayer'], function(backEnd, media, ytplayer) {
    
    var url = 'https://blazing-heat-3187.firebaseio.com/';
    var name = 'tvRemote';    
    
    var session = 'abc123';

    backEnd.setUrl(url);    
    backEnd.setAppName(name);
    backEnd.setSessionId(session);
    
    //backEnd.setFirstWriteCallback(doNothing);
    
    backEnd.init();
    
    media.set(-1, -1, -1, -1);
    
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

        app.generateToken = function() {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";//abcdefghiklmnopqrstuvwxyz";
                var string_length = 3;
                var randomstring = '';
                for (var i=0; i<string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum,rnum+1);
                }
                app.token = randomstring;
                
                if (app.debug)
                    console.log(app.token);
        };
    
        
*/    
    
        ytplayer.init();
        ytplayer.playVideo('player', '');

});