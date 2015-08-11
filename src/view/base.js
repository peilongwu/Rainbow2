define(function(require){	
	var Base = Backbone.View.extend({
		tagName:'div',
		initialize:function(options){
			this.coms = options ? options.coms : null;
			this.nestedLevel = options ? options.nestedLevel : null;
			this.parent = options ? options.parent : null;
			rainbow.on('resize',this.resize,this);
		},
		template:function(tpl){
			var tpl = tpl ? tpl : (this.tplId ? $('#' + this.tplId).html() : '');
			this.$el.html(_.template(tpl, this.model.toJSON()));
		},
		setBodyHeight:function(){
			var h = $('.navbar').outerHeight();
			var vh = this.getHeaderHeight();
			var vch = this.$('.rb-content-header').eq(0).outerHeight();
			var f = this.$('.rb-view-footer').eq(0).outerHeight();
			this.$('.rb-content-body').eq(0).height(
				$(window).innerHeight() - h - vh - vch - f
			);
			$('.rb-view').height($(window).innerHeight() - h);
			return this;
		},
		getHeaderHeight:function(){
			var vh = this.$('.rb-view-header').eq(0).outerHeight();
			if(this.parent && this.nestedLevel){
				vh += this.parent.getHeaderHeight();
			}
			return vh;
		},
		render:function(){
			this.template();
			return this;
		},
		resize:function(){
			this.trigger('resize');
			this.setBodyHeight();
			return this;
		},
		hide:function(){
			rainbow.off('resize',this.resize,this);
			this.$el.hide();
			this.trigger('hide');
			return this;
		},
		show:function(){
			this.$el.show();
			this.setBodyHeight();
			rainbow.on('resize',this.resize,this);
			this.trigger('show');
			return this;
		},
		error:function(){
			this.trigger('error');
		},
		destroy:function(){
			rainbow.off('resize',this.resize,this);
			this.trigger('destroy');
			this.remove();
		}
	});
	
	return Base;
});