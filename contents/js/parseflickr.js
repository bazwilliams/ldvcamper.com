+function($, _) {
	"use strict";
	var flickrelements = $(document).find('.flickrslideshow'),
		galleryId = 0,
		imagethumbTemplate = function (galleryId) {
			return '<div class="col-xs-4 col-md-2">' +
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
		flickrJSON = function (method, id) {
			return $.getJSON("https://api.flickr.com/services/rest/", { 
				method: 'flickr.photos.'+method,
				photo_id: id,
				format: 'json',
				api_key: 'b1734bd76001217414b2fbdde16cda7c',
				nojsoncallback: 1
			});
		},
		addFlickrImage = function (parent, flickrId, galleryId) {
			var el = $(imagethumbTemplate(galleryId));
			parent.find('.mediacontainer').append(el);
			$.when(flickrJSON('getSizes', flickrId)).then(function (sizeData) {
				var thumb = _.where(sizeData.sizes.size, { "label":"Large Square" } )[0],
					standard = _.where(sizeData.sizes.size, { "label":"Medium 640"} )[0];
				el.find('img').attr('src', thumb.source);
				el.find('a').attr('href', standard.source);
				el.find('.loading').removeClass('loading');
			});
			$.when(flickrJSON('getInfo', flickrId)).then(function (infoData) {
				var title = infoData.photo.title._content,
					description = infoData.photo.description._content,
					url = _.where(infoData.photo.urls.url, { "type":"photopage" } )[0]._content;
				el.find('a').attr('title', description);
				el.find('img').attr('alt', description);
				el.find('img').attr('title', title);
			});
		};
	flickrelements.each(function () {
		var parent = $(mediaGroup());
		galleryId++;
		$(this).data('ids').forEach(function (flickrId) {
			addFlickrImage(parent, flickrId, 'gallery-'+galleryId);
		});
		$(this).append(parent);
	});
}(jQuery, _);