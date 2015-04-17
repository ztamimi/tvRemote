// ui object
define(["modules/media", "jquery"], function(media, $) {
	var ui = {};
        
	ui.init = function() {
            ui.volInput = $('#volume').slider();
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
            }
            else {
		ui.playPauseBtn.val("play");
                media.updateByUi("play", false);
            }
            ui.playPauseBtn.button("refresh"); 
        };
        
        ui.changeVolumeSlider = function() {
            var volume = parseInt(ui.volInput.val());

            media.updateByUi("volume", volume);
        };
        
        ui.clickNextBtn = function() {
            var shift = 1;
            media.shiftIndexByUi(shift);
        };
        
        ui.clickPreviousBtn = function() {
            var shift = -1;
            media.shiftIndexByUi(shift);
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
        
        
        
    return ui;
});