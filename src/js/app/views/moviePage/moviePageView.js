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
				movieId: this.params.movieId
			});

			var personBlockView = new PersonBlockView({
				url: "movie/" + this.params.movieId + "/credits?"
			});

			var videoBlockView = new VideoBlockView({
				url: "movie/" + this.params.movieId + "/videos?"
			});

			this.listenTo(movieDetailsView, "rendered", function() {
				$(".movie-details").append(movieDetailsView.$el);
				checkIfSubviewsRendered.call(this);
			});

			this.listenTo(videoBlockView, "rendered", function() {
				$(".movie-video-block").append(videoBlockView.$el);
				checkIfSubviewsRendered.call(this);
			});

			this.listenTo(personBlockView, "rendered", function() {
				$(".movie-person-block").append(personBlockView.$el);
				checkIfSubviewsRendered.call(this);
			});

			function checkIfSubviewsRendered() {
				if(movieDetailsView.isRendered && videoBlockView.isRendered && personBlockView.isRendered) {
					this.trigger("rendered");
				} 
			};
		}
	});

	return MoviePageView;
})