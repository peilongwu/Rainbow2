define(function(require){
	var Base = require('./base');
	var Cell = require('./cell');
	var Row = Base.extend({
		tagName:'tr',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.cellTag = options.isHead ? 'th' : 'td';
			this.table = options.table;
			this.columns = options.columns;
			this.isHead = options.isHead;
		},
		render:function(){
			this.$el.empty();

			_.each(this.columns, function(item){
				//var name = this.table.getName(item.data);
				var name = item.name;
				item._value = '';
				if(this.isHead){
					item._value = item.alias ? item.alias : item.name;
				}else{
					this.model.get(name) && (item._value = this.model.get(name));
				}
				this.renderCell(new Backbone.Model(item));
			}, this);
			this.isHandle && this.handler();
			return this;
		},
		handler:function(){
			$td = $('<' + this.cellTag + '>');
			$td.html('<input class="rb-checkbox" type="checkbox">');
			$td.css({
				"width":"30px",
				"text-align": "center"
			});
			this.$el.prepend($td);
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
		}
	});
	return Row;
});