define([
	"jquery",
	"underscore",
	"backbone",
	"app/views/mainPage/movieCardView",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, MovieCardView, cinemaClubTmpls) {
	var MovieMainCardView = MovieCardView.extend({
		
		tagName: "div",
		
		className: "movie-card movie-main-card",

		template: _.template(cinemaClubTmpls["movieMainCard"])
	});

	return MovieMainCardView;
});