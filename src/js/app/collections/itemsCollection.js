define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/models/itemModel",
	"app/config"
], function(_, Backbone, localstorage, ItemModel, config) {
	var FavouritesCollection = Backbone.Collection.extend({

		model: ItemModel,

		url: function() {
			return [
				"https://api.themoviedb.org/3/search/multi?query=",
				this.params.search,
				"&api_key=",
				config.API_KEY
			].join("");
		},

		parse: function(response) {
			return response.results;
		},

		initialize: function(params) {
			this.params = params;
			this.localStorage = params.localStorage;
		}
	});

	return FavouritesCollection;
});