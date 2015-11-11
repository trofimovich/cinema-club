define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/movieModel",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, MovieModel, cinemaClubTmpls) {
	var MovieDetailsView = Backbone.View.extend({

		template: _.template(cinemaClubTmpls["movieDetails"]),

		events: {
			"click .fa-heart,.fa-heart-o": "toggleFavourites"
		},

		initialize: function(params) {
			this.params = params;
		},

		render: function() {
			this.isRendered = false;

			this.model = new MovieModel({
				api_key: this.params.url.api_key,
				movieId: this.params.url.movieId
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