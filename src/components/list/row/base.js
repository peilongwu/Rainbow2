define(function(require){
	var List = require('../../base/list');
	var Item = require('./cell');
	var Row = Backbone.View.extend({
		initialize:function(options){
			this.Item = this.Item ? this.Item : Item;
			this.activeClass = options.activeClass ? options.activeClass : 'active';
			this.selectedClass = options.selectedClass ? options.selectedClass : 'selected';
			this.disbaleClass = options.disbaleClass ? options.disbaleClass : 'disbale';
			this.isHandle = options.isHandle;
			if(this.isHandle){
				this.model.on('change',function(model){
					if(!model.changed._selected){
						this.render();
					}
				}, this);
			}
		},
		events:{
			'click':'toggle'
		},
		render:function(){
			return this;
		},
		toggle:function(e){
			if(this.isHandle){
				this.active(e, !this.model.get('_selected'));
			}
			return this;
		},
		active:function(e, state){
			this.selected(e, state);
			if(state){
				this.$el.addClass(this.activeClass);
			}else{
				this.$el.removeClass(this.activeClass);
			}
			return this;
		},
		selected:function(e, state){
			this.model.set({_selected:state});
			if(state){
				this.$el.addClass(this.selectedClass);
			}else{
				this.$el.removeClass(this.selectedClass);
			}
			return this;
		},
		disbale:function(){
			this.$el.addClass(this.disbaleClass);
			return this;
		},
		context:function(){

		}
	});
	return Row;
});