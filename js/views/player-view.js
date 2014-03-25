app = app || {};

app.views.Player = Backbone.View.extend({

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
		$('#player-list').empty();
		_.each(this.collection.models, function(player) {
			this.renderPlayer(player);
		}, this);
	},

	renderPlayer : function(player) {
		var newPlayer = new app.views.Player({
			model : player
		});
		$("#player-list").append(newPlayer.render().el);
		newPlayer.setTurn();
	},
	
	renderWin : function(winner) {
		if(winner.get('type') === "c") {
			$('#winner').append("computer!");
		} else if(winner.get('type') === "h") {
			$('#winner').append("human!");
		}
	},

	initialize : function(players) {
		this.collection = new app.collections.Game(players);
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "win", this.endGame);
		this.render();
	},
	
	endGame : function() {
		var self = this;
		_.each(self.collection.models, function(player){player.set('myTurn', false);}); //disable play
		var sorted =_.sortBy(this.collection.models, function(player){return player.get('score');});
		self.renderWin(sorted.pop());
	}
	
}); 