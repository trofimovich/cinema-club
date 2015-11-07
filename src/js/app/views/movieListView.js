define([
	"jquery",
	"underscore",
	"backbone",
	"app/views/movieCardView",
	"app/views/movieMainCardView",
	"app/views/movieSideListView",
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

			this.collection.url = params.url;

			this.collection.fetch({ reset: true });

			var self = this;
			this.collection.on("reset", function() {
				self.trigger("reset");
			})
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
			console.log(this.collection);
			for(i = 0; i<this.collection.length; i++) {
				console.log(this.collection.models[i]);
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

			console.log(mainPageBlockVars);


			this.$el.html(this.template(mainPageBlockVars));
			console.log(this.$el);
		}
	});

	return MovieListView;
});