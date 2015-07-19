define(function(require){
	var Base = require('./base');
	var Input = Base.extend({
		tagName:'input',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.$el.attr(this.attributes);
			return this;
		}
	});

	return Input;
});