define(function(require){
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Webkit = require('app/widget/webkit');
	var View = require('app/view');
	var Block = Webkit.extend({
		className:'widget-block row',
		attributes:{
			style:'margin:0;'
		},
		colTpl:$('#tpl-block-column').html(),
		initialize:function(options){
			Webkit.prototype.initialize.apply(this, arguments);
			this.collection = new Backbone.Collection(this.model.get('series'));
		},
		render:function(){
			this.collection.each(this.renderView, this);
			this.display();
			return this;
		},
		renderView:function(model, index){
			this.layout(model.get('column'));
			var view = new View({
				model:model,
				dashboard:this.dashboard,
				view:this
			});
			view.render().$el.appendTo(this.$currentColumn);
			setTimeout(function(){
				view.renderView();
			},50)
		},
		layout:function(column){
			if(!this.$currentColumn || column){
				column = column ? parseInt(column) : 12;
				column = column < 1 || column > 12 ? 12 : column;
				this.$currentColumn = $(this.colTpl).addClass('col-sm-' + column).appendTo(this.$el);
			}
			return this;
		}
	});
	return Block;
});