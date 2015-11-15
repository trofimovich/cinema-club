define([
	"jquery",
	"underscore",
	"backbone",
	"app/collections/movieCollection",
	"app/templates/cinemaClubTmpls",
	"app/views/mainPage/movieListView",
	"app/views/moviePage/personBlockView"
], function(
	$,
	_,
	Backbone,
	MovieCollection,
	cinemaClubTmpls,
	MovieListView,
	PersonBlockView) {

	var MainPageView = Backbone.View.extend({

		template: _.template(cinemaClubTmpls["mainPage"]),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());

			var onScreens = new MovieListView({
				url: "movie/now_playing?page=1&"
			});
			
			var popular = new MovieListView({
				url: "movie/popular?page=1&"
			});
			
			var topRated = new MovieListView({
				url: "movie/top_rated?page=1&"
			});

			var trendingActors = new PersonBlockView({
				url: "person/popular?"
			});

			this.listenTo(onScreens, "rendered", function() {
				this.$el.find(".on-screens-content").append(onScreens.$el);
				this.trigger("rendered");
			});

			this.listenTo(popular, "rendered", function() {
				this.$el.find(".popular-content").append(popular.$el);
			});

			this.listenTo(topRated, "rendered", function() {
				this.$el.find(".top-rated-content").append(topRated.$el);
			});

			this.listenTo(trendingActors, "rendered", function() {
				this.$el.find(".trending-actors-content").append(trendingActors.$el);
			});

			return this;
		}
	});

	return MainPageView;
});