define([
		"jquery",
		"underscore",
		"backbone",
		"app/models/movieModel",
		"app/templates/cinemaClubTmpls"
		],
function($, _, Backbone, MovieModel, cinemaClubTmpls) {
	var MoviePageView = Backbone.View.extend({
		
		template: _.template(cinemaClubTmpls["moviePage"]),

		initialize: function(params) {

			this.model = new MovieModel({ url: params.url });
			
			var self = this;
			this.model.on("change", function() {
				self.render();
				self.trigger("rendered");
			});

			this.model.fetch({ reset: true });

		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
		}
	});

	return MoviePageView;
})