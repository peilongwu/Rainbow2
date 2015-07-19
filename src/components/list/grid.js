define(function(require){
	var Base = require('./base');
	var Grid = Base.View.extend({
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.update();
			return this;
		},
		header:function(){
			
		},
		body:function(){
			
		},
		empty:function(){
			return this;
		}
	});
	return Grid;
});