define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/helpers/helpersFn"
], function(_, Backbone, localstorage, helpers) {
	var MovieModel = Backbone.Model.extend({
		defaults: {
			"id": 0,
			"title": "Unknown",
			"type": "movie",
			"backdropPath": "",
			"posterPath": "",
			"voteAverage": 0,
			"releaseDate": 0,
			"runtime": 0,
			"budget": 0,
			"revenue": 100,
			"overview": "",
			"isInFavourites": false,

			"character": ""
		},

		localStorage: new Backbone.LocalStorage("fav-movie"),

		initialize: function(attrs, opts) {
			this.params = opts;
		},

		parse: function(response) {
			var model = {};

			model.id = response.id;
			model.title = response.title;
			model.backdropPath = response.backdrop_path || response.backdropPath;
			model.posterPath = response.poster_path || response.posterPath;
			model.voteAverage = response.vote_average || response.voteAverage;
			model.releaseDate = response.releaseDate || helpers.format(new Date(response.release_date));
			model.runtimeInMin = response.runtime;
			model.runtime = helpers.convertTime(model.runtimeInMin);
			model.budget = response.budget;
			model.revenue = response.revenue;
			model.overview = response.overview;
			model.isInFavourites = (this.localStorage.find({ id: response.id })) ? true : false;

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
		},

		toggleFavourites: function() {
			if(this.get("isInFavourites")) {
				this.set("isInFavourites", false);
				this.destroy();
			} else {
				this.set("isInFavourites", true);
				this.save();
			}
		}
	});

	return MovieModel;
})