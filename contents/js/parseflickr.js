+function($, _) {
	"use strict";
	var dataPromise = $.getJSON("photos/data.json");
	var flickrelements = $(document).find('.flickrslideshow'),
		galleryId = 0,
		imagethumbTemplate = function (galleryId) {
			return '<div class="col-xs-4 col-sm-3 col-md-2">' +
				   '<a href="" rel="'+ galleryId + '" class="fancybox thumbnail loading">'+
				   '<img src="images/FFFFFF-0.png" width=150 height=150 alt="">'+
				   '</a>'+
				   '</div>';
		},
		mediaGroup = function () {
			return '<div class="row">' +
				   '<div class="mediacontainer col-md-12"></div>' +
				   '</div>';
		},
		addFlickrImage = function (parent, flickrId, galleryId) {
			var el = $(imagethumbTemplate(galleryId));
			parent.find('.mediacontainer').append(el);
			$.when(dataPromise).then(function (data) {
				var photo = _.where(data, { "id": flickrId } )[0];
				if (photo) {
					el.find('a').attr('title', photo.description);
					el.find('img').attr('alt', photo.description);
					el.find('img').attr('title', photo.title);
					el.find('img').attr('src', photo.localThumb);
					el.find('a').attr('href', photo.localStandard);
					el.find('.loading').removeClass('loading');
				} else {
					console.log("Photo not found: '"+ flickrId+"'");
				}
			});
		};
	flickrelements.each(function () {
		var parent = $(mediaGroup());
		galleryId++;
		var ids = $(this).data('ids');
		if(ids) {
			ids.forEach(function (flickrId) {
				addFlickrImage(parent, parseInt(flickrId), 'gallery-'+galleryId);
			});
		} else {
			$(this).append("<HR>");
			console.log("Missing data-ids: " + $(this));
		}
		$(this).append(parent);
	});
}(jQuery, _);