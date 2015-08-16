define(function(require, exports, module){
	var app = {};
	rainbow = app;
	require('jquery-plus/cookie');
	app.cookie = $.cookie;
	app.mobile = false;
	app.html5 = false;
	app.baseUrl = module.config().baseUrl;
	var Layout = Backbone.View.extend({
		tagName:'div',
		render:function(){
			this.$el.html($('#tpl-layout').html());
			this.$el.height('100%');
			return this;
		}
	});
	
	//初始化应用布局
	app.layout = new Layout;
	
	//Alert & Confirm Proxy
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
		var back = window.location.hash.slice(1);
		app.back = back == 'signout' ? app.back : back;
		return app.router.navigate(name, options);
	};
	
	//Hash Router
	app.start = function(){
		Backbone.History.started || Backbone.history.start();
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
	if('dev.xiyouqi.cn' !== location.hostname){
		$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	    options.crossDomain = {
	      crossDomain: true
	    };
	    options.xhrFields = {
	        withCredentials: true
	    };
		});
	}

	return app;
});