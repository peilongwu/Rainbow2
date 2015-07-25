define(function(require){
	var Base = require('./base');
	var Input = Base.extend({
		tagName:'input',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.before();
			this.$el.attr(this.attributes);
			this.after();
			return this;
		},
		getValue:function(){
			return this.type === 'checkbox' ? this.el.checked : this.$el.val();
		},
		getChecked:function(){
			
		}
	});

	return Input;
});