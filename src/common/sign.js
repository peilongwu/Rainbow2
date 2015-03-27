define(function(require){
	var $box = $($('#tpl-login').html()).appendTo('body').hide();

	$box.on('click','.btn-success',function(){
		rainbow.cookie('status',1);
		$box.fadeOut();
		rainbow.nav.request();
		rainbow.route('');
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