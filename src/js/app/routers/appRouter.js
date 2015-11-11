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
			"movie/:id": "goToMovie",
			"person/:id": "goToPerson"
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

		goToPerson: function(personId) {
			this.appView.setPage("person", personId);
		},

		goToFavourites: function() {
			this.appView.setPage("favourites");
		}
	});

	return AppRouter;
});