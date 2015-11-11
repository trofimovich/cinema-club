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
		}
	});

	return MovieModel;
})