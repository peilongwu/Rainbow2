define(function(require){
	var Item = Backbone.View.extend({
		initialize:function(options){
			this.view = options.view;
		}
	});
	return Item
});