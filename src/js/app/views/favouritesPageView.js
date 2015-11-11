define([
		"jquery",
		"underscore",
		"backbone",
		"app/collections/favouritesCollection",
		"app/templates/cinemaClubTmpls"
], function($, _, Backbone, FavouritesCollection, cinemaClubTmpls) {
	var FavouritesPageView = Backbone.View.extend({
		
		template: _.template(cinemaClubTmpls["listPage"]),

		initialize: function(params) {
			this.params = params;
			this.render();
		},

		render: function() {
			var listCollection = new FavouritesCollection({ modelType: this.params.section }),
				listItemsHtml = "";

			switch (this.params.section) {
				case "movies":
					this.listItemTemplate = _.template(cinemaClubTmpls["movieListItem"]);
					break;
				case "persons":
					this.listItemTemplate = _.template(cinemaClubTmpls["personListItem"]);
					break;
			}

			listCollection.fetch({ reset: true });
			
			console.log(listCollection);
			
			var self = this;
			listCollection.each(function(element, index) {
				listItemsHtml += self.listItemTemplate(element.toJSON());
			});

			this.$el.html(this.template({ listItems : listItemsHtml }));
		}
	});

	return FavouritesPageView;
});