define(function(require){
	var app = {};
	rainbow = app;
	require('jquery+/cookie');
	app.cookie = $.cookie;
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
			"signin": "signin",
			"signout": "signout"
		},
		signin:function(){
			app.sign.login();
		},
		signout:function(){
			app.sign.logout();
		}
	});
	
	app.router = new Router();
	app.route = function(name, options){
		return app.router.navigate(name,options);
	};
	
	app.start = function(){
		app.history || Backbone.history.start();
		app.history = true;
	};
	
	//视图容器
	app.views = new Backbone.Collection;
		
	//当前视图对象
	app.current;
	
	//扩展Backboe Events
	_.extend(app, Backbone.Events);

	//应用窗口对象
	app.window = {};
	$(window).on('resize',function(){
		app.window.height = $(window).innerHeight();
		app.window.width = $(window).innerWidth();
		app.trigger('resize');
	});

	//$.Ajax 跨域选项配置
	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.crossDomain = {
        crossDomain: true
    };
    options.xhrFields = {
        withCredentials: true
    };
	});
	
	return app;
});