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
			return this;
		},
		renderItem: function(model, i){
			if(model.get('control') == 'file'){
				this.isUpload = true;
			}
			var item = new Item({
				model: model,
				form: this
			});
			item.render().$el.appendTo(this.$el);
			this.items[model.get('name')] = item;
		},
		addGroup:function(){
			
		}
	});
	return Genaral;
});