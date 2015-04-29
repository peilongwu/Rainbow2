define(function(require){
	var Base = require('./list');
	var Item = Base.Item.extend({
		tagName:'li',
		className:'',
		events:{
			'click':'onClick'
		},
		initialize:function(options){
			Base.Item.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.$el.text(this.model.get('name'));
			return this;
		}
	});

	var List = Base.List.extend({
		initialize:function(options){
			Base.List.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.collection.each(this.renderItem, this);
			this.view.$('.rb-breadcrum').append(this.el);
			return this;
		},
		renderItem:function(model, i){
			var item = new Item({
				model: model,
				view: this.view
			});
			this.$el.append(item.render().el);
		}
	});

	return List;

});