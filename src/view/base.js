define(function(require){	
	var Base = Backbone.View.extend({
		tagName:'div',
		initialize:function(options){
			this.coms = options.coms;
			rainbow.on('resize',this.resize,this);
		},
		template:function(tpl){
			var tpl = tpl ? tpl : (this.tplId ? $('#' + this.tplId).html() : '');
			this.$el.html(_.template(tpl, this.model.toJSON()));
		},
		render:function(){
			this.template();
			return this;
		},
		resize:function(){
			this.trigger('resize');
			return this;
		},
		hide:function(){
			this.$el.hide();
			this.trigger('hide');
			return this;
		},
		show:function(){
			this.$el.show();
			this.trigger('show');
			return this;
		},
		error:function(){
			this.trigger('error');
		},
		destroy:function(){
			this.trigger('destroy');
			this.remove();
		}
	});
	
	return Base;
});