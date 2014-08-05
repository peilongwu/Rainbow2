define(function(require){
	require('json');
	var app = require('./base/app');
	if(!app.sign.isIn()){
		app.start();
		app.route('signin', {trigger: true});
	}else{
		app.nav.request();
	}
});