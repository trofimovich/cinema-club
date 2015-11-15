define([
		"jquery",
		"underscore",
		"backbone",
		"app/views/common/listItemView",
		"app/templates/cinemaClubTmpls"
], function($, _, Backbone, ListItemView, cinemaClubTmpls) {
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

			if(this.params.section === "movies") {
				this.collection = favMovies;
			}

			if(this.params.section === "persons") {
				this.collection = favPersons;
			}

			this.collection.on("change reset add remove sort", this.render, this);
		},

		render: function() {
			this.$el.html(this.template());

			this.collection.localStorage.findAll().forEach(function(element, index) {
				var listItemView = new ListItemView(element);
				
				this.collection.listenTo(listItemView, "removed", function() {
					this.fetch();
				});

				$(".m-composite-list", this.$el).append(listItemView.render().$el);
			}, this);

			return this;
		},

		sort: function(e) {
			this.collection.comparator = function(model) {
				return model.get($(e.currentTarget).data("comparator"));
			}

			this.collection.sort();
		}
	});

	return FavouritesPageView;
});