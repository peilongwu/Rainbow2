define(function(require){
	var Base = require('./list');
	var Item = require('../../components/form/item');

	var List = Base.List.extend({
		className:'form-inline',
		initialize:function(options){
			Base.List.prototype.initialize.apply(this, arguments);
			this.model = this.view.model.filter;
			this.items = {};
			this.errors = {};
		},
		render:function(){
			this.collection.each(this.renderItem, this);
			this.view.$('.rb-filter').append(this.el);
			return this;
		},
		renderItem:function(model, i){
			var schema = _.findWhere(
				this.view.model.get('schema').attributes, 
				{name: model.get('name')}
			);
			model.get('value') === undefined && model.set('value', '');
			schema = _.defaults(model.toJSON(), schema);
			model.set(schema);
			var item = new Item({
				model: model,
				form: this,
				type:'filter'
			});
			this.$el.append(item.render().el);
		}
	});

	return List;

});