define([
	"underscore",
	"backbone",
	"backbone-local-storage",
	"app/helpers/helpersFn",
	"app/config"
], function(_, Backbone, localStorage, helpers, config) {
	var PersonModel = Backbone.Model.extend({
		defaults: function() {
			return {
				"id": 0,
				"type": "person",
				"name": "Unknown",
				"profilePath": "",
				"birthday": 0,
				"personAge": 0,
				"placeOfBirth": "",
				"homepage": "",
				"biography": "",
				"isInFavourites": false,

				"character": ""	
			}
		},

		localStorage: new Backbone.LocalStorage("fav-person"),

		parse: function(response) {
			var model = {};
			model.id = response.id;
			model.name = response.name;
			model.profilePath = response.profile_path || response.profilePath;
			model.birthday = helpers.format(response.birthday);
			model.personAge = helpers.countAge(response.birthday);
			model.placeOfBirth = response.place_of_birth || response.placeOfBirth;
			model.homepage = response.homepage;
			model.biography = response.biography;
			model.character = response.character;
			model.isInFavourites = (this.localStorage.find({ id: response.id })) ? true : false;

			return model;
		},

		initialize: function(attributes, opts) {
			this.params = opts;
		},

		url: function() {
			return [
				"https://api.themoviedb.org/3/person/",
				this.params.personId,
				"?api_key=",
				config.API_KEY
			].join("");
		},

		toggleFavourites: function() {
			if(this.get("isInFavourites")) {
				this.set("isInFavourites", false);
				this.destroy();
			} else {
				favPersons.create({
					"id": this.get("id"),
					"title": this.get("name"),
					"type": this.get("type"),
					"imagePath": this.get("profilePath"),
					"voteAverage": false,
					"isInFavourites": true,
					"description": this.get("biography")
				});

				this.set("isInFavourites", true);
			}
		}
	});

	return PersonModel;
})