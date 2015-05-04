define(function(require){
	var Base = require('./base');
	var Item = require('./item');
	var Genaral = Base.extend({
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.errors = [];
		},
		render:function(){
			this.collection.each(this.renderItem, this);
			return this;
		},
		renderItem: function(model, i){
			var item = new Item({
				model: model,
				form: this
			});
			item.render().$el.appendTo(this.$('.rb-form-body'));
		},
		addGroup:function(){
			
		}
	});
});