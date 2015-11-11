define([
	"jquery",
	"underscore",
	"backbone",
	"app/collections/movieCollection",
	"app/templates/cinemaClubTmpls",
	"app/views/movieListView",
	"app/views/mainPageView",
	"app/views/moviePageView",
	"app/views/personPage/personPageView",
	"app/helpers/preloader"
], function(
	$,
	_,
	Backbone,
	MovieCollection,
	cinemaClubTmpls,
	MovieListView,
	MainPageView,
	MoviePageView,
	PersonPageView,
	preloader) {

	var AppView = Backbone.View.extend({
		el: $("body"),

		template: _.template(cinemaClubTmpls["appTmpl"]),

		initialize: function() {
			//this.render();
			//var mainPageView = new MainPageView({ el: $(".page-content") });
		},

		render: function() {
			var renderedTmpl = this.template({
			});

			this.$el.html(renderedTmpl);
		},

		setPage: function(pageName, params) {
			this.render();

			var pageView,
				url;

			preloader.startPreloader();

			if(pageName === "index") {
				pageView = new MainPageView(
									{
										el: $(".page-content")
									});
			}

			if(pageName === "movie") {
				pageView = new MoviePageView(
									{
										el: $(".page-content"),
										url: {
											api_key: "5905778f9ef16e30fdd2407c34a27b03",
											movieId: params
										}
									});
			}

			if(pageName === "person") {
				pageView = new PersonPageView(
									{
										el: $(".page-content"),
										url: {
											api_key: "5905778f9ef16e30fdd2407c34a27b03",
											personId: params
										}
									});
			}

			if(pageName === "favourites") {
				pageView = new FavouritesPageView({ el: $(".page-content") });
			}

			pageView.on("rendered", preloader.stopPreloader);
		}
	});

	return AppView;
});