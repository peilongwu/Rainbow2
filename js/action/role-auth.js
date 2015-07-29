define(function(require){
	var tree = require('app/components/webkit/tree');
	return function(){
		var t = new tree.Base({
			url:'0142b65177d0f9458a5d42b651770000',
			filter:{'appid':'develop'},
			open:false,
			multiple:true,
			gear:true,
			defaults:[]
		});
	};
});