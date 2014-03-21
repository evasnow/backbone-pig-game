app = {
	models: {},
	
	views: {},
	
	collections: {},
	
	routers: {},
	
	templates: {},
	
	init: function() {
		var diceArray = [
			{roll: ''},
			{roll: ''}
		];
		appDice = new app.views.Dice(diceArray);
		//appRouter = new app.routers.Router();
		//Backbone.history.start();
	}
};