define(function(require){
	var List = Backbone.View.extend({
		initialize:function(options){
			this.Item = options.Item;
		},
		render:function(){
			this.update();
			return this;
		},
		update:function(){
			this.collection.each(this.renderItems, this);
		},
		renderItems:function(model, index){
			var item = new this.Item({
				model:model,
				list:this
			});
			item.render().$el.appendTo(this.$el);
		}
	});
	return List;
});