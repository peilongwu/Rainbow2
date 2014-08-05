define(function(require){
	var template = require('/assets/Rainbow/templates/site/desktop.html');
	$('body').after(template);
	var app = {};
	rainbow = app;
	app.cookie = require('cookie');
	app.nav = require('./nav');
	app.mobile = false;
	app.html5 = false;
	
	var Layout = Backbone.View.extend({
		tagName:'div',
		render:function(){
			this.$el.html($('#tpl-layout').html());
			return this;
		}
	});
	
	app.layout = new Layout;
	$('body').append(app.layout.render().el);
	
	app.alert = function(msg, callback, context){
		alert(msg);
	};
	
	app.confirm = function(msg, callback, context){
		return confirm(msg);
	};
	
	app.sign = require('../common/sign');
	var Router = Backbone.Router.extend({
		routes: {
			"!signin": "signin"
		},
		signin:function(){
			app.sign.login();
		}
	});
	
	app.router = new Router();
	app.route = function(name, options){
		name = name ? '!' + name : '';
		return app.router.navigate(name,options);
	};
	
	app.start = function(){
		app.history || Backbone.history.start();
		app.history = true;
	};
	
	//视图容器
	app.views = new Backbone.Collection;
	app.coms = {
		
	};
		
	//当前视图对象
	app.current;
	
	_.extend(app, Backbone.Events);
	//应用窗口对象
	app.window = {};
	$(window).on('resize',function(){
		app.window.height = $(window).innerHeight();
		app.window.width = $(window).innerWidth();
		app.trigger('resize');
	});
	return app;
});