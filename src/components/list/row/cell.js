define(function(require){
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
			var tpl = '<div class="table-cell">' + this.format() + '</div>';
			this.$el.html(_.template(tpl)(this.model.toJSON()));
			this.model.get('className') && this.$el.addClass(this.model.get('className'));
			this.model.get('rowspan') && !this.isHead && this.rowspan();
			var display = this.model.get('display');
			!this.isHead && typeof display === 'function' && display.apply(this, [this.model.get('_value'), this.row.model.toJSON()]);
			return this;
		}
	});
	return Cell;
});