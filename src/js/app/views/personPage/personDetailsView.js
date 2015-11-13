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
		},

		render: function() {
			this.isRendered = false;


			this.model = new PersonModel({}, {
				api_key: this.params.url.api_key,
				personId: this.params.url.personId
			});
			
			this.listenTo(this.model, "sync", function() {
				this.$el.html(this.template(this.model.toJSON()));
				this.isRendered = true;
				this.trigger("rendered");
			});
			
			this.model.fetch({ reset: true, ajaxSync: true });
		},

		toggleFavourites: function(e) {
			e.preventDefault();
			this.model.toggleFavourites();
		}
	});

	return MovieDetailsView;
})