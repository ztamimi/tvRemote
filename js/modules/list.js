// list object
define(["modules/media", "modules/ui", "jquery"], function(media, ui, $) {
	var list = {};

	list.init = function() {             
            list.addUrlBtn = document.getElementById("addUrl");
            list.urlInput = document.getElementById("url");
            list.videoList = $("#videoList");
            
            list.registerEvents();
	};

	// register events
	list.registerEvents = function() {
            list.addUrlBtn.addEventListener("click", list.addUrl, false);
            //list.videoList.addEventListener("click", list.)
            list.videoList.on('click', 'li a.data', list.clickItem);
            list.videoList.on('click', 'li a.delete', list.deleteItem);
	};
        
        list.clickItem = function() {
            var listItem = $(this).parent("li");
            console.log("click item");
            console.log("index: " + listItem.index("li"));
            //listItem.attr("data-theme", "c");
        };
        
        list.deleteItem = function() {
            var listItem = $(this).parent('li');
            //console.log("delete item");
            var index = listItem.index("li");
            //console.log("index: " + index);
            media.playList.splice(index, 1);
            //console.log("media.playList: " + media.playList);
            listItem.remove();
            //list.videoList.listview.refresh();
        };
        
        list.addUrl = function() {
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
            
            media.playList.push(param);
            
            console.log("media.playList: " + media.playList);
            
            list.urlInput.value = "";
            
            $.getJSON("https://www.googleapis.com/youtube/v3/videos", {
					key: "AIzaSyBceX56re-t1h1JlKgOoAVa3w8S3pxmAX0",
					part: "snippet,statistics",
					id: param
				}, function(data) {
					if (data.items.length === 0) {
						$("<p style='color: #F00;'>Video not found.</p>").appendTo("#video-data-1");
						return;
					}
                                        var item = $("<li>"); //, {class: "ui-li-has-thumb ui-last-child"});
                                        var link = $("<a>", {href: '#', class: 'data'}); //, class: 'ui-btn ui-btn-icon-right ui-icon-carat-r'});
                                        
					var thumb = $("<img>", {
						src: data.items[0].snippet.thumbnails.default.url,
						//width: data.items[0].snippet.thumbnails.default.width,
						//height: data.items[0].snippet.thumbnails.default.height
					});
                                        ui.addToCarousel(data.items[0].snippet.thumbnails.default.url);
                                        var title = $("<p></p>").text(data.items[0].snippet.title);
                                        var icon = $("<a>", {href:'', class:'delete ui-btn ui-btn-icon-notext ui-icon-delete', title:'Delete'});
                                        link.append(thumb);
                                        link.append(title);
                                        item.append(link);
                                        item.append(icon);
                                        item.appendTo("#videoList");
                                        $("#videoList").listview( "refresh");
				}).fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log("error");
					//$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});
        };
         
        return list;
});