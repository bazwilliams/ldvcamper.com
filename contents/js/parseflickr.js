+function($, _) {
	"use strict";
	var flickrelements = $(document).find('.flickrslideshow'),
		imagethumbTemplate = function (src, description, title) {
			return '<div class="imagethumb">' +
				   '<div class="thumb"><img width="32" height="32" class="loading thumb" src="images/712.GIF" alt="Loading"></div>' +
				   '<p class="imagetext">Loading</p>' +
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
		flickrImage = function (parent, id) {
			var el = $(imagethumbTemplate());
			parent.append(el);
			$.when(flickrJSON('getSizes', id)).then(function (sizeData) {
				var thumb = _.where(sizeData.sizes.size, { "label":"Square" } )[0],
					standard = _.where(sizeData.sizes.size, { "label":"Medium 800"} )[0];
				el.find('img').attr('src', '')
				el.find('img').removeClass('loading');
				el.find('img').attr('height', 64)
				el.find('img').attr('width', 64)
				el.find('img').attr('src', thumb.source)
			});
			$.when(flickrJSON('getInfo', id)).then(function (infoData) {
				var title = infoData.photo.title._content,
					description = infoData.photo.description._content,
					url = _.where(infoData.photo.urls.url, { "type":"photopage" } )[0]._content;
				el.find('.imagetext').text(title);
				el.find('img').attr('alt', description);
			});
		};

	flickrelements.each(function () {
		var el = $(this);
		el.data('ids').forEach(function (id) {
			flickrImage(el, id);
		});
	});
}(jQuery, _);