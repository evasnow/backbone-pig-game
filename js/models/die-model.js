app = app || {};

app.models.Die = Backbone.Model.extend({

	defaults : {
		roll : ''
	},
	
	initialize: function() {
		this.rollDie();
	},

	rollDie : function() {
		self = this;
		self.set('roll', Math.floor((Math.random() * 6) + 1));
						//number between 1 and 6
	}
});

app.collections.Dice = Backbone.Collection.extend({
	model : app.models.Die
});
