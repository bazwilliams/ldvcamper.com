+function($, _) {
	"use strict";
	var flickrelements = $(document).find('.flickrslideshow'),
		imagethumbTemplate = function (src, description, title) {
			return '<div class="col-xs-4 col-md-2">' +
				   '<div class="thumbnail loading">'+
				   '<img src="" alt="">'+
				   '</div>'+
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
		addFlickrImage = function (parent, flickrId) {
			var el = $(imagethumbTemplate());
			parent.find('.mediacontainer').append(el);
			$.when(flickrJSON('getSizes', flickrId)).then(function (sizeData) {
				var thumb = _.where(sizeData.sizes.size, { "label":"Large Square" } )[0],
					standard = _.where(sizeData.sizes.size, { "label":"Medium"} )[0];
				el.find('img').attr('src', '');
				el.find('.loading').removeClass('loading');
				el.find('img').attr('src', thumb.source);
			});
			$.when(flickrJSON('getInfo', flickrId)).then(function (infoData) {
				var title = infoData.photo.title._content,
					description = infoData.photo.description._content,
					url = _.where(infoData.photo.urls.url, { "type":"photopage" } )[0]._content;
				// el.find('.imagetext').text(title);
				el.find('img').attr('alt', title);
			});
		};
	flickrelements.each(function () {
		var parent = $(mediaGroup());
		$(this).data('ids').forEach(function (flickrId) {
			addFlickrImage(parent, flickrId);
		});
		$(this).append(parent);
	});
}(jQuery, _);