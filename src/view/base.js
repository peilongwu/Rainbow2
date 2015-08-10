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
		setBodyHeight:function(){
			var h = $('.navbar').outerHeight();
			var vh = this.$('.rb-view-header').eq(0).outerHeight();
			var vch = this.$('.rb-content-header').eq(0).outerHeight();
			var f = this.$('.rb-view-footer').eq(0).outerHeight();
			this.$('.rb-content-body').eq(0).height(
				$(window).innerHeight() - h - vh - vch - f
			);
			$('.rb-view').height($(window).innerHeight() - h);
			return this;
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
			rainbow.on('resize',this.resize,this);
			this.$el.show();
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