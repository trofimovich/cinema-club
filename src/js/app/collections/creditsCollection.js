define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/models/personModel",
	"app/config"
], function(_, Backbone, localstorage, PersonModel, config) {
	var CreditsCollection = Backbone.Collection.extend({
		model: PersonModel,

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
			return response.cast || response.results;
		}
	});

	return CreditsCollection;
});