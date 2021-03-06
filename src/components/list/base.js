define(function(require){
	var Base = Backbone.View.extend({
		initialize:function(options){
			this.tpl = options.tpl;
			this.params = options.params;
		},
		render:function(){
			this.$el.html(_.template($(this.tpl).html()));
			return this;
		},
		renderItem:function(){
			
		},
		renderChildList:function(){

		},
		update:function(){
			this.header();
			this.body();
			this.footer();
		},
		header:function(){

		},
		body:function(){

		},
		footer:function(){

		}
	});
	return Base;
});