app = app || {};

app.models.Die = Backbone.Model.extend({

	defaults : {
		roll : ''
	},

	rollDie : function() {
		var self = this;
		self.set('roll', Math.floor((Math.random() * 6) + 1)); //number between 1 and 6
		return self.get('roll');
	}
});

app.collections.Dice = Backbone.Collection.extend({
	
	model : app.models.Die,
	
	roll : function() {
		var self = this;
		var rollArray = [];
		 _.each(self.models, function(die) {
				 rollArray.push(die.rollDie());
			}); //collect rolls
		if(_.any(rollArray, function(aRoll){
				return aRoll === 1;
		})) {
			return 0;//turn ends, score for the turn is 0
		} else {
			return _.reduce(rollArray, function(ttl, aRoll){
				return ttl + aRoll;
			}, 0);//return the sum of the dice
		}
	}
});
