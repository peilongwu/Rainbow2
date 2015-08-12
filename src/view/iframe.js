define(function(require){
	var Base = require('./base');
	var Iframe = Base.extend({
		template:_.template($('#tpl-view-iframe').html()),
		initialize:function(){
			Base.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			var iframe = '<iframe name="" frameborder="0" src="' 
			+ this.model.get('url') + '"'
			+ 'height="100%" width="100%" style="visibility: visible;"></iframe>';
			this.$el.append(this.template());
			//this.breadcrumb();
			this.$('.rb-content-body').html(iframe).css('padding',0);
			this.setBodyHeight();
			return this;
		},
		breadcrumb:function(){
			var v = new compontent.Breadcrumb({
				collection:new Backbone.Collection(this.model.get('breadcrumb')),
				view:this
			});
			this.$('.rb-breadcrumb').html(v.render().el);
		}
	});
	return Iframe;
});