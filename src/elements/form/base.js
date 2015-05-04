define(function(require){
	var Base = Backbone.View.extend({
		tagName: 'form',
		attributes:{
			'method':'post'
		},
		events:{
			'submit':'onSubmit',
			'click .rb-submit:not(.disabled)':'onSubmit'
		},
		initialize:function(options){
			this.model = options.model ? options.model : new Backbone.Model; 
		},
		renderItem:function(model, i){

		},
		verify:function(){
			this.trigger('verify');
		},
		disableSubmit:function(){
			this.$('.rb-submit').addClass('disabled');
			return this;
		},
		enableSubmit:function(){
			this.$('.rb-submit').removeClass('disabled');
			return this;
		},
		commit:function(){

		},
		cancel:function(){

		},
		data:function(){
			return this.model.toJSON();
		},
		onSubmit:function(){
			e.preventDefault();
			this.verify();
			var data = this.model.toJSON();
			if(this.callBack){
				this.callBack(data,this);
				return;
			}
			this.commit();
		},
		destroy:function(){
			this.remove();
		}
	});
	return Base;
});