define([
	"underscore",
	"backbone",
	"app/helpers/helpersFn"
], function(_, Backbone, helpers) {
	var MovieModel = Backbone.Model.extend({
		defaults: {
			"id": 0,
			"title": "Unknown",
			"backdropPath": "",
			"posterPath": "",
			"voteAverage": 0,
			"releaseDate": 0,
			"runtime": 0,
			"budget": 0,
			"revenue": 100,
			"overview": "",

			"character": ""
		},

		initialize: function(params) {
			this.params = params;
		},

		parse: function(response) {
			var model = {};

			model.id = response.id;
			model.title = response.title;
			model.backdropPath = response.backdrop_path;
			model.posterPath = response.poster_path;
			model.voteAverage = response.vote_average;
			model.releaseDate = helpers.format(new Date(response.release_date));
			model.runtime = helpers.convertTime(response.runtime);
			model.budget = response.budget;
			model.revenue = response.revenue;
			model.overview = response.overview;

			model.character = response.character;

			return model;
		},

		url: function() {
			return [
				"https://api.themoviedb.org/3/movie/",
				this.params.movieId,
				"?api_key=",
				this.params.api_key
			].join("");
		}
	});

	return MovieModel;
})