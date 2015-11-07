require.config({
	paths: {
		"jquery": "../vendor/jquery/dist/jquery",
		"underscore": "../vendor/underscore-amd/underscore",
		"backbone": "../vendor/backbone-amd/backbone",
		"bootstrap": "../vendor/bootstrap/dist/js/bootstrap",
		"requirejs-text": "../vendor/text/text"
	},

	shim: {
		"bootstrap": {
			deps: ["jquery"],
			exports: "$.fn.popover"
		}
	}
});

require([
	"app/app"
], function(App) {
	
});