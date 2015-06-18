define(function(require){
	var $box = $($('#tpl-login').html()).appendTo('body').hide();

	$box.on('submit','form',function(e){
		e.preventDefault();
		$.ajax({
			method:'POST',
			url: rainbow.baseUrl + '/signin',
			data:{
				appId:'develop',
				userId:$box.find('input[name=userId]').val(),
				password:$box.find('input[name=password]').val()
			},
			async: false
		})
		.error(function(){
			rainbow.alert('用户名密码错误');
		})
		.success(function(){
			rainbow.cookie('status',1);
			$box.fadeOut();
			rainbow.nav.request(rainbow.back);
		});
	});
	
	var sign = {
		'login':function(e){
			$box.fadeIn();
		},
		'logout':function(){
			rainbow.cookie('status', '');
			rainbow.route('signin', {trigger: true});
		},
		isIn:function(){
			return rainbow.cookie('status');
		}
	};
	return sign;
});