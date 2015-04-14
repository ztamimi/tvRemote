// ui object
define(["modules/media", "jquery"], function(media, $) {
	var ui = {};
        
	ui.init = function() {
            ui.volInput = $('#vol').slider();
            ui.playPauseBtn = $('#playPause');
            ui.previousMediaBtn = $('#previousMedia');
            ui.nextMediaBtn = $('#nextMedia');
            
            ui.registerEvents();
            
            media.init();
            media.setUpdateByMediaCallback(ui.updateByMedia);
	};
        
	ui.registerEvents = function() {
                ui.playPauseBtn.on('click', ui.clickPlayPauseBtn);
                ui.volInput.on('change', ui.changeVolumeSlider);
                ui.previousMediaBtn.on('click', ui.clickPreviousBtn);
                ui.nextMediaBtn.on('click', ui.clickNextBtn);
	};
        
        /////////// ui methods //////////////
        ui.clickPlayPauseBtn = function() {
            if (ui.playPauseBtn.val() === "play") {
		ui.playPauseBtn.val("pause");
                media.updateByUi("play", true);
                //ui.updateMediaByUiCallback("play", true);

            }
            else {
		ui.playPauseBtn.val("play");
                //ui.updateMediaByUiCallback("play", false);
                media.updateByUi("play", false);
            }
            ui.playPauseBtn.button("refresh"); 
        };
        
        ui.changeVolumeSlider = function() {
            var volume = parseInt(ui.volInput.val());

            //ui.updateMediaByUiCallback("volume", volume);
            media.updateByUi("volume", volume);
        };
        
        ui.clickNextBtn = function() {
            var shift = 1;
            //ui.updateMediaByUiCallback("shift", shift);
            media.updateByUi("shift", shift);
        };
        
        ui.clickPreviousBtn = function() {
            var shift = -1;
            //ui.updateMediaByUiCallback("shift", shift);
            media.updateByUi("shift", shift);
        };
        
        ///// update by media methods ///////////////
        ui.updateByMedia = function(key, value) {
            
            console.log("ui.updateByMedia() called " + key + ":" + value);
            
            switch(key) {
                case "play":
                    ui.updatePlayByMedia(value);
                    break;
                
                case "volume":
                    ui.updateVolumeByMedia(value);
                    break;
            };
        };
        
	ui.updatePlayByMedia = function(play) {
            if (play)
		ui.playPauseBtn.val("pause");
            else 
		ui.playPauseBtn.val("play");
              if (ui.playPauseBtn)      
                ui.playPauseBtn.button("refresh");
        };
        
	ui.updateVolumeByMedia = function(volume) {
            ui.volInput.val(volume);
            ui.volInput.slider('refresh');
	};
        
        //// setter method //////////////////////////
        /*
        ui.setUpdateMediaByUiCallback = function(callback) {
            ui.updateMediaByUiCallback = callback;
        };
        */
        
    return ui;
});