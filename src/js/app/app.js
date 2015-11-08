define([
	"requirejs-text",
	"app/models/movieModel",
	"app/collections/movieCollection",
	"app/views/movieCardView",
	"app/views/movieListView",
	"app/views/mainPageView",
	"app/views/moviePageView",
	"app/views/appView",
	"app/routers/appRouter"
], function(
	requirejsText,
	MovieModel,
	MovieCollection,
	MovieCardView,
	MovieListView,
	MainPageView,
	MoviePageView,
	AppView,
	AppRouter) {

	//var mainpage = new MainPageView();
	var app = new AppView();
	var router = new AppRouter({ view: app });
	Backbone.history.start();

	window.debug = {
		MovieModel: MovieModel,
		MovieCollection: MovieCollection,
		MovieCardView: MovieCardView,
		MovieListView: MovieListView,
		MoviePageView: MoviePageView
	}
});