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
				personId: this.params.personId
			});

			var personMoviesView = new PersonMoviesView({
				personId:this.params.personId
			});

			this.listenTo(personDetailsView, "rendered", function() {
				$(".person-details").append(personDetailsView.$el);
				checkIfSubviewsRendered.call(this);
			});

			this.listenTo(personMoviesView, "rendered", function() {
				$(".person-movies").append(personMoviesView.$el);
				checkIfSubviewsRendered.call(this);
			});

			function checkIfSubviewsRendered() {
				if(personDetailsView.isRendered && personMoviesView.isRendered) {
					this.trigger("rendered");
				} 
			}
		}

	});

	return PersonPageView;
})