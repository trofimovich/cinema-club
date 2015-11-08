define([
		"jquery",
		"underscore",
		"backbone",
		"app/views/moviePage/movieDetailsView",
		"app/views/moviePage/videoBlockView",
		"app/templates/cinemaClubTmpls"
		],
function($, _, Backbone, MovieDetailsView, VideoBlockView, cinemaClubTmpls) {
	var MoviePageView = Backbone.View.extend({
		
		template: _.template(cinemaClubTmpls["moviePage"]),

		initialize: function(params) {
			this.params = params;
			this.$el.html(this.template());
			this.render();
		},

		render: function() {
			var movieDetailsView = new MovieDetailsView({
				el: $(".movie-details"),
				url: {
					api_key: this.params.url.api_key,
					movieId: this.params.url.movieId
				}
			});

			var videoBlockView = new VideoBlockView({
				el: $(".movie-video-block"),
				url: {
					api_key: this.params.url.api_key,
					movieId: this.params.url.movieId
				}
			});

			movieDetailsView.render();
			videoBlockView.render();

			movieDetailsView.on("rendered", checkIfSubviewsRendered);
			videoBlockView.on("rendered", checkIfSubviewsRendered);

			var self = this;
			function checkIfSubviewsRendered() {
				if(movieDetailsView.isRendered && videoBlockView.isRendered) {
					self.trigger("rendered");
				} 
			}
		}
	});

	return MoviePageView;
})