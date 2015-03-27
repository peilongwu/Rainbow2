define(function(require){
	require(['text!template/desktop.html', 'jquery'], function(template){
		require('underscore');
		require('backbone');
		$('body').append(template);
		require(['./base/app'], function(app){
			if(!app.sign.isIn()){
				app.start();
				app.route('signin', {trigger: true});
			}else{
				app.nav.request();
			}
		});
	});
});