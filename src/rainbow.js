define(function(require){
	require(['text!template/desktop.html', 'jquery'], function(template){
		require('underscore');
		require('es5');
		require('bootstrap');
		require('backbone');
		require('select2');
		$('body').append(template);
		Rainbow = Backbone;
		require(['./base/app'], function(app){
			require(['./base/nav'], function(nav){
				app.nav = nav;
				if(!app.sign.isIn()){
					app.start();
					app.back = window.location.hash.slice(1);
					app.route('signin', {trigger: true});
				}else{
					nav.request();
				}
			});
		});
	});
});