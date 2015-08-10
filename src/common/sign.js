define(function(require){
	var $box = $($('#tpl-login').html()).appendTo('body').hide();

	$box.on('submit','form',function(e){
		e.preventDefault();
		$.ajax({
			method:'POST',
			url: rainbow.baseUrl + '/signin',
			data:{
				userId:$box.find('input[name=userId]').val(),
				password:$box.find('input[name=password]').val()
			},
			async: false
		})
		.error(function(response){
			rainbow.alert(response.responseJSON.content);
		})
		.success(function(){
			rainbow.cookie('status',1);
			rainbow.nav.request(rainbow.back);
			$box.fadeOut();
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