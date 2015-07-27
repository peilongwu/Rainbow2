define(function(require){
	var Control = require('../controls/control');
	var config = require('../controls/config');
	var Item = Backbone.View.extend({
		className:'form-group',
		initialize:function(options){
			this.form = options.form;
			this.control = null;
			this.type = options.type;
			this.type = this.type ? this.type : 'general';
			this.type === 'filter'
			&& this.model.set('isNull', !this.model.get('required'))
		},
		events:{
			'change input,textarea,select':'onChange',
			'change input[type=file]':'onFileChange',
			'blur input,textarea,select':'onChange'
		},
		render:function(){
			var tpl = {
				general:'<label class="col-sm-2 control-label"><%=alias?alias:name%></label><div class="col-sm-10"></div>',
				filter:'<label><%=alias?alias:name%></label>'
			};
			this.$el.html(_.template(tpl[this.type], this.model.toJSON()));
			this.renderControl();
			this.model.get('required') 
				&& this.type !== 'filter'
				&& this.$('label').append('<em class="text-danger"> * </em>');
			return this;
		},
		renderControl:function(){
			this.list();
			var value = this.form.model.get(this.model.get('name'));
			value && this.model.set('value', value);
			var type = this.model.get('control');
			if(!type){
				switch(this.model.get('metaType')){
					case 'Boolean':
						type = 'checkbox';
						break;
					case 'Text':
						type = 'textarea';
						break;
					case 'Object':
						type = 'textarea';
						break;
					case 'Array':
						type = 'textarea';
						break;
					case 'Time':
						type = 'date';
						break;
					default:
						type = 'text';
						break;
				}
			}
			var control = config[type];
			control = control ? control : {base:'input',type:'text'};
			control.model = this.model;
			control.className = 'form-control';
			this.control = new Control[control.base](control);
			var $div = this.$('div').size() ? this.$('div') : this.$el;
			this.control.render().$el.appendTo($div);
		},
		list:function(){
			var title,value;
			var model = this.model.get('typeObject');
			var list = [];
			if(model && this.model.get('dataType') === 'wordbook'){
				value = model.schema.idName;
				title = _.findWhere(model.schema.attributes, {display:'title'});
				title = title ? title.name : value;
				list = _.map(model.data.collection, function(item){
					return {title:item[title], value:item[value]};
				});
			}else if(this.model.get('list') && 'string' === typeof this.model.get('list')){
				list = this.model.get('list').split(',');
				list = _.map(list, function(item){
					var s = item.split(':');
					return {title:s[1] ? s[1] : s[0], value:s[0]};
				});
			}
			this.model.set('list',list);
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
			var value = this.control.getValue();
			var name = this.model.get('name');
			attrs[name] = value;
			if(this.type === 'filter'){
				!value && value !== false && this.form.model.unset(name);
				value && this.form.model.set(attrs);
			}else{
				this.form.model.set(attrs, {silent:true});
			}
		},
		onFileChange:function(e){
			this.verify();
		}
	});
	return Item;
});