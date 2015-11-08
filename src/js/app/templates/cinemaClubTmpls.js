define([
	"requirejs-text",
	"requirejs-text!app/templates/appTmpl.html!strip",
	"requirejs-text!app/templates/mainPage/mainPageBlock.html!strip",
	"requirejs-text!app/templates/mainPage/movieCard.html!strip",
	"requirejs-text!app/templates/mainPage/movieMainCard.html!strip",
	"requirejs-text!app/templates/mainPage/movieSideList.html!strip",
	"requirejs-text!app/templates/mainPage/mainPage.html!strip",
	"requirejs-text!app/templates/moviePage/moviePage.html!strip",
	"requirejs-text!app/templates/moviePage/videoBlock.html!strip",
	"requirejs-text!app/templates/moviePage/movieDetails.html!strip"

], function(requirejsText, appTmpl, mainPageBlock, movieCard, movieMainCard, movieSideList, mainPage, moviePage, videoBlock, movieDetails) {
	
	var templates = {
		appTmpl: appTmpl,

		mainPageBlock : mainPageBlock,

		movieCard : movieCard,

		movieMainCard : movieMainCard,

		movieSideList : movieSideList,

		mainPage : mainPage,

		moviePage : moviePage,

		videoBlock: videoBlock,

		movieDetails: movieDetails
	}

	return templates;
});