define([
	"requirejs-text",
	"requirejs-text!app/templates/appTmpl.html!strip",
	"requirejs-text!app/templates/mainPageBlock.html!strip",
	"requirejs-text!app/templates/movieCard.html!strip",
	"requirejs-text!app/templates/movieMainCard.html!strip",
	"requirejs-text!app/templates/movieSideList.html!strip",
	"requirejs-text!app/templates/mainPage.html!strip",
	"requirejs-text!app/templates/moviePage.html!strip"

], function(requirejsText, appTmpl, mainPageBlock, movieCard, movieMainCard, movieSideList, mainPage, moviePage) {
	var templates = {
		appTmpl: appTmpl,

		mainPageBlock : mainPageBlock,

		movieCard : movieCard,

		movieMainCard : movieMainCard,

		movieSideList : movieSideList,

		mainPage : mainPage,

		moviePage : moviePage
	}

	return templates;
});