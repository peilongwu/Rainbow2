define(function(require){
	var List = require('../../base/list');
	var Item = require('./cell');
	var Row = Backbone.View.extend({
		initialize:function(options){
			this.Item = this.Item ? this.Item : Item;
			this.list = options.list;
			this.activeClass = options.activeClass ? options.activeClass : 'active';
			this.selectedClass = options.selectedClass ? options.selectedClass : 'active';
			this.disbaleClass = options.disbaleClass ? options.disbaleClass : 'disbale';
			this.isHandle = options.isHandle;
			if(this.isHandle){
				this.model.on('change',function(model){
					if(model.changed._selected === undefined){
						this.render();
					}else{
						this.selectedStyle(model.changed._selected);
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
			$t = $(e.target);
			if($t.hasClass('rb-title')){
				this.model.set({_details:true});
			}else if(this.isHandle && !this.isHead){
				var state = this.model.get('_selected');
				if(!state && !$t.hasClass('rb-checkbox')){
					this.list.collection.each(function(model){
						model.set({_selected:false});
					},this);
				}
				this.active(e, !this.model.get('_selected'));
			}else if(this.isHead && $t.hasClass('rb-checkbox')){
				this.list.collection.each(function(model){
					model.set({_selected: $t.get(0).checked});
				},this);
			}
			return this;
		},
		active:function(e, state){
			this.selected(e, state);
			return this;
		},
		selected:function(e, state){
			this.model.set({_selected:state});
			return this;
		},
		selectedStyle:function(state){
			if(state){
				this.$el.addClass(this.selectedClass);
			}else{
				this.$el.removeClass(this.selectedClass);
			}

			this.$('.rb-checkbox').size() 
			&& (this.$('.rb-checkbox').get(0).checked = state);
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