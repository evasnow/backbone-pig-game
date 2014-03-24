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
		var rollTotal = _.reduce(self.models, function(ttl, die) {
				return ttl + die.rollDie();
			}, 0); //total the values of each die in the collection
		self.set('total', rollTotal);
		return rollTotal;
	},
	
	getTotal : function() {
		var self = this;
		return self.get('total');
	}
});
