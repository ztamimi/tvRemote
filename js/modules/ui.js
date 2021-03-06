// ui object
define(["modules/media", "jquery"], function(media, $) {
	var ui = {};
        
	ui.init = function() {
            ui.volInput = $('#volume').slider();
            ui.speakerBtn = $('#speaker');
            ui.speakerImg = $('#speakerImg');
            
            //ui.saveLastVolumeValue(parseInt(ui.volInput.val()));
            
            ui.playPauseBtn = $('#playPause');
            ui.playPauseImg = $('#playPauseImg');
            
            ui.previousMediaBtn = $('#previousMedia');
            ui.nextMediaBtn = $('#nextMedia');
            
            
            
            ui.registerEvents();
            
            media.init();
            media.setUpdateByMediaCallback(ui.updateByMedia);
	};
        
	ui.registerEvents = function() {
                ui.playPauseBtn.on('click', ui.clickPlayPauseBtn);                
                ui.volInput.on('change', ui.changeVolumeSlider);
                ui.speakerBtn.on('click', ui.clickSpeakerBtn);
                ui.previousMediaBtn.on('click', ui.clickPreviousBtn);
                ui.nextMediaBtn.on('click', ui.clickNextBtn);
	};
        
        /////////// ui methods //////////////
        ui.saveLastVolumeValue = function(volume) {
            ui.volume = volume;
        };
        
        ui.getLastVolumeValue = function() {
            return ui.volume;
        };
        
        ui.clickPlayPauseBtn = function() {
            if (ui.playPauseBtn.attr('data-play') === "play") {
                ui.setPlayPause(false);
                media.updateByUi("play", false);
            }
            else {
                ui.setPlayPause(true);
                media.updateByUi("play", true);
            }
        };
        
        ui.changeVolumeSlider = function() {
            var volume = parseInt(ui.volInput.val());
            
            //ui.saveLastVolumeValue(volume);
            
            ui.setSpeaker(volume);
           
            media.updateByUi("volume", volume);
        };
        
        ui.clickSpeakerBtn = function() {
            var newVolumeValue;
            if (ui.speakerBtn.attr('data-func') === 'speaker')
                newVolumeValue = 0;
            else
                newVolumeValue = 25;
            
            ui.setSpeaker(newVolumeValue);
            ui.setVolume(newVolumeValue);
            
            media.updateByUi("volume", newVolumeValue);
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
                    ui.setPlayPause(value);
                    break;
                
                case "volume":
                    ui.setVolume(value);
                    ui.setSpeaker(value);
                    break;    
            };
        };
        
        ui.setPlayPause = function(value) {            
            console.log("ui.setPlayPause called " + value);
            if (value ) {
                ui.playPauseBtn.attr('data-play', "play");
                ui.playPauseImg.attr('src', 'css/pause.png');
            }
            else {
                ui.playPauseBtn.attr('data-play', "pause");
                ui.playPauseImg.attr('src', 'css/play.png');
            }
        };
        
        ui.setVolume = function(volume) {
            //ui.saveLastVolumeValue(volume);
            
            ui.volInput.val(volume);
            ui.volInput.slider('refresh');
        };
        
        ui.setSpeaker = function(volume) {
            if (volume > 0) {
                ui.speakerBtn.attr('data-func', 'speaker');
                ui.speakerImg.attr('src', 'css/speaker.png');
            }
            else {
               ui.speakerBtn.attr('data-func', 'mute');
               ui.speakerImg.attr('src', 'css/mute.png');
            }
        };
        
        /*
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
        */
        
        
    return ui;
});