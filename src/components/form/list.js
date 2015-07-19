define(function(require){
	var Base = require('../base/list');
	var Item = require('./item');
	var List = Base.extend({
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.Item = this.Item ? this.Item : Item;
		},
		render:function(){
			Base.prototype.render.apply(this, arguments);
			return this;
		}
	});
	return List;
});