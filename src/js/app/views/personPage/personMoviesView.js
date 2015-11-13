define([
	"jquery",
	"underscore",
	"backbone",
	"bootstrap",
	"app/collections/movieCollection",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, Bootstrap, MovieCollection, cinemaClubTmpls) {
	var CreditsBlockView = Backbone.View.extend({

		tagName: "div",

		template: _.template(cinemaClubTmpls["personMoviesBlock"]),
		creditItemTemplate: _.template(cinemaClubTmpls["personMovieItem"]),

		initialize: function(params) {
			this.params = params;
			this.el = params.el;
		},

		events: {
			"click .spoiler-btn": "expandSpoiler"
		},

		render: function() {
			var self = this,
				personMoviesVisibleHtml = "",
				personMoviesUnderSpoilerHtml = "";

			this.isRendered = false;

			this.collection = new MovieCollection({
				api_key: this.params.url.api_key,
				category: "person",
				itemId: this.params.url.personId,
				subcategory: "movie_credits"
			});

			this.collection.fetch({ "reset" : true });


			this.collection.on("reset", function() {

				this.each(function(element, index) {
					if(index < 6) {
						// put first 6 credits visible, other credits put under spoiler
						personMoviesVisibleHtml += self.creditItemTemplate(element.toJSON());
					} else {
						personMoviesUnderSpoilerHtml += self.creditItemTemplate(element.toJSON());
					}

				});

				self.$el.append(self.template({
					personMoviesVisible: personMoviesVisibleHtml,
					personMoviesUnderSpoiler: personMoviesUnderSpoilerHtml
				}));

				self.isRendered = true;
				self.trigger("rendered");
			});
		},

		expandSpoiler: function(e) {
			e.preventDefault();
			$(e.target).parent().children(".spoiler-body").collapse("toggle");
		}
	});

	return CreditsBlockView;
});