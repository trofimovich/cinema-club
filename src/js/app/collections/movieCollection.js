define([
	"underscore",
	"backbone",
	"app/models/movieModel"
], function(_, Backbone, MovieModel) {
	var MovieCollection = Backbone.Collection.extend({
		model: MovieModel,

		sync: function(method, model, options) {
			options.timeout = 8000;
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},

		initialize: function() {
/*			this.fetch({
				success: this.onFetchSuccess,
				error: this.onFetchError,
				reset: true
			});*/
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