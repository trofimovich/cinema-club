define([
		"jquery",
		"underscore",
		"backbone",
		"app/views/moviePage/movieDetailsView",
		"app/views/moviePage/personBlockView",
		"app/views/moviePage/videoBlockView",
		"app/templates/cinemaClubTmpls"
		],
function($, _, Backbone, MovieDetailsView, PersonBlockView, VideoBlockView, cinemaClubTmpls) {
	var MoviePageView = Backbone.View.extend({
		
		template: _.template(cinemaClubTmpls["moviePage"]),

		initialize: function(params) {
			this.params = params;
			this.$el.html(this.template());
			
			this.render();
		},

		render: function() {
			var movieDetailsView = new MovieDetailsView({
				url: {
					api_key: this.params.url.api_key,
					movieId: this.params.url.movieId
				}
			});

			var personBlockView = new PersonBlockView({
				url: {
					api_key: this.params.url.api_key,
					movieId: this.params.url.movieId
				}
			});

			var videoBlockView = new VideoBlockView({
				url: {
					api_key: this.params.url.api_key,
					movieId: this.params.url.movieId
				}
			});

			movieDetailsView.render();
			personBlockView.render();
			videoBlockView.render();


			
			movieDetailsView.on("rendered", function() {
				$(".movie-details").append(this.$el);
				checkIfSubviewsRendered();
			});

			personBlockView.on("rendered", function() {
				$(".movie-person-block").append(this.$el);
				checkIfSubviewsRendered();
			});
			
			videoBlockView.on("rendered", function() {
				$(".movie-video-block").append(this.$el);
				checkIfSubviewsRendered();
			});
			

			var self = this;
			function checkIfSubviewsRendered() {
				if(movieDetailsView.isRendered && videoBlockView.isRendered && personBlockView.isRendered) {
					self.trigger("rendered");
				} 
			}
		}
	});

	return MoviePageView;
})