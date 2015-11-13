define([
	"jquery",
	"underscore",
	"backbone",
	"app/collections/movieCollection",
	"app/templates/cinemaClubTmpls",
	"app/views/mainPage/movieListView"
], function(
	$,
	_,
	Backbone,
	MovieCollection,
	cinemaClubTmpls,
	MovieListView) {

	var MainPageView = Backbone.View.extend({

		template: _.template(cinemaClubTmpls["mainPage"]),

		initialize: function() {
			this.render();

			var onScreens = new MovieListView({
												el: $(".on-screens-content"),
												collection: new MovieCollection({}),
												url: "https://api.themoviedb.org/3/movie/now_playing?api_key=5905778f9ef16e30fdd2407c34a27b03&page=1"
											});
			
			var popular = new MovieListView({
												el: $(".popular-content"),
												collection: new MovieCollection({}),
												url: "https://api.themoviedb.org/3/movie/popular?api_key=5905778f9ef16e30fdd2407c34a27b03&page=1"
											});
			
			var topRated = new MovieListView({
												el: $(".top-rated-content"),
												collection: new MovieCollection({}),
												url: "https://api.themoviedb.org/3/movie/top_rated?api_key=5905778f9ef16e30fdd2407c34a27b03&page=1"
											});

			onScreens.on("reset", onScreens.render);
			popular.on("reset", popular.render);
			topRated.on("reset", topRated.render);

			this.listenTo(onScreens, "reset", function() {
				this.trigger("rendered");
			});
		},

		render: function() {
			var renderedTmpl = this.template({
			});

			this.$el.html(renderedTmpl);
		}
	});

	return MainPageView;
});