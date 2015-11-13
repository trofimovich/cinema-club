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
			"type": "",
			"imagePath": "",
			"voteAverage": 0,
			"isInFavourites": false,
			"description": ""
		},

		initialize: function(attrs, opts) {
			this.params = opts;
		},

		parse: function(response) {
			var model = {};

			model.id = response.id;
			model.title = response.title || response.name;
			model.imagePath = response.backdrop_path || response.profile_path || response.backdropPath;
			model.type = response.media_type;
			model.voteAverage = response.vote_average || response.voteAverage;
			model.description = response.overview || response.biography;

			return model;
		}
	});

	return MovieModel;
})