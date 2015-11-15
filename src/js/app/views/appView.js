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
	"backbone-local-storage",
	"backbone-crossdomain",
	"app/helpers/preloader",
	"nicescroll",
	"app/config"
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
	localstorage,
	backboneCrossDomain,
	preloader,
	nicescroll,
	config) {

	var AppView = Backbone.View.extend({
		
		el: $("body"),

		events: {
			"keyup .nav-find-input": "search"
		},

		template: _.template(cinemaClubTmpls["appTmpl"]),

		initialize: function() {
			// initialize collections that holds 'Favourite Movies' and 'Favourite Persons'
			favMovies = new ItemsCollection({ localStorage: new Backbone.LocalStorage("fav-movie") });
			favPersons = new ItemsCollection({ localStorage: new Backbone.LocalStorage("fav-person") });
		},

		render: function() {
			var renderedTmpl = this.template();
			this.$el.html(renderedTmpl);
		},

		setPage: function(pageName, params) {
			this.render();

			var pageView,
				url;

			if(pageName === "index") {
				preloader.startPreloader();
				pageView = new MainPageView({ el: $(".page-content") });
				this.listenTo(pageView, "rendered", preloader.stopPreloader);
			}

			if(pageName === "movie") {
				preloader.startPreloader();
				pageView = new MoviePageView(
									{
										el: $(".page-content"),
										movieId: params
									});
				this.listenTo(pageView, "rendered", preloader.stopPreloader);
			}

			if(pageName === "person") {
				preloader.startPreloader();
				pageView = new PersonPageView(
									{
										el: $(".page-content"),
										personId: params
									});
				this.listenTo(pageView, "rendered", preloader.stopPreloader);
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
			var search;

			$("body").on("click", function(e) {
				if(this.$el.find(".autocomplete") && !$(e.currentTarget).hasClass("autocomplete")) {
					this.$el.find(".autocomplete").detach();
				}	
			}, this);

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
					api_key: config.API_KEY,
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
				});

				resultsCollection.trigger("sync");
				resultsCollection.fetch({ reset: true, ajaxSync: true });
			}
		},

	});

	return AppView;
});