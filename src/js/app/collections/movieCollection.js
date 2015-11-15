define([
	"underscore",
	"backbone",
	"app/models/movieModel",
	"app/config"
], function(_, Backbone, MovieModel, config) {
	var MovieCollection = Backbone.Collection.extend({
		model: MovieModel,

		initialize: function(params) {
			this.params = params;
		},

		url: function() {
			return [
				"https://api.themoviedb.org/3/",
				this.params.url,
				"api_key=",
				config.API_KEY
			].join("");
		},

		parse: function(response) {
			return response.cast || response.results;
		}
	});

	return MovieCollection;
});