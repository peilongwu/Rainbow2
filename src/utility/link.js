define(function(require){
	return function(url){
		var sign = url.slice(0,1);
		switch(sign) {
			case '#':
				window.location = url;
				break;
			default:
				window.open(url);
		}
	}
});