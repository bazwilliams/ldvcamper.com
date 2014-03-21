+function($, _) {
	"use strict";
	var flickrelements = $(document).find('.flickrslideshow'),
		imagethumbTemplate = function (src, description, title) {
			return '<div class="imagethumb">' +
				   '<div class="thumb"><img width="64" height="64" class="thumb" src="' + src + '" alt="' + description + '"></div>' +
				   '<p class="imagetext">' + title + '</p>' +
				   '</div>';
				},
		photoInfoUrl =  "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&api_key=b1734bd76001217414b2fbdde16cda7c&nojsoncallback=1",
		photoSizesUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=b1734bd76001217414b2fbdde16cda7c&nojsoncallback=1",
		flickrImage = function (el, id) {
			$.when(
				$.getJSON(photoSizesUrl + "&photo_id=" + id),
				$.getJSON(photoInfoUrl + "&photo_id=" + id)
			).then(function (sizeData, infoData) {
				var result = {};
				result.thumb = _.where(sizeData[0].sizes.size, { "label":"Square" } )[0];
				result.standard = _.where(sizeData[0].sizes.size, { "label":"Medium 800"} )[0];
				result.title = infoData[0].photo.title._content;
				result.description = infoData[0].photo.description._content;
				result.url = _.where(infoData[0].photo.urls.url, { "type":"photopage" } )[0]._content;
				el.append(imagethumbTemplate(result.thumb.source, result.description, result.title));
			});
		};

	flickrelements.each(function () {
		var el = $(this);
		el.data('ids').forEach(function (id) {
			flickrImage(el, id);
		});
	});
}(jQuery, _);