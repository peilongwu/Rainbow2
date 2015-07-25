define(function(require){
	var Base = require('./base');
	var Row = require('./row/table');
	var Table = Base.extend({
		tagName:'table',
		className:'table table-condensed table-hover widget-table',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.fixed = options.fixed;
			this.isHandle = options.isHandle;
		},
		render:function(){
			this.$el.html('<thead></thead><tbody></tbody>');
			this.update();
			return this;
		},
		header:function(){
			var columns = this.model.get('series');
			var row = {};
			this.renderItem(new Backbone.Model(row), 0, true);
		},
		body:function(item, index){
			var collection = this.model.get('data');
			var limit = this.model.get('limit');
			if(limit){
				collection = collection.slice(limit[0],limit[1]);
			}
			collection.each(function(model, index){
				if(this.model.get('maxLength') && index + 1 > this.model.get('maxLength')){
					return;
				}
				this.renderItem(model, index);		
			}, this);
		},
		empty:function(){
			this.$('thead').empty();
			this.$('tbody').empty();
			return this;
		},
		update:function(){
			this.empty();
			this.header();
			this.body();
			//this.display();
			return this;
		},
		renderItem:function(model, index, isHead){
			var columns = this.model.get('series');
			var $container = this.$(isHead ? 'thead' : 'tbody');
			model.set('_index',index);
			var row = new Row({
				model:model,
				columns:columns,
				table:this,
				isHead:isHead,
				isHandle:this.isHandle
			});
			row.render().$el.appendTo($container);
			return row;
		}
	});
	return Table;
});