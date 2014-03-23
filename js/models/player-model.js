app = app || {};

app.models.Player = Backbone.Model.extend({

	defaults : {
		type : '',
		score : ''
	}
});

app.collections.Game = Backbone.Collection.extend({

	defaults : {
		dice : {}
	},

	model : app.models.Player,
	
	initialize : function() {
		var diceArray = [{}, {}];
		var appDice = new app.views.Dice(diceArray);
		this.dice = appDice;
	},

	playTurn : function(player) {
		var self = this;
		var turnTotal = self.dice.roll();
		if(turnTotal == 12) {
			//this player loses
		} else {
			//add total to player score
			player.set('score', player.get('score') + turnTotal);
		}


	}
});
