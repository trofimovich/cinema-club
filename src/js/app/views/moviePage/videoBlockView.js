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
			this.params = params;
			this.isRendered = false;

			this.collection = new VideoCollection({
				url: this.params.url
			});

			this.listenTo(this.collection, "sync", function() {
				this.render();
				this.isRendered = true;
				this.trigger("rendered");
			});

			this.collection.fetch({ ajaxSync: true });
		},

		render: function() {
			this.collection.each(function(element, index) {
				this.$el.append(this.template(element.toJSON()));
			}, this);
		}
	});

	return MoviePageView;
})