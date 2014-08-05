define(function(require){
	
	var $box = $($('#tpl-login').html()).appendTo('body').hide();
	$box.on('click','.btn-success',function(){
		rainbow.cookie.set('status',1);
		$box.fadeOut();
		rainbow.nav.request();
		rainbow.route('');
		return false;
	});
	
	$('#J-signout').on('click',function(){
		if(rainbow.confirm('确定要退出当前登录的账号？')) {
			sign.logout();
			rainbow.route('signin', {trigger: true});
		}
	});
	
	var sign = {
		'login':function(){
			$box.fadeIn();
		},
		'logout':function(){
			rainbow.cookie.remove('status');
		},
		isIn:function(){
			return rainbow.cookie.get('status');
		}
	};
	return sign;
});