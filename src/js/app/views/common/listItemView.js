define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/movieModel",
	"app/models/personModel",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, MovieModel, PersonModel, cinemaClubTmpls) {
	var ListItemView = Backbone.View.extend({
		tagName: "li",

		events: {
			"click .fa-times": "removeFromFavourites"
		},

		template: _.template(cinemaClubTmpls["movieListItem"]),


		initialize: function(params) {

			switch (this.model.get("type")) {
				case "movie":
					this.template = _.template(cinemaClubTmpls["movieListItem"]);
					break;
				case "person":
					this.template = _.template(cinemaClubTmpls["personListItem"]);
					break;
			}
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		removeFromFavourites: function(e) {
			console.log("Removing from favourites" + this.model.get("title"));
			var self = this;

			this.$el.addClass("removed-item").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(e) {
				self.model.destroy();
			});
		}
	});

	return ListItemView;
})