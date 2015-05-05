// list object
define(["modules/control", "modules/ui", "jquery"], function(control, ui, $) {
	var list = {};

	list.init = function() {
            list.addUrlBtn = document.getElementById("addUrl");
            list.urlInput = document.getElementById("url");
            list.videoList = $("#videoList");
            
            list.registerEvents();
	};

	list.registerEvents = function() {
            list.addUrlBtn.addEventListener("click", list.clickAddVideo, false);
            list.videoList.on('click', 'li a.data', list.clickItem);
            list.videoList.on('click', 'li a.delete', list.clickDeleteVideo);
	};
        
        list.clickItem = function() {
            var listItem = $(this).parent("li");
            var videoId = listItem.attr("data-videoId");
            control.clickItem(videoId);
            ui.slide();
        };
        
        list.clickAddVideo = function() {
            var videoId = list.getVideoId();
            list.addVideo(videoId);
            control.addVideo(videoId);
        };
        
        list.clickDeleteVideo = function() {
            var listItem = $(this).parent('li');
            var videoId = listItem.attr("data-videoId");
            listItem.remove();
            control.deleteVideo(videoId);
            ui.removeCarouselItem(videoId);
        };
        
        list.deleteVideo = function(videoId) {
            //var listItem = $(this).parent('li');
            //var videoId = listItem.attr("data-videoId");
            //listItem.remove();
            //control.deleteVideo(videoId);
            //ui.removeCarouselItem(videoId);
        };
        
        list.getVideoId = function() {
            var url = list.urlInput.value;
            if (!url)
                return;
            var temp = url.split("://")[1];
            if (!temp)
                return;
            var site = temp.split("?")[0];
            if (site.toLowerCase() !== "www.youtube.com/watch") {
                console.log("invalid youtube url");
                return;
            }
            var param = url.split("?")[1].split("v=")[1].split("&")[0];
            return param;
        };
        
        list.addVideo = function(videoId) {
            list.urlInput.value = "";
           
            var item = $("<li>", {'data-videoId': videoId});
            var link = $("<a>", {href: '#', class: 'data'});
            var thumb = $("<img>", {src: list.imgUrl});
            var title = $("<p></p>").text(list.videoTitle);
            var icon = $("<a>", {href:'', class:'delete ui-btn ui-btn-icon-notext ui-icon-delete', title:'Delete'});
            link.append(thumb);
            link.append(title);
            item.append(link);
            item.append(icon);
            item.appendTo("#videoList");
            
            var slideImg = ui.addToCarousel(videoId);
            
            list.getVideoInfo(videoId, title, thumb, slideImg);
            $("#videoList").listview( "refresh");
        };
        
        list.getVideoInfo = function (videoId, title, thumb, slideImg) {
            $.getJSON("https://www.googleapis.com/youtube/v3/videos", {
					key: "AIzaSyBceX56re-t1h1JlKgOoAVa3w8S3pxmAX0",
					part: "snippet,statistics",
					id: videoId
				}, function(data) {  
                                    if (data.items.length === 0) {
                                        return;
                                    }
                                    title.text(data.items[0].snippet.title);
                                    thumb.attr("src", data.items[0].snippet.thumbnails.default.url);
                                    slideImg.attr("src", data.items[0].snippet.thumbnails.default.url);

                    }); 
                                
        };    
            /*.fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log("getJSON error");
                                    return null;
					//$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});*/
        
        
        list.updateListByControl = function(task, videoId) {
            if (task === 'add') 
                list.addVideo(videoId);
            if (task === 'delete')
                list.deleteVideo(videoId);
        };
        
        return list;
});