define(function() {
	dieModel = Backbone.Model.extend({

		defaults : {
			roll : ''
		},

		initialize : function() {
			this.rollDie();
		},

		rollDie : function() {
			self = this;
			self.set('roll', Math.floor((Math.random() * 6) + 1));
			//number between 1 and 6
		}
	});

	diceModel = Backbone.Collection.extend({
		model : app.models.Die
	});
	
	return diceModel();

}); 