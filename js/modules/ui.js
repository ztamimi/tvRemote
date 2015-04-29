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
            
            ui.fullscreenBtn = $('#fullscreen');
            ui.fullscreenImg = $('#fullscreenImg');
            
            ///// carousel ////////////////
            var w = window.innerWidth;
            console.log("window.innerWidth: " + w);
            $("#carousel").css({width: w});
            
            ui.imageWidth = parseInt(w/4);
            console.log("ui.imageWidth: " + ui.imageWidth);
            $(".slideImg").css({width: ui.imageWidth});
            
            ui.backBtn = $("#back"); 
            ui.nextBtn = $("#next"); 
            ui.list = $("#carousel ul");
            
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
                ui.fullscreenBtn.on('click', ui.clickFullscreenBtn);
                
                //// carousel events ///////
                ui.backBtn.on("click", ui.clickBack);
                ui.nextBtn.on("click", ui.clickNext);
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
        
        ui.clickFullscreenBtn = function() {
            if (ui.fullscreenBtn.attr('data-size') === "standard") {
                ui.setFullscreen(true);
                media.updateByUi("fullscreen", true);
            }
            else {
                ui.setFullscreen(false);
                media.updateByUi("fullscreen", false);
            }
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
                
                case "fullscreen":
                    ui.setFullscreen(value);
                    break;
            };
        };
        
        ui.setPlayPause = function(value) {            
            //console.log("ui.setPlayPause called " + value);
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
        
        ui.setFullscreen = function(value) {
            if (value) {
                ui.fullscreenBtn.attr('data-size', "fullscreen");
                ui.fullscreenImg.attr('src', "css/fullscreenExit.png");
            }
            else {
                ui.fullscreenBtn.attr('data-size', "standard");
                ui.fullscreenImg.attr('src', "css/fullscreen.png");
            }
        };
        
        //////////// carousel functions ////////////////////
            
            ui.addToCarousel = function(url, videoId) {
                var item = $("<li>", {'data-videoId': videoId});
                var img = $("<img>", {src: url, class: "slideImg"});
                item.append(img);
                item.appendTo(ui.list);
                var imgNum = ui.list.children().size();
                var imgWidth = $(".slideImg").css("width");
                var totalWidth = imgNum * parseInt(imgWidth);
                ui.list.css({width: totalWidth});
            };
            
            ui.removeCarouselItem = function(videoId) {
                var item = $("li[data-videoId*=" + videoId + "]")[0];
                item.remove();
            };
            
            ui.clickNext = function() {
                shift = '-' + ui.imageWidth;
                ui.list.animate({marginLeft: shift}, ui.nextCallback);
            };
            
            ui.clickBack = function() {
                ui.list.animate({marginLeft: ui.imageWidth}, ui.backCallback);
            };
            
            ui.nextCallback = function() {
                console.log("next callback");
                var lastItem = ui.list.find("li:last");
                var firstItem = ui.list.find("li:first");
                lastItem.after(firstItem);
                ui.list.css({marginLeft: 0});
            };
            
            ui.backCallback = function() {
                console.log("back callback");
        	var lastItem = ui.list.find("li:last");
                var firstItem = ui.list.find("li:first");
                firstItem.before(lastItem);
                ui.list.css({marginLeft: 0});
            };
    return ui;
});