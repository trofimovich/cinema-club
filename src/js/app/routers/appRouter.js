define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"" : "goToIndex",
			"index" : "goToIndex",
			"movie/:id" : "goToMovie"
		},

		initialize: function(params) {
			this.appView = params.view;
		},

		goToIndex: function() {
			this.appView.setPage("index");
		},

		goToMovie: function(movieId) {
			console.log("goingToMovie");
			this.appView.setPage("movie", movieId);
		}
	});

	return AppRouter;
});