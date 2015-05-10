define(function(require){
	var Base = require('./base');
	var Item = require('./item');
	var Genaral = Base.extend({
		className:'form-horizontal',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.errors = [];
		},
		render:function(){
			this.collection.each(this.renderItem, this);
			this.$el.append('<button type="button" class="btn btn-success rb-submit">提交</button>');
			return this;
		},
		renderItem: function(model, i){
			var item = new Item({
				model: model,
				form: this
			});
			item.render().$el.appendTo(this.$el);
		},
		addGroup:function(){
			
		}
	});
	return Genaral;
});