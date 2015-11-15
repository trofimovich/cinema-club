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
			this.isRendered = false;
			
			this.collection = new MovieCollection({
				url: "person/" + this.params.personId + "/movie_credits?"
			});


			this.listenTo(this.collection, "sync", function() {
				this.render();
				this.isRendered = true;
				this.trigger("rendered");
			});

			this.collection.fetch();
		},

		events: {
			"click .spoiler-btn": "expandSpoiler"
		},

		render: function() {
			var personMoviesVisibleHtml = "",
				personMoviesUnderSpoilerHtml = "";

			this.collection.each(function(element, index) {
				if(index < 6) {
					// put first 6 credits visible, other credits put under spoiler
					personMoviesVisibleHtml += this.creditItemTemplate(element.toJSON());
				} else {
					personMoviesUnderSpoilerHtml += this.creditItemTemplate(element.toJSON());
				}
			}, this);

			this.$el.append(this.template({
				personMoviesVisible: personMoviesVisibleHtml,
				personMoviesUnderSpoiler: personMoviesUnderSpoilerHtml
			}));
		},

		expandSpoiler: function(e) {
			e.preventDefault();
			$(e.target).parent().children(".spoiler-body").collapse("toggle");
		}
	});

	return CreditsBlockView;
});