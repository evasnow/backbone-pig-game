app = app || {};

app.views.Die = Backbone.View.extend({

	//tagName: 'div',
	
	initialize : function() {
		
	},

	render : function() {
		var faceClasses = 'die-1 die-2 die-3 die-4 die-5 die-6';
		this.$el.removeClass(faceClasses);
		this.$el.addClass("die-"+this.model.get('roll'));
		return this;
	},

	template : _.template($("#die-template").html())
});

app.views.Dice = Backbone.View.extend({

	initialize : function(dice) {
		this.collection = new app.collections.Dice(dice);
		this.listenTo(this.collection, "change", this.render);
	},

	render : function() {
		$('#dice').empty();
		_.each(this.collection.models, function(die) {
			this.renderDie(die);
		}, this);
	},

	renderDie : function(die) {
		var newdie = new app.views.Die({
			model : die
		});
		$('#dice').append(newdie.render().el);
	},

	roll : function() {
		return this.collection.roll();
	}
});
