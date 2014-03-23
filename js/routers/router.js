app = {
	models: {},
	
	views: {},
	
	collections: {},
	
	routers: {},
	
	templates: {},
	
	init: function() {
		
		var myPlayers = [{score: 0},{score: 0}];
		myGame = new app.views.Game(myPlayers);
		//appRouter = new app.routers.Router();
		//Backbone.history.start();
	}
};