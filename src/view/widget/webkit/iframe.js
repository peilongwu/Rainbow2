define(function(require){
	var _ = require('underscore');
	var Backbone = require('backbone');
	var Webkit = require('app/widget/webkit');
	var View = require('app/view');
	var Iframe = Webkit.extend({
		tagName:'iframe',
		className:'widget-iframe',
		attributes:{
			style:'visibility: visible; padding: 0px;',
			frameborder:'0',
			width:'100%',
			height:'99%'
		},
		initialize:function(options){
			Webkit.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			this.$el.attr('src', this.model.get('url'));
			this.display();
			return this;
		}
	});
	return Iframe;
});