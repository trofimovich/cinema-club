define([
	"underscore",
	"backbone",
	"app/helpers/helpersFn"
], function(_, Backbone, helpers) {
	var CreditModel = Backbone.Model.extend({
		defaults: {
			"id": 0,
			"name": "Unknown",
			"profilePath": "",
			"birthday": 0,
			"placeOfBirth": "",
			"homepage": "",
			"biography": ""
		},

		parse: function(response) {
			var model = {};
			model.id = response.id;
			model.name = response.name;
			model.profilePath = response.profile_path;
			model.birthday = helpers.format(response.birthday);
			model.age = helpers.countAge(response.birthday);
			model.placeOfBirth = response.place_of_birth;
			model.homepage = response.homepage;
			model.biography = response.biography;

			model.character = response.character;

			return model;
		},

		initialize: function(options) {
			this.options = options;
		},

		url: function() {
			return [
				"https://api.themoviedb.org/3/person/",
				this.options.personId,
				"?api_key=",
				this.options.api_key
			].join("");
		}
	});

	return CreditModel;
})