app = app || {};

app.models.Player = Backbone.Model.extend({

	defaults : {
		type : '',
		score : '',
	},

	initialize : function(type) {
		var self = this;
		self.set('type', type);
		self.set('score', 0);
	},

	playAgain : function() {
		var self = this;
		self.set('again', true);
	},

	playTurn : function() {
		var self = this;
		var turnTotal = app.myDice.roll();
		if (turnTotal == 12) {
			//this player loses
		} else {
			//add total to player score
			self.set('score', self.get('score') + turnTotal);
		}
	}
});

app.collections.Game = Backbone.Collection.extend({

	model : app.models.Player
});
