// main object
define(["modules/backEnd"], function(backEnd) {
	var app = {name: "", debug: false, token: ""};
	app.init = function(n, d) {
		app.name = n;
		app.debug = d;
                //backEnd.init(url);
	};
	
        app.setTokenFunction = function(t) {
                app.token = t;
                backEnd.setToken();
        };
});
    
	media.init(100, false, 0, 0);	
        ui.init();
        
        app.init('remote', true);
	backEnd.init('https://blazing-heat-3187.firebaseio.com/');	
