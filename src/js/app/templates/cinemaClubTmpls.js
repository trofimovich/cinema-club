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
	"requirejs-text!app/templates/moviePage/movieDetails.html!strip",
	"requirejs-text!app/templates/moviePage/creditsBlock.html!strip",
	"requirejs-text!app/templates/moviePage/creditItem.html!strip",

], function(
	requirejsText,
	appTmpl,
	mainPageBlock,
	movieCard,
	movieMainCard,
	movieSideList,
	mainPage,
	moviePage,
	videoBlock,
	movieDetails,
	creditsBlock,
	creditItem) {
	
	var templates = {
		appTmpl: appTmpl,

		mainPageBlock : mainPageBlock,

		movieCard : movieCard,

		movieMainCard : movieMainCard,

		movieSideList : movieSideList,

		mainPage : mainPage,

		moviePage : moviePage,

		videoBlock: videoBlock,

		movieDetails: movieDetails,

		creditsBlock: creditsBlock,

		creditItem: creditItem
	}

	return templates;
});