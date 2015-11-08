define([
	"underscore",
	"backbone"
], function(_, Backbone) {
	var MovieModel = Backbone.Model.extend({
		defaults: {
		},

		initialize: function(options) {
			this.options = options;
		},

		url: function() {
			return this.options.url;
		},

		sync: function(method, model, options) {
			options.timeout = 8000;
			options.dataType = "jsonp";
			return Backbone.sync(method, model, options);
		},
	});

	return MovieModel;
})