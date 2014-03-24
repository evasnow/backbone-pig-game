app = app || {};

app.models.Player = Backbone.Model.extend({

	defaults : {
		type : '',
		score : '',
		turnHistory : [],
		turnTtl : 0,
		myTurn : false
	},

	initialize : function(first, type) {
		var self = this;
		self.set('type', type);
		self.set('score', 0);
		self.set('myTurn', first);
	},

	playTurn : function() {
		var self = this;
		var rollTotal = app.myDice.roll();
		if (rollTotal == 0) {
			//turn is lost
			self.set('score', self.get('score') - self.get('turnTtl'));
			self.set('turnHistory', []);
			self.set('turnTtl', 0);
			self.trigger('endTurn', self);
		} else {
			//add total to player score
			self.set('score', self.get('score') + rollTotal);
			//add total to total for this turn
			self.set('turnTtl', self.get('turnTtl') + rollTotal);
			var his = _.clone(self.get('turnHistory'));
			his.push(rollTotal);
			self.set('turnHistory', his);
		}
	}
});

app.collections.Game = Backbone.Collection.extend({

	model : app.models.Player,

	initialize : function() {
		var self = this;
		self.on('endTurn', this.nextTurn, this);
	},

	nextTurn : function(player) {
		var self = this;
		player.set('myTurn', false);
		var nextIndex = _.indexOf(self.models, player) + 1;
		if(nextIndex > self.models.length - 1){
			self.models[0].set('myTurn', true);
		} else {
		self.models[nextIndex].set('myTurn', true);
		}
	}
});
