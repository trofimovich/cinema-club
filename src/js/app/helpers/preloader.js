define(["jquery"], function($) {
	var preloader = (function() {
		var preloaderEl;
		startPreloader = function() {

			preloaderEl = $("<div></div>");
			preloaderEl.css({
				"position": "fixed",
				"top": 0,
				"left": 0,
				"width": "100%",
				"height": "100%",
				"z-index": 10,
				"background": "white",
				"opacity": "0.9"
			});

			spinnerEl = $("<i class='fa fa-5x fa-spin fa-cog'></i>").css({
				"position": "fixed",
				"top": "50%",
				"left": "50%"
			});

			spinnerEl.appendTo(preloaderEl);

			$("body").append(preloaderEl);
		}

		stopPreloader = function() {
			preloaderEl.hide(200);
		}

		return {
			startPreloader: startPreloader,
			stopPreloader: stopPreloader
		}
	})();

	return preloader;
})