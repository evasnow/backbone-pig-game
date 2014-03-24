app = {
	models: {},
	
	views: {},
	
	collections: {},
	
	routers: {},
	
	templates: {},
	
	init: function() {
		this.diceArray = [{}, {}];
		this.myDice = new app.views.Dice(this.diceArray);
		this.myPlayers = [{score: 0},{score: 0}];
		this.myGame = new app.views.Game(this.myPlayers);
		//appRouter = new app.routers.Router();
		//Backbone.history.start();
	}
};