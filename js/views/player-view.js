app = app || {};

app.views.Player = Backbone.View.extend({

	tagName : 'li',

	template : _.template($("#player-template").html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	setTurn : function() {
		var againBtn = this.$(".play");
		var endBtn = this.$(".end");
		endBtn.prop('disabled', !this.model.get('myTurn'));
		againBtn.prop('disabled', !this.model.get('myTurn'));
	},
	
	events : {
		'click .play' : 'playTurn',
		'click .end' : 'endTurn'
			},
	
	playTurn : function() {
		this.model.playTurn();
	},
	
	endTurn : function() {
		this.model.set('turnHistory', []);
		this.model.set('turnTtl', 0);
		this.model.trigger('endTurn', this.model);
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
		newPlayer.setTurn();
	},

	initialize : function(players) {
		this.collection = new app.collections.Game(players);
		this.listenTo(this.collection, "change", this.render);
		this.render();
	},
	
	changeTurn : function() {
		_.each(this.collection.models, function(player) {
			player.setTurn(player.get('myTurn'));
		});
	}
	
}); 