define(function(require){
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Webkit = require('app/widget/webkit');

	var Row = Backbone.View.extend({
		initialize:function(options){
			this.cellType = options.cell ? options.cell : 'td';
			this.grid = options.grid;
			this.series = options.series;
		},
		render:function(){
			var format = this.series.format;
			var display = this.series.display;
			typeof format === 'function' && format.apply(this, [this.model.toJSON()]);
			this.$el.html(_.template(this.series.template)(this.model.toJSON()));
			typeof display === 'function' && display.apply(this, [this.model.toJSON()]);
			this.series.className && this.$el.addClass(this.series.className);
			return this;
		}
	});

	var Grid = Webkit.extend({
		className:'widget-grid row',
		attributes:{
			style:'margin:0;'
		},
		initialize:function(options){
			this.collection = new Backbone.Collection;
			Webkit.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.getData() && this.update();
			return this;
		},
		renderRow:function(model, index){
			if(this.model.get('maxLength') && index >= this.model.get('maxLength')){
				return;
			}

			var limit = this.model.get('limit');
			if(limit){
				if(index < limit[0] || index > limit[1]) {
					return;
				}
			}

			var row = new Row({
				model:model,
				grid:this,
				series:this.model.get('series'),
				attributes:this.model.get('series').attributes
			});
			row.render().$el.appendTo(this.el);
		},
		update:function(){
			this.$el.empty();
			this.collection.reset(this.getData());
			this.collection.each(this.renderRow, this);
			this.display();
			return this;
		}
	});
	return Grid;
});