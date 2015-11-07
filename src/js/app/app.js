define([
	"requirejs-text",
	"app/models/movieModel",
	"app/collections/movieCollection",
	"app/views/movieCardView",
	"app/views/movieListView",
	"app/views/mainPageView",
	"app/routers/appRouter"
], function(requirejsText, MovieModel, MovieCollection, MovieCardView, MovieListView, MainPageView, AppRouter) {

	var mainpage = new MainPageView();
	var router = new AppRouter({ view: mainpage });
	Backbone.history.start();

	window.debug = {
		MovieModel: MovieModel,
		MovieCollection: MovieCollection,
		MovieCardView: MovieCardView,
		MovieListView: MovieListView
	}
});