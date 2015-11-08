define([
	"underscore",
	"backbone",
	"app/models/videoModel"
], function(_, Backbone, VideoModel) {
	var MovieCollection = Backbone.Collection.extend({
		model: VideoModel,

		sync: function(method, model, options) {
			options.timeout = 8000;
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},

		url: function() {
			console.log(this.params)
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