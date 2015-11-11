define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "goToIndex",
			"index": "goToIndex",
			"favourites/:section": "goToFavourites",
			"movie/:id": "goToMovie",
			"person/:id": "goToPerson"
		},

		initialize: function(params) {
			this.appView = params.view;
		},

		goToIndex: function() {
			console.log("wow");
			this.appView.setPage("index");
		},

		goToMovie: function(movieId) {
			this.appView.setPage("movie", movieId);
		},

		goToPerson: function(personId) {
			this.appView.setPage("person", personId);
		},

		goToFavourites: function(section) {
			this.appView.setPage("favourites", section);
		}
	});

	return AppRouter;
});