define([
	"underscore",
	"backbone"
], function(_, Backbone) {
	var MovieModel = Backbone.Model.extend({
		defaults: {
			"title": "",
			"backgroundPath": ""
		}
	});

	return MovieModel;
})