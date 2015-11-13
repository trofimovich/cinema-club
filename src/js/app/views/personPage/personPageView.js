define([
		"jquery",
		"underscore",
		"backbone",
		"app/views/personPage/personDetailsView",
		"app/views/personPage/personMoviesView",
		"app/templates/cinemaClubTmpls"
], function($, _, Backbone, PersonDetailsView, PersonMoviesView, cinemaClubTmpls) {
	var PersonPageView = Backbone.View.extend({
		
		template: _.template(cinemaClubTmpls["personPage"]),

		initialize: function(params) {
			this.params = params;
			this.$el.html(this.template());

			this.render();
		},

		render: function() {
			var personDetailsView = new PersonDetailsView({
				url: {
					api_key: this.params.url.api_key,
					personId: this.params.url.personId
				}
			});

			var personMoviesView = new PersonMoviesView({
				url: {
					api_key: this.params.url.api_key,
					personId:this.params.url.personId
				}
			})
			
			personDetailsView.render();
			personMoviesView.render();

			personDetailsView.on("rendered", function() {
				$(".person-details").append(this.$el);
				checkIfSubviewsRendered();
			});

			personMoviesView.on("rendered", function() {
				$(".person-movies").append(this.$el);
				checkIfSubviewsRendered();
			});

			var self = this;
			function checkIfSubviewsRendered() {
				if(personDetailsView.isRendered && personMoviesView.isRendered) {
					self.trigger("rendered");
				} 
			}
		}

	});

	return PersonPageView;
})