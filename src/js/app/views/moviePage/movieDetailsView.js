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
			this.isRendered = false;

			this.model = new MovieModel({}, {
				movieId: this.params.movieId
			});
			
			this.model.fetch({ ajaxSync: true });
			
			this.listenTo(this.model, "sync", function() {
				this.render();
				this.isRendered = true;
				this.trigger("rendered");
			});
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