app = {
	models: {},
	
	views: {},
	
	collections: {},
	
	routers: {},
	
	templates: {},
	
	init: function() {
		this.winScore = 50;
		this.diceArray = [{}, {'myTurn' : true}];
		this.myDice = new app.views.Dice(this.diceArray);
		this.myPlayers = [];
		this.myPlayers.push(new app.models.Player(true, 'c'));
		this.myPlayers.push(new app.models.Player(false, 'h'))
		this.myGame = new app.views.Game(this.myPlayers);
		//appRouter = new app.routers.Router();
		//Backbone.history.start();
	}
};