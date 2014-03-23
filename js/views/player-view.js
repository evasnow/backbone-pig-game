app = app || {};

app.views.Player = Backbone.View.extend({
	
	tagName: 'li',
	
	template: _.template($("#player-template").html()),
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	}
});

app.views.Game = Backbone.View.extend({
	
	el: $("#game"),
	
	render: function() {
		$('#game').empty();
		_.each(this.collection.models, function(player) {
			this.renderPlayer(player);
		}, this);
	},
	
	renderPlayer: function(player) {
		var newPlayer = new app.views.Player({model: player});
		$("#game").append(newPlayer.render().el);
	},
	
		initialize: function(players){
		this.collection = new app.collections.Game(players);
		this.render();
		_.each(this.collection.models, function(player) {
			this.collection.playTurn(player);
		}, this);
	}
	
		
});