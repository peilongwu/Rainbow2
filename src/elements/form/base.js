define(function(require){
	var Base = Back.View.extend({
		tagName: 'form',
		attributes:{
			'method':'post'
		},
		events:{
			'submit':'onSubmit',
			'click .rb-form-submit:not(.disabled)':'onSubmit'
		},
		initialize:function(options){
			this.model = options.model ? options.model : new Backbone.Model; 
		},
		verify:function(){

		},
		commit:function(){

		},
		data:function(){
			return this.model.toJSON();
		},
		onSubmit:function(){
				
		},
		destroy:function(){
			this.remove();
		}
	}); 
});