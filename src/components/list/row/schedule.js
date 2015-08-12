define(function(require){
	var Base = require('./base');
	var BaseCell = require('./cell');

	var Cell = BaseCell.extend({
		className:'schedule-cell',
		render:function(){
			var tpl = this.format();
			this.$el.html(_.template(tpl)(this.model.toJSON()));
			return this;
		}
	});

	var Row = Base.extend({
		className:'schedule-event',
		events:{
			'click':'onClick'
		},
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.cellTag = 'span';
			this.list = options.list;
			this.columns = options.columns;
			this.isHead = options.isHead;
		},
		render:function(){
			this.$el.empty();

			_.each(this.columns, function(item){
				var name = item.name;
				item._value = '';
				if(this.isHead){
					item._value = item.alias ? item.alias : item.name;
				}else{
					this.model.get(name) && (item._value = this.model.get(name));
				}
				this.renderCell(new Backbone.Model(item));
			}, this);
			return this;
		},
		renderCell:function(model){
			var cell = new Cell({
				model:model,
				tagName:this.cellTag,
				row:this,
				isHead:this.isHead,
				attributes:model.get('attributes')
			});
			cell.render().$el.appendTo(this.$el);
		},
		onClick:function(e){
			
		}
	});
	return Row;
});