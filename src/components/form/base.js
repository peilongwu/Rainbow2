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
			this.isUpload = options.isUpload ? options.isUpload : false;
			this.items = {};
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
			if(this.isUpload){
				return this.uploadCommit();
			}
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
		uploadCommit:function(){
			var fd = new FormData();
			var _this = this;
	    this.$('input,select,textarea').each(function(index, el){
	    	var $el = $(el);
	    	if($el.attr('type') == 'file'){
	    		fd.append($el.attr('name'), $el[0].files[0]);
	    	}else{
	    		fd.append($el.attr('name'), $el.val());
	    	}
	    });

	    $.ajax({
	       url: this.model.url() + '/upload',
	       type: "POST",
	       data: fd,
	       processData: false,
	       contentType: false
	    })
	    .success(function(response, options) {
	       	_this.trigger('success');
	    })
	    .error(function(response, options) {
	       	alert(response.responseJSON.content);
					_this.trigger('error');
	    });
		},
		cancel:function(){

		},
		data:function(){
			return this.model.toJSON();
		},
		onSubmit:function(e){
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