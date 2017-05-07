(function($) {

	'use strict';

	/* Document.ready */
	$(document).ready(function() {
		/* SlidesJS Required: Initialize SlidesJS with a jQuery doc ready */
		$('#slides').slidesjs({
			width: 940,
			height: 528,
			navigation: false,
			navigation: {
	          effect: "fade"
	        },
	        pagination: {
	          effect: "fade"
	        },
			effect: {
	          fade: {
	            speed: 800
	          }
	        }
		});
		
	});

	jQuery(document).ready(function(){  
	   jQuery("#menuzord").menuzord({
			indicatorFirstLevel: "<i class='fa fa-angle-down'></i>"
	   });
	});

	/* Window.load */
	$(window).load(function() {

	});

})(jQuery);
