define([
	"app/views/appView",
	"app/routers/appRouter"
], function(
	AppView,
	AppRouter) {

	var app = new AppView();
	var router = new AppRouter({ view: app });
	Backbone.history.start();
});