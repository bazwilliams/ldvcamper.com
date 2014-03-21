if (typeof jQuery === 'undefined') { throw new Error('parseflickr requires jQuery') }

+function($) {
	"use strict";
	var flickrelements = $(document).find('.flickrslideshow');
	flickrelements.each(function () {
		var el = $(this);
		el.data('ids').forEach(function (id) {
			el.append('<div class="flickrimage">' + id + '<img src="' + id + '"/></div>');
		});
	});
}(jQuery);