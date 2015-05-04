definre(function(){
	var Standard = require('../standard');
	var Tree = Standard.extend({
		initialize:function(options){
			Standard.prototype.initialize.apply(this, arguments);
		}
	});
	return Tree;
});