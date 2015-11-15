require.config({
	paths: {
		"jquery": "../vendor/jquery/dist/jquery",
		"underscore": "../vendor/underscore-amd/underscore",
		"backbone": "../vendor/backbone-amd/backbone",
		"bootstrap": "../vendor/bootstrap/dist/js/bootstrap",
		"requirejs-text": "../vendor/text/text",
		"backbone-local-storage": "../vendor/backbone.localStorage/backbone.localStorage-min",
		"backbone-crossdomain": "../vendor/backbone.crossdomain/Backbone.CrossDomain",
		"nicescroll": "../vendor/jquery.nicescroll/jquery.nicescroll.min"
	},

	shim: {
		"bootstrap": {
			deps: ["jquery"],
			exports: "$.fn.popover"
		},

		"backbone-local-storage": {
			deps: ["backbone"]
		},

		"nicescroll": {
			deps: ["jquery"]
		}
	}
});

require([
	"app/app"
], function(App) {
	
});