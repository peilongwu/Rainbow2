define(function(require){
	var Control = require('../control/input');
	var Item = Backbone.View.extend({
		className:'form-group',
		initialize:function(options){
			this.form = options.form;
			this.control = null;
		},
		events:{
			'change input,textarea,select':'onChange',
			'change input[type=file]':'onFileChange',
			'blur input,textarea,select':'onChange'
		},
		render:function(){
			var tpl = '<label class="col-sm-2 control-label"><%=alias?alias:name%></label><div class="col-sm-10"></div>';
			this.$el.html(_.template(tpl, this.model.toJSON()));
			this.renderControl();
			this.model.get('required') && this.$('label').append('<em> * </em>');
			return this;
		},
		renderControl:function(type){
			var value = this.form.model.get(this.model.get('name'));
			value && this.model.set('value', value);
			this.control = new Control({
				model:this.model,
				className:'form-control'
			});
			this.control.render().$el.appendTo(this.$('div'));
		},
		verify:function(){
			
		},
		display:function(){

		},
		filter:function(){

		},
		onChange:function(e){
			this.verify();
			var attrs = {};
			attrs[this.model.get('name')] = this.control.$el.val();
			this.form.model.set(attrs,{silent:true});
		},
		onFileChange:function(e){
			this.verify();
		}
	});
	return Item;
});