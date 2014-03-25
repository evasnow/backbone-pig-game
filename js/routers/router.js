app = {
	models: {},
	
	views: {},
	
	collections: {},
	
	routers: {},
	
	templates: {},
	
	init: function() {
		this.winScore = 50;
		this.diceArray = [{}, {}];
		this.myDice = new app.views.Dice(this.diceArray);
		this.myPlayers = [];
		this.myPlayers.push(new app.models.Player(true, 'h'));
		this.myPlayers.push(new app.models.Player(false, 'c'));
		this.myGame = new app.views.Game(this.myPlayers);
	}
};