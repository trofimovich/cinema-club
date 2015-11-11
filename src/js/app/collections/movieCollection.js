define([
	"underscore",
	"backbone",
	"app/models/movieModel"
], function(_, Backbone, MovieModel) {
	var MovieCollection = Backbone.Collection.extend({
		model: MovieModel,

		initialize: function(params) {
			this.params = params;
		},

		url: function() {

			/*
				url_example: https://api.themoviedb.org/3/person/1892/movie_credits?api_key=some_api_key

				category: person, movie, etc.
				itemId: 1892, etc.
				subcategory: movie_credits, etc.
				api_key: 12345...
			*/

			return [
				"https://api.themoviedb.org/3/",
				this.params.category,
				"/",
				this.params.itemId,
				"/",
				this.params.subcategory,
				"?api_key=",
				this.params.api_key
			].join("");
		},

		parse: function(response) {
			return (this.params.subcategory === "movie_credits") ? response.cast : response.results;
		},

		onFetchSuccess: function(collection, response) {
			console.log("fetched");
		},

		onFetchError: function(collection, response) {
			throw new Error("Movies collection fetch error");
		}
	});

	return MovieCollection;
});