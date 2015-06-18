define(function(require){
	var app = {};
	rainbow = app;
	require('jquery+/cookie');
	app.cookie = $.cookie;
	app.mobile = false;
	app.html5 = false;
	app.baseUrl = 'http://dev.xiyouqi.cn:8080/develop';
	
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
		app.back = window.location.hash.slice(1);
		app.back = app.back === 'signout' ? '' : app.back;
		return app.router.navigate(name, options);
	};
	
	app.start = function(){
		app.history || Backbone.history.start();
		app.history = true;
	};
	
	//视图容器
	app.views = {};
		
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

	//Backbone.emulateJSON = true;
	//Backbone.emulateHTTP = true;

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