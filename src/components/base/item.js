define(function(require){
	var Item = Backbone.View.extend({
		initialize:function(options){
			this.list = options.list;
		},
		render:function(){
			
			return this;
		}
	});
	return Item;
});