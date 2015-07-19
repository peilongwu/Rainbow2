define(function(require){
	var Base = Backbone.View.extend({
		initialize:function(options){
			this.tpl = options.tpl;
		},
		render:function(){
			this.$el.html(_.template($(this.tpl).html()));
			return this;
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