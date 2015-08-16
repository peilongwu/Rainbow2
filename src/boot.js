define(function(require, exports, module){
	var app = require('app/base/app');
	var nav = require('app/base/nav');
	app.nav = nav;
	if(!app.sign.isIn()){
		app.start();
		app.route('signin', {trigger: true});
	}else{
		nav.request();
	}
});