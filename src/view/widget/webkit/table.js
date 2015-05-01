define(function(require){
	var Webkit = require('../webkit');
	var Cell = Backbone.View.extend({
		tagName:'td',
		initialize:function(options){
			this.row = options.row;
			this.table = this.row.table;
			this.isHead = options.isHead;
			if(!this.isHead){
				this.events = this.model.get('events');
			}
			this.model.set('_row',this.row.model.toJSON());
		},
		format:function(){
			var tpl = '<%=_value%>';
			if(!this.isHead){
				var format = this.model.get('format');
				typeof format === 'string' && (tpl = format);
				typeof format === 'function' && (tpl = format.apply(this, [this.model.get('_value'),this.row.model.toJSON()]));
			}
			return tpl;
		},
		rowspan:function(){
			var key = '_rowspan_' + this.model.get('name');
			if(!this.table.model.get(key) || this.table.model.get(key).value != this.model.get('_value')){
				this.table.model.set(key, {value:this.model.get('_value'), cell:this, rowspan:1});
			}else{
				var r = this.table.model.get(key);
				r.rowspan += 1;
				r.cell.$el.attr('rowspan', r.rowspan);
				this.$el.hide();
			}
			return this;
		},
		render:function(){
			this.$el.html(_.template('<div class="table-cell">' + this.format() + '</div>')(this.model.toJSON()));
			this.model.get('className') && this.$el.addClass(this.model.get('className'));
			this.model.get('rowspan') && !this.isHead && this.rowspan();
			var display = this.model.get('display');
			!this.isHead && typeof display === 'function' && display.apply(this, [this.model.get('_value'), this.row.model.toJSON()]);
			return this;
		}
	});

	var Row = Backbone.View.extend({
		tagName:'tr',
		initialize:function(options){
			this.cellType = options.isHead ? 'th' : 'td';
			this.table = options.table;
			this.columns = options.columns;
			this.isHead = options.isHead;
		},
		render:function(){

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
			return this;
		},
		renderCell:function(model){
			var cell = new Cell({
				model:model,
				tagName:this.cellType,
				row:this,
				isHead:this.isHead,
				attributes:model.get('attributes')
			});
			cell.render().$el.appendTo(this.$el);
		}
	});

	var Table = Webkit.extend({
		tagName:'table',
		className:'table table-condensed table-hover widget-table',
		initialize:function(options){
			Webkit.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.getData() && this.update();
			return this;
		},
		renderHead:function(){
			var columns = this.model.get('series');
			var row = {};
			//_.each(columns, function(item, index){
			//	row[item.data] = item.name;
			//}, this);
			this.renderRow(new Backbone.Model(row), 0, true);
		},
		renderBody:function(item, index){
			var rows = this.getData(this.model.get('series')[0]['data']);
			var limit = this.model.get('limit');
			if(limit){
				rows = rows.slice(limit[0],limit[1]);
			}
			_.each(rows, function(row, index){
				if(this.model.get('maxLength') && index + 1 > this.model.get('maxLength')){
					return;
				}
				this.renderRow(new Backbone.Model(row), index);		
			}, this);
		},
		copyHead:function(){

		},
		update:function(){
			this.$el.html('<thead></thead><tbody></tbody>');
			this.renderHead();
			this.renderBody();
			this.display();
			return this;
		},
		renderRow:function(model, index, isHead){
			var columns = this.model.get('series');
			var $container = this.$(isHead ? 'thead' : 'tbody');
			model.set('_index',index);
			var row = new Row({
				model:model,
				columns:columns,
				table:this,
				isHead:isHead
			});
			row.render().$el.appendTo($container);
			return row;
		}
	});
	return Table;
});