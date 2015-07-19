define(function(require){
	var Base = require('../base/item');
	var Item = Base.extend({
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			Base.prototype.render.apply(this, arguments);
			return this;
		},
		format:function(){

		},
		display:function(){
			
		}
	});
	return Item;
});