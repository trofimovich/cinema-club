define([
	"underscore",
	"backbone",
	"app/models/videoModel",
	"app/config"
], function(_, Backbone, VideoModel, config) {
	var MovieCollection = Backbone.Collection.extend({
		model: VideoModel,

		url: function() {
			return [
				"https://api.themoviedb.org/3/",
				this.params.url,
				"api_key=",
				config.API_KEY
			].join("");
		},

		initialize: function(params) {
			this.params = params;
		},

		parse: function(response) {
			return response.results;
		}
	});

	return MovieCollection;
});