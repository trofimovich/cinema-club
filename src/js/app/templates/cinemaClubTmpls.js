define([
	"requirejs-text",
	"requirejs-text!app/templates/mainPageBlock.html!strip",
	"requirejs-text!app/templates/movieCard.html!strip",
	"requirejs-text!app/templates/movieMainCard.html!strip",
	"requirejs-text!app/templates/movieSideList.html!strip",
	"requirejs-text!app/templates/mainPage.html!strip"

], function(requirejsText, mainPageBlock, movieCard, movieMainCard, movieSideList, mainPage) {
	var templates = {
		mainPageBlock: mainPageBlock,

		movieCard: movieCard,

		movieMainCard: movieMainCard,

		movieSideList: movieSideList,

		mainPage: mainPage
	}

	return templates;
});