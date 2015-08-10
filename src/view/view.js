define(function(require){
	var view = {
		Base:require('./base'),
		Standard:require('./standard'),
		Aid:require('./aid'),
		Preview:require('./preview'),
		Iframe:require('./iframe')
	};
	
	return view;
});