+function($, _) {
	"use strict";
	var carouselId = 0,
		flickrelements = $(document).find('.flickrslideshow'),
		imagethumbTemplate = function (src, description, title) {
			return '<div class="imagethumb">'+
				   '<div class="thumb"><img width="32" height="32" class="loading thumb" src="images/712.GIF" alt="Loading"></div>'+
				   '<p class="imagetext">Loading</p>'+
				   '</div>';
				},
		carouselTemplate = function(id) {
			return '<div id="' + id + '" class="carousel slide" data-ride="carousel">'+
					'<ol class="carousel-indicators"></ol>'+
					'<div class="carousel-inner"></div>'+
					'<a class="left carousel-control" href="#' + id + '" data-slide="prev">'+
					'<span class="glyphicon glyphicon-chevron-left"></span>'+
					'</a>'+
					'<a class="right carousel-control" href="#' + id + '" data-slide="next">'+
					'<span class="glyphicon glyphicon-chevron-right"></span>'+
					'</a>'+
					'</div>';
		},
		carouselIndicator = function(carouselId, index) {
			return '<li data-target="#' + carouselId + '" data-slide-to="' + index + '" class="' + (index === 0?'active':'') + '"></li>';
		},
		carouselImage = function(index) {
			return '<div class="item ' + (index === 0 ? 'active' : '') + '">'+
					'<img src="" alt="">'+
					'<div class="carousel-caption imagetext"></div>'+
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
		addFlickrImage = function (parent, carouselId, flickrId, index) {
			var el = $(carouselImage(index));
			parent.find('.carousel-indicators').append(carouselIndicator(carouselId, index));
			parent.find('.carousel-inner').append(el);
			$.when(flickrJSON('getSizes', flickrId)).then(function (sizeData) {
				var thumb = _.where(sizeData.sizes.size, { "label":"Square" } )[0],
					standard = _.where(sizeData.sizes.size, { "label":"Medium"} )[0];
				el.find('img').attr('src', standard.source)
			});
			$.when(flickrJSON('getInfo', flickrId)).then(function (infoData) {
				var title = infoData.photo.title._content,
					description = infoData.photo.description._content,
					url = _.where(infoData.photo.urls.url, { "type":"photopage" } )[0]._content;
				el.find('.imagetext').text(description);
				el.find('img').attr('alt', title);
			});
		};
	flickrelements.each(function () {
		var parent = $(carouselTemplate(carouselId));
		$(this).data('ids').forEach(function (flickrId, index) {
			addFlickrImage(parent, carouselId, flickrId, index);
		});
		$(this).append(parent);
		carouselId++;
	});
}(jQuery, _);