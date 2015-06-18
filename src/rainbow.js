define(function(require){
	require(['text!template/desktop.html', 'jquery'], function(template){
		require('underscore');
		require('backbone');
		require('es5');
		require('store');
		require('bootstrap');
		$('body').append(template);
		require(['./base/app'], function(app){
			require(['./base/nav'], function(nav){
				if(!app.sign.isIn()){
					app.start();
					app.route('signin', {trigger: true});
				}else{
					nav.request();
				}
			});
		});
	});
});