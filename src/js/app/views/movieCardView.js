define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/movieModel",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, MovieModel, cinemaClubTmpls) {
	var MovieCardView = Backbone.View.extend({
		
		tagName: "div",
		
		className: "movie-card",

		template: _.template(cinemaClubTmpls["movieCard"]),

		events: {
		},

		initialize: function() {
			this.model.bind("change", this.render);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return MovieCardView;
});