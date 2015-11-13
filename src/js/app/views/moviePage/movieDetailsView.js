define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/movieModel",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, MovieModel, cinemaClubTmpls) {
	var MovieDetailsView = Backbone.View.extend({

		tagName: "div",

		template: _.template(cinemaClubTmpls["movieDetails"]),

		events: {
			"click .fa-heart,.fa-heart-o": "toggleFavourites"
		},

		initialize: function(params) {
			this.params = params;
		},

		render: function() {
			this.isRendered = false;

			this.model = new MovieModel({}, {
				api_key: this.params.url.api_key,
				movieId: this.params.url.movieId
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