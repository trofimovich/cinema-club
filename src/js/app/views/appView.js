define([
	"jquery",
	"underscore",
	"backbone",
	"app/templates/cinemaClubTmpls",
	"app/collections/itemsCollection",
	"app/views/mainPage/mainPageView",
	"app/views/moviePage/moviePageView",
	"app/views/personPage/personPageView",
	"app/views/favouritesPage/favouritesPageView",
	"app/helpers/preloader",
	"nicescroll"
], function(
	$,
	_,
	Backbone,
	cinemaClubTmpls,
	ItemsCollection,
	MainPageView,
	MoviePageView,
	PersonPageView,
	FavouritesPageView,
	preloader,
	nicescroll) {

	var AppView = Backbone.View.extend({
		
		el: $("body"),

		events: {
			"keyup .nav-find-input": "search"
		},

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
				preloader.startPreloader();
				pageView = new MainPageView(
									{
										el: $(".page-content")
									});
				pageView.on("rendered", preloader.stopPreloader);
			}

			if(pageName === "movie") {
				preloader.startPreloader();
				pageView = new MoviePageView(
									{
										el: $(".page-content"),
										url: {
											api_key: "5905778f9ef16e30fdd2407c34a27b03",
											movieId: params
										}
									});
				pageView.on("rendered", preloader.stopPreloader);
			}

			if(pageName === "person") {
				preloader.startPreloader();
				pageView = new PersonPageView(
									{
										el: $(".page-content"),
										url: {
											api_key: "5905778f9ef16e30fdd2407c34a27b03",
											personId: params
										}
									});
				pageView.on("rendered", preloader.stopPreloader);
			}


			if(pageName === "favourites") {
				pageView = new FavouritesPageView(
									{
										section: params
									});

				$(".page-content").html(pageView.render().el);
			}
		},

		timerId: 0,
		autocompleteTemplate: _.template(cinemaClubTmpls["autocomplete"]),
		listItemTemplate: _.template(cinemaClubTmpls["listItem"]),

		search: function(e) {
			$("body").on("click", function(e) {
				if(self.$el.find(".autocomplete") && !$(e.currentTarget).hasClass("autocomplete")) {
					self.$el.find(".autocomplete").detach();
				}	
			}, self);

			var search;
			search = $(e.currentTarget).val();

			if(this.timerId) {
				clearTimeout(this.timerId);
			}
			
			this.timerId = setTimeout(makeSearchCall, 800);

			var self = this;
			function makeSearchCall() {


				if(search === "") {
					self.$el.find(".autocomplete").detach();
					return;
				}

				var resultsCollection = new ItemsCollection({
					api_key: "5905778f9ef16e30fdd2407c34a27b03",
					search: search
				});

				self.listenTo(resultsCollection, "sync", function() {
					if(self.$el.find(".autocomplete")) { self.$el.find(".autocomplete").detach(); }

					self.$el.append(self.autocompleteTemplate({}));

					resultsCollection.each(function(element, index) {
						self.$el.find(".autocomplete .m-composite-list").append(self.listItemTemplate(element.toJSON()));
					});

					self.$el.find(".autocomplete").niceScroll({
						touchbehavior: true,
						cursorcolor: "#333",
						cursoropacitymax: 0.3,
						autohidemode: false,
						railpadding:{top:0,right:5},
						cursorborder: '0',
						zindex: 999999
					}).resize();

					console.log(resultsCollection);
				});

				resultsCollection.trigger("sync");
				resultsCollection.fetch({ reset: true, ajaxSync: true });
			}
		},

	});

	return AppView;
});