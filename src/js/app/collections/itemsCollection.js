define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/models/itemModel"
], function(_, Backbone, localstorage, ItemModel) {
	var FavouritesCollection = Backbone.Collection.extend({

		model: ItemModel,

		localStorage: new Backbone.LocalStorage("fav-person"),

		url: function() {
			return [
				"https://api.themoviedb.org/3/search/multi?query=",
				this.params.search,
				"&api_key=",
				this.params.api_key
			].join("");
		},

		parse: function(response) {
			return response.results;
		},

		initialize: function(params) {
			this.params = params;
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