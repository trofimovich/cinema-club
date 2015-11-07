define([
	"jquery",
	"underscore",
	"backbone",
	"app/views/movieCardView",
	"app/templates/cinemaClubTmpls"
], function($, _, Backbone, MovieCardView, cinemaClubTmpls) {
	var MovieSideListView = MovieCardView.extend({
		
		tagName: "li",
		
		className: "list-group-item",

		template: _.template(cinemaClubTmpls["movieSideList"])
	});

	return MovieSideListView;
});