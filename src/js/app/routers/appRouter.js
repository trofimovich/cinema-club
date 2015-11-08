define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "goToIndex",
			"index": "goToIndex",
			"favourites": "goToFavourites",
			"movie/:id": "goToMovie"
		},

		initialize: function(params) {
			this.appView = params.view;
		},

		goToIndex: function() {
			this.appView.setPage("index");
		},

		goToMovie: function(movieId) {
			this.appView.setPage("movie", movieId);
		},

		goToFavourites: function() {
			this.appView.setPage("favourites");
		}
	});

	return AppRouter;
});