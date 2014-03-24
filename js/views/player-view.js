app = app || {};

app.views.Player = Backbone.View.extend({

	tagName : 'li',

	template : _.template($("#player-template").html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	events : {
		'click .play' : 'playTurn'
	},
	
	playTurn : function() {
		this.model.playTurn();
	}
});

app.views.Game = Backbone.View.extend({

	el : $("#game"),

	render : function() {
		$('#game').empty();
		_.each(this.collection.models, function(player) {
			this.renderPlayer(player);
		}, this);
	},

	renderPlayer : function(player) {
		var newPlayer = new app.views.Player({
			model : player
		});
		$("#game").append(newPlayer.render().el);
	},

	initialize : function(players) {
		this.collection = new app.collections.Game(players);
		/*_.each(this.collection.models, function(player) {
			this.listenTo(player, "change:again", this.collection.playTurn(player));
		}, this);*/
		this.listenTo(this.collection, "change", this.render);

		this.render();
	}
}); 