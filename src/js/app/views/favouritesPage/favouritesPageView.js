define([
		"jquery",
		"underscore",
		"backbone",
		"app/collections/favouritesCollection",
		"app/views/common/listItemView",
		"app/templates/cinemaClubTmpls"
], function($, _, Backbone, FavouritesCollection, ListItemView, cinemaClubTmpls) {
	var FavouritesPageView = Backbone.View.extend({
		tagName: "div",
		className: "l-container container",

		template: _.template(cinemaClubTmpls["listPage"]),

		events: {
			"click .rating": "sort",
			"click .title": "sort"
		},

		initialize: function(params) {
			this.params = params;

			this.collection = new FavouritesCollection({ modelType: this.params.section });
			this.collection.on("change reset add remove sort", this.render, this);

			this.collection.fetch({ reset: true });
		},

		render: function() {
			this.$el.html(this.template());

			var self = this;
			this.collection.each(function(element, index) {
				var listItemView = new ListItemView({ model : element });
				$(".m-composite-list", self.$el).append(listItemView.render().$el);
			});

			return this;
		},

		sort: function(e) {

			this.collection.comparator = function(model) {
				console.log(model.get($(e.currentTarget).data("comparator")));
				return model.get($(e.currentTarget).data("comparator"));
			}

			this.collection.sort();
			console.log(this.collection.models[0].toJSON());
		}
	});

	return FavouritesPageView;
});