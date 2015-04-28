define(function(require){
	var Item = Backbone.View.extend({

	});

	var List = Backbone.View.extend({
		initialize:function(options){
			this.view = this.options.view;
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