define(function(require){
	var Item = Backbone.View.extend({
		initialize:function(options){
			this.view = options.view;
		}
	});
	
	var List = Backbone.View.extend({
		initialize:function(options){
			this.view = options.view;
		},
		renderItem:function(model, i){
			var item = new Item({
				model: model,
				view: this.view
			});
			this.$el.append(item.render().el);
		}
	});

	return {
		Item: Item,
		List: List
	}
});