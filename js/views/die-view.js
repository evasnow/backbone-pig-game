define(['text!templates/die-template.html', 'models/dice-model'], function() {

	var dieView = Backbone.View.extend({

		el : $("#content"),

		render : function() {
			var that = this;
			//Fetching the template contents
			$.get('templates/die-templates.html', function(data) {
				template = _.template(data, that.model.toJSON());
				//Option to pass any dynamic values to template
				that.$el.html(template);
				//adding the template content to the main template.
			}, 'html');
		}
	});

	var diceView = Backbone.View.extend({

		initialize : function(dice) {
			this.collection = new app.collections.Dice(dice);
			this.render();
		},

		render : function() {
			var that = this;
			$('#content').empty();
			_.each(this.collection.models, function(die) {
				that.renderDie(die);
			}, this);
		},

		renderDie : function(die) {
			var newdie = new app.views.Die({
				model : die
			});
			newdie.render();
		}
	});
	
	return diceView;

});
