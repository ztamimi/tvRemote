// list object
define(["modules/media", "jquery"], function(media, $) {
	var list = {};

	list.init = function() {             
            list.addUrlBtn = document.getElementById("addUrl");
            list.urlInput = document.getElementById("url");
            
            list.registerEvents();
	};

	// register events
	list.registerEvents = function() {
            list.addUrlBtn.addEventListener("click", list.addUrl, false);
	};
        
        list.addUrl = function() {
            var url = list.urlInput.value;
            var temp = url.split("://")[1];
            var site = temp.split("?")[0];
            if (site.toLowerCase() !== "www.youtube.com/watch") {
                console.log("invalid youtube url");
                return;
            }
            var param = url.split("?")[1].split("v=")[1].split("&")[0];
            
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
                                        var link = $("<a>", {href: '#'}); //, class: 'ui-btn ui-btn-icon-right ui-icon-carat-r'});
					var thumb = $("<img>", {
						src: data.items[0].snippet.thumbnails.default.url,
						//width: data.items[0].snippet.thumbnails.default.width,
						//height: data.items[0].snippet.thumbnails.default.height
					});
                                        var title = $("<p></p>").text(data.items[0].snippet.title);
                                        link.append(thumb);
                                        link.append(title);
                                        item.append(link);
                                        item.appendTo("#list");
                                        $("#list").listview( "refresh");
				}).fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log("error");
					//$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});
        };
         
        return list;
});