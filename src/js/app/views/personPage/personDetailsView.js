define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/creditModel",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, CreditModel, cinemaClubTmpls) {
	var MovieDetailsView = Backbone.View.extend({

		template: _.template(cinemaClubTmpls["personDetails"]),

		events: {
			"click .fa-heart,.fa-heart-o": "toggleFavourites"
		},

		initialize: function(params) {
			this.params = params;
		},

		render: function() {
			this.isRendered = false;
			this.model = new CreditModel({
				api_key: this.params.url.api_key,
				personId: this.params.url.personId
			});
			
			var self = this;
			this.model.on("change", function() {
				self.$el.html(self.template(self.model.toJSON()));
				self.isRendered = true;
				self.trigger("rendered");
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