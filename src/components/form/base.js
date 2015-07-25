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
			this.model = this.model ? this.model : new Backbone.Model; 
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
			this.disableSubmit();
			var _this = this;
			this.model.save(null, {
				success:function(model, response, options){
					model.set(response.data);
					_this.trigger('success');
				},
				error:function(model, response, options){
					alert(response.responseJSON.content);
					_this.trigger('error');
				}
			});
		},
		cancel:function(){

		},
		data:function(){
			return this.model.toJSON();
		},
		onSubmit:function(e){
			console.log('On Submit');
			e.preventDefault();
			this.verify();
			if(this.callBack){
				this.callBack(this.data(), this);
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