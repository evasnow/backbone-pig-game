require.config({
    paths : {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        Backbone: 'libs/backbone',
        text: 'libs/text',
        templates: '../templates',
        app: 'app'
        },
        
    shim: {
    	jquery: {
          exports: '$'
        },
        underscore: {
          exports: '_'
        },
        Backbone: {
          deps:["jquery", "underscore"],
          exports: 'Backbone'
        },
        app: {
        	deps:["Backbone"],
        	exports: 'init'
        }
    }
});

require(['app'], function() {
	app.init();
});
