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
			this.isTree = options.isTree;
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
			this.collection = this.model.get('data');
			var limit = this.model.get('limit');
			if(limit){
				this.collection = this.collection.slice(limit[0],limit[1]);
			}
			this.collection.each(function(model, index){
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
		renderItem:function(model, index, isHead, level, parent){
			level = level ? level : 0;
			var columns = this.model.get('series');
			var $container = this.$(isHead ? 'thead' : 'tbody');

			if(level){
				model = this.collection.add(model, {silent: true});
			}

			model.set('_index',index);
			var row = new Row({
				model:model,
				columns:columns,
				list:this,
				isHead:isHead,
				isHandle:this.isHandle
			});
			row.render().$el.appendTo($container);

			if(level){
				row.$el.hide();
				parent && row.$el.addClass(parent.$el.attr('class') + ' row-p-' + parent.cid);
				row.$el.attr('data-parent',parent.cid);
				row.$('.rb-title').parent().css('padding-left', level * 20);
			}

			if(model.get('_childList')){
				row.$('.rb-title')
					.parent()
					.prepend('<span class="rb-node glyphicon glyphicon-plus"></span> ');
				row.$('.rb-node').click(function(e){
					var $t = $(e.target);
					if($t.hasClass('open')){
						$t.removeClass('open')
						.removeClass('glyphicon-minus')
						.addClass('glyphicon-plus');
						$('.row-p-' + row.cid).hide().find('.open')
						.removeClass('glyphicon-minus')
						.addClass('glyphicon-plus')
						.removeClass('open');
					}else{
						$t.addClass('open')
						.removeClass('glyphicon-plus')
						.addClass('glyphicon-minus');
						$('.row-p-' + row.cid +'[data-parent="' + row.cid + '"]').show();
					}
					e.preventDefault();
					e.stopPropagation();
				});
				var childs = model.get('_childList');
				_.each(childs, function(model, index){
					this.renderItem(model, index, false, level + 1, row);		
				}, this);
			}else if(this.isTree){
				row.$('.rb-title')
					.parent()
					.prepend('<span class="rb-node glyphicon glyphicon-minus"></span> ');
			}

			return row;
		}
	});
	return Table;
});