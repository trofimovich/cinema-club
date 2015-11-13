define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/models/personModel",
	"app/models/movieModel"
], function(_, Backbone, localstorage, PersonModel, MovieModel) {
	var FavouritesCollection = Backbone.Collection.extend({

		localStorage: new Backbone.LocalStorage("fav-person"),
/*
		comparator: function(model) {
			console.log(model.get("title"));
			return model.get("title");
		},
*/
		initialize: function(params) {
			this.params = params;
			switch (this.params.modelType) {
				case "movies":
					this.localStorage = new Backbone.LocalStorage("fav-movie");
					this.model = MovieModel;
					break;
				case "persons":
					this.localStorage = new Backbone.LocalStorage("fav-person");
					this.model = PersonModel;
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