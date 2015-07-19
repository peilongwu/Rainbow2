define(function(require){
	var Control = require('../control/control');
	var config = require('../control/config');
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
			var control = config[this.model.get('control')];
			control = control ? control : {base:'input',type:'text'};
			control.model = this.model;
			control.className = 'form-control';
			this.control = new Control[control.base](control);
			this.control.render().$el.appendTo(this.$('div'));
		},
		list:function(){
			var title,value;
			var model = this.model.get('typeObject');
			var list
			if(model && this.model.get('dataType') === 'wordbook'){
				value = model.schema.idName;
				title = _.findWhere(model.schema.attributes, {display:'title'});
				title = title ? title.name : value;
				this.model.list = _.map(model.data.collection, function(item){
					return {title:item[title], value:item[value]};
				});
			}else if(model && model.list){
				this.model.list = list;
			}

			return this;
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