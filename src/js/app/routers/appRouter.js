define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"" : "goToIndex",
			"index" : "goToIndex",
			"movie" : "goToMovie"
		},

		initialize: function(params) {
			this.appView = params.view;
		},

		goToIndex: function() {
			this.appView.setPage("index");
		},

		goToMovie: function() {
			this.appView.setPage("movie");
		}
	});

	return AppRouter;
});