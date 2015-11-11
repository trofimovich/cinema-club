define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/models/creditModel",
	"app/models/movieModel"
], function(_, Backbone, localstorage, CreditModel, MovieModel) {
	var FavouritesCollection = Backbone.Collection.extend({

		localStorage: new Backbone.LocalStorage("fav-person"),

		initialize: function(params) {
			this.params = params;
			switch (this.params.modelType) {
				case "movies":
					this.localStorage = new Backbone.LocalStorage("fav-movie");
					this.model = MovieModel;
					break;
				case "persons":
					this.localStorage = new Backbone.LocalStorage("fav-person");
					this.model = CreditModel;
					break;
			}
		},

		onFetchSuccess: function(collection, response) {
			console.log("fetched");
		},

		onFetchError: function(collection, response) {
			throw new Error("Movies collection fetch error");
		}
	});

	return FavouritesCollection;
});