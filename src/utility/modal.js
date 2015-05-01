define(function(require){
	var Backbone = require('backbone');
	var Modal = Backbone.View.extend({
		className:'modal fade',
		//template:_.template($('#tpl-modal').html()),
		attributes:{
			tabindex:'-1',
			role:'dialog',
			'aria-labelledby':'myModalLabel',
			'aria-hidden':'true'
		},
		initialize:function(options){
			this.content = options.content;
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			var size = this.model.get('size');
			size && this.$('.modal-dialog').addClass(size);
			this.$('.modal-body').html(this.content);
			this.$el.modal();
			var _this = this;
			this.$el.on('hidden.bs.modal', function (e) {
			  _this.remove();
			});
			return this;
		},
		show:function(){
			this.$el.modal('show');
			return this;
		},
		hide:function(){
			this.$el.modal('hide')
			return this;
		}
	});
	return Modal;
});