define([
	"underscore",
	"backbone"
], function(_, Backbone) {
	var MovieModel = Backbone.Model.extend({
		defaults: {
			"title": "",
			"backgroundPath": "",
		},

		initialize: function(params) {
			this.params = params;
		},

		url: function() {
			return [
				"https://api.themoviedb.org/3/movie/",
				this.params.movieId,
				"?api_key=",
				this.params.api_key
			].join("");
		},

		sync: function(method, model, options) {
			options.timeout = 8000;
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
	});

	return MovieModel;
})