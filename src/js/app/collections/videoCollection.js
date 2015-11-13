define([
	"underscore",
	"backbone",
	"app/models/videoModel"
], function(_, Backbone, VideoModel) {
	var MovieCollection = Backbone.Collection.extend({
		model: VideoModel,

		url: function() {
			return [
				"https://api.themoviedb.org/3/movie/",
				this.params.movieId,
				"/videos?api_key=",
				this.params.api_key
			].join("");
		},

		initialize: function(params) {
			this.params = params;
		},

		parse: function(response) {
			return response.results;
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