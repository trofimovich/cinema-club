define([
		"jquery",
		"underscore",
		"backbone",
		"app/collections/videoCollection",
		"app/templates/cinemaClubTmpls"
		],
function($, _, Backbone, VideoCollection, cinemaClubTmpls) {
	var MoviePageView = Backbone.View.extend({
		
		tagName: "ul",

		className: "l-list m-cards-list",
		
		template: _.template(cinemaClubTmpls["videoBlock"]),

		initialize: function(params) {
			this.el = params.el;
			this.params = params;
		},

		render: function() {
			this.isRendered = false;
			
			var self = this;

			this.collection = new VideoCollection({
				api_key: this.params.url.api_key,
				movieId: this.params.url.movieId
			});

			this.collection.on("reset", function() {
				self.collection.each(function(element, index) {
					self.$el.append(self.template(element.toJSON()));
				});

				self.isRendered = true;
				self.trigger("rendered");
			});

			this.collection.fetch({ reset: true });
			
		}
	});

	return MoviePageView;
})