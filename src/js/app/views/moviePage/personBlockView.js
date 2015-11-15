define([
	"jquery",
	"underscore",
	"backbone",
	"bootstrap",
	"app/collections/creditsCollection",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, Bootstrap, CreditsCollection, cinemaClubTmpls) {
	
	var PersonBlockView = Backbone.View.extend({
		template: _.template(cinemaClubTmpls["creditsBlock"]),
		creditItemTemplate: _.template(cinemaClubTmpls["creditItem"]),

		initialize: function(params) {
			this.params = params;
			this.isRendered = false;

			this.collection = new CreditsCollection({
				url: this.params.url
			});

			this.listenTo(this.collection, "sync", function() {
				this.render();
				this.isRendered = true;
				this.trigger("rendered");
			});

			this.collection.fetch({ ajaxSync: true });
		},

		events: {
			"click .spoiler-btn": "expandSpoiler"
		},

		render: function() {
			var	creditsVisibleHtml = "",
				creditsUnderSpoilerHtml = "";

			this.collection.each(function(element, index) {
				if(index < 6) {
					// put first 6 credits visible, other credits put under spoiler
					creditsVisibleHtml += this.creditItemTemplate(element.toJSON());
				} else {
					creditsUnderSpoilerHtml += this.creditItemTemplate(element.toJSON());
				}
			}, this);

			this.$el.append(this.template({
				creditsVisible: creditsVisibleHtml,
				creditsUnderSpoiler: creditsUnderSpoilerHtml
			}));
		},

		expandSpoiler: function(e) {
			e.preventDefault();
			$(e.target).parent().children(".spoiler-body").collapse("toggle");
		}
	});

	return PersonBlockView;
});