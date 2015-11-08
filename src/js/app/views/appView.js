define([
	"jquery",
	"underscore",
	"backbone",
	"app/collections/movieCollection",
	"app/templates/cinemaClubTmpls",
	"app/views/movieListView",
	"app/views/mainPageView",
	"app/views/moviePageView"
], function(
	$,
	_,
	Backbone,
	MovieCollection,
	cinemaClubTmpls,
	MovieListView,
	MainPageView,
	MoviePageView) {

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

			if(pageName === "index") {
				pageView = new MainPageView({ el: $(".page-content") })
			}

			if(pageName === "movie") {
				url = [
						"https://api.themoviedb.org/3/movie/",
						params,
						"?api_key=5905778f9ef16e30fdd2407c34a27b03"
					].join("");

				pageView = new MoviePageView({ el: $(".page-content"), url: url })
			}


		}
	});

	return AppView;
});