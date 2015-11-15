define([
	"jquery",
	"underscore",
	"backbone",
	"app/views/mainPage/movieCardView",
	"app/views/mainPage/movieMainCardView",
	"app/views/mainPage/movieSideListView",
	"app/collections/movieCollection",
	"app/templates/cinemaClubTmpls"
], function(
	$,
	_,
	Backbone,
	MovieCardView,
	MovieMainCardView,
	MovieSideListView,
	MovieCollection,
	cinemaClubTmpls) {
	var MovieListView = Backbone.View.extend({

		template: _.template(cinemaClubTmpls["mainPageBlock"]),

		initialize: function(params) {
			this.params = params;
			this.collection = new MovieCollection({ url: this.params.url })

			this.collection.fetch({ reset: true });

			this.listenTo(this.collection, "sync", function() {
				this.render();
				this.trigger("rendered");
			});
		},

		render: function() {
			var i = 0,
				movieVw = {},
				mainPageBlockVars = {
										movieMainCard : "",
										movieCard : [],
										movieSideList: []
									};

			this.$el.html("");
			for(i = 0; i<this.collection.length; i++) {
				if(i === 1) {
					movieVw = new MovieMainCardView({
						model: this.collection.models[i]
					});

					mainPageBlockVars.movieMainCard = movieVw.render().$el.html();
				} else if( i > 1 && i < 4 ) {
					movieVw = new MovieCardView({
						model: this.collection.models[i]
					});

					mainPageBlockVars.movieCard.push(movieVw.render().$el.html());
				} else {
					movieVw = new MovieSideListView({
						model: this.collection.models[i]
					});

					mainPageBlockVars.movieSideList.push(movieVw.render().$el.html());
				}
			}

			this.$el.html(this.template(mainPageBlockVars));
		}
	});

	return MovieListView;
});