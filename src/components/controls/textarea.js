define(function(require){
	var Base = require('./base');
	var Textarea = Base.extend({
		tagName:'textarea',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.attributes.rows = 4;
			this.$el.attr(this.attributes);
			this.$el.val(this.attributes.value);
			return this;
		}
	});

	return Textarea;
});