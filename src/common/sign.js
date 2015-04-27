define(function(require){
	var $box = $($('#tpl-login').html()).appendTo('body').hide();

	$box.on('click','.btn-success',function(){
		$.ajax({
			method:'POST',
			url:'http://dev.xiyouqi.cn:8080/ead/signin',
			data:{
				appId:'develop',
				userId:$box.find('input[name=userId]').val(),
				password:$box.find('input[name=password]').val()
			},
			async: false
		})
		.error(function(){
			alert('用户名密码错误');
		})
		.success(function(){
			rainbow.cookie('status',1);
			$box.fadeOut();
			rainbow.nav.request();
			rainbow.route('');
		});
		return false;
	});
	
	var sign = {
		'login':function(){
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