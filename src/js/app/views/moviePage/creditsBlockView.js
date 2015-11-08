define([
	"jquery",
	"underscore",
	"backbone",
	"bootstrap",
	"app/collections/creditsCollection",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, Bootstrap, CreditsCollection, cinemaClubTmpls) {
	var CreditsBlockView = Backbone.View.extend({

		template: _.template(cinemaClubTmpls["creditsBlock"]),
		creditItemTemplate: _.template(cinemaClubTmpls["creditItem"]),

		initialize: function(params) {
			this.params = params;
			this.el = params.el;
		},

		events: {
			"click .spoiler-btn": "expandSpoiler"
		},

		render: function() {
			var self = this,
				creditsVisibleHtml = "",
				creditsUnderSpoilerHtml = "";

			this.isRendered = false;

			this.collection = new CreditsCollection({
				api_key: this.params.url.api_key,
				movieId: this.params.url.movieId
			});

			this.collection.fetch({ "reset" : true });



			this.collection.on("reset", function() {
				this.each(function(element, index) {
					if(index < 6) {
						// put first 6 credits visible, other credits put under spoiler
						creditsVisibleHtml += self.creditItemTemplate(element.toJSON());
					} else {
						creditsUnderSpoilerHtml += self.creditItemTemplate(element.toJSON());
					}

				});

				self.$el.append(self.template({
					creditsVisible: creditsVisibleHtml,
					creditsUnderSpoiler: creditsUnderSpoilerHtml
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