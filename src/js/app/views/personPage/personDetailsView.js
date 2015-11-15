define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/personModel",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, PersonModel, cinemaClubTmpls) {
	var MovieDetailsView = Backbone.View.extend({
		tagName: "div",

		template: _.template(cinemaClubTmpls["personDetails"]),

		events: {
			"click .fa-heart,.fa-heart-o": "toggleFavourites"
		},

		initialize: function(params) {
			this.params = params;
			this.isRendered = false;

			this.model = new PersonModel({}, {
				personId: this.params.personId
			});
			
			this.listenTo(this.model, "sync", function() {
				this.render();
				this.isRendered = true;
				this.trigger("rendered");
			})
			
			this.model.fetch({ reset: true, ajaxSync: true });
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
		},

		toggleFavourites: function(e) {
			e.preventDefault();

			if(this.$el.find(".add-to-favourites").hasClass("fa-heart-o")) {
				this.$el.find(".add-to-favourites").removeClass("fa-heart-o").addClass("fa-heart");
			} else {
				this.$el.find(".add-to-favourites").removeClass("fa-heart").addClass("fa-heart-o");
			}

			this.model.toggleFavourites();
		}
	});

	return MovieDetailsView;
})