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
		self.on('change:myTurn', self.playComputer, self);
	},

	playTurn : function() {
		var self = this;
		var rollTotal = app.myDice.roll();
		var his = _.clone(self.get('turnHistory')); //the only way to properly trigger a change with array attrib
		if (rollTotal == 0) {
			//turn is lost
			self.set('score', self.get('score') - self.get('turnTtl'));
			self.set('turnTtl', 0);
			his.push('oops, rolled a 1!');
			self.set('turnHistory', his);
			self.trigger('endTurn', self);
		} else {
			//add total to player score
			self.set('score', self.get('score') + rollTotal);
			//add total to total for this turn
			self.set('turnTtl', self.get('turnTtl') + rollTotal);
			his.push(rollTotal);
			self.set('turnHistory', his);
			if (self.get('score') >= app.winScore)
				self.trigger('win', self);
		}
	},

	playComputer : function() {
		var self = this;
		if (self.get('type') === 'c') {
			while (self.get('turnTtl') < 10 && self.get('myTurn')) {//a relatively arbitrary strategy
				self.playTurn();
			}
			if (self.get('myTurn')) {//if it is still computer's turn
				self.set('turnTtl', 0);
				self.trigger('endTurn', self);
			}
		}
	}
});

app.collections.Game = Backbone.Collection.extend({

	model : app.models.Player,

	initialize : function() {
		var self = this;
		self.on('endTurn', self.nextTurn, self);
	},

	nextTurn : function(player) {
		var self = this;
		player.set('myTurn', false);
		var nextIndex = _.indexOf(self.models, player) + 1;
		if (nextIndex > self.models.length - 1) {
			self.models[0].set('turnHistory', []);
			self.models[0].set('myTurn', true);
		} else {
			self.models[nextIndex].set('turnHistory', []);
			self.models[nextIndex].set('myTurn', true);
		}
	}
});
