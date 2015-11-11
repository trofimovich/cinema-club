define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/models/creditModel",
], function(_, Backbone, localstorage, CreditModel) {
	var CreditsCollection = Backbone.Collection.extend({
		model: CreditModel,

		url: function() {
			console.log(this.params)
			return [
				"https://api.themoviedb.org/3/movie/",
				this.params.movieId,
				"/credits?api_key=",
				this.params.api_key
			].join("");
		},

		initialize: function(params) {
			this.params = params;
		},

		parse: function(response) {
			return response.cast;
		},

		onFetchSuccess: function(collection, response) {
			console.log("fetched");
		},

		onFetchError: function(collection, response) {
			throw new Error("Movies collection fetch error");
		}
	});

	return CreditsCollection
});