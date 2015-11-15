define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/itemModel",
	"backbone-local-storage",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, ItemModel, localstorage, cinemaClubTmpls) {
	var ListItemView = Backbone.View.extend({
		tagName: "li",

		events: {
			"click .fa-times": "removeFromFavourites"
		},

		initialize: function(params) {

			this.model = new ItemModel(params);

			switch (this.model.get("type")) {
				case "movie":
					this.template = _.template(cinemaClubTmpls["movieListItem"]);
					this.model.localStorage = new Backbone.LocalStorage("fav-movie");
					break;
				case "person":
					this.template = _.template(cinemaClubTmpls["personListItem"]);
					this.model.localStorage = new Backbone.LocalStorage("fav-person");
					break;
			}
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		removeFromFavourites: function(e) {
			var self = this;

			this.$el.addClass("removed-item").one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(e) {
				self.model.destroy();
				self.trigger("removed");
			});
		}
	});

	return ListItemView;
})