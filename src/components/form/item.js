define(function(require){
	var Control = require('../controls/control');
	var config = require('../controls/config');
	var validation = require('./validation');
	var Item = Backbone.View.extend({
		className:'form-group',
		initialize:function(options){
			this.form = options.form;
			this.control = null;
			this.type = options.type;
			this.type = this.type ? this.type : 'general';
			this.type === 'filter'
			&& this.model.set('isNull', !this.model.get('required'))
			var _this = this;
			this.form.on('verify', function(){
				_this.verify();
			});
		},
		events:{
			'change input,textarea,select':'onChange',
			'change input[type=file]':'onFileChange',
			'blur input,textarea,select':'onChange',
			'focus input,textarea,select':'onFocus'
		},
		render:function(){
			var tpl = {
				general:'<label class="col-sm-3 control-label"><%=alias?alias:name%></label><div class="col-sm-9"></div>',
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
			var isTree =  this.model.get('typeObject') 
				&& this.model.get('typeObject').mode == 'tree' ? true : false;
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
			control.isTree = isTree;
			control.className = 'form-control';
			this.control = new Control[control.base](control);
			var $div = this.$('div').size() ? this.$('div') : this.$el;
			this.control.render().$el.appendTo($div);
		},
		list:function(){
			var title,value;
			var model = this.model.get('typeObject');
			var list = [];

			function wordbookFilter(list, title, value){
				return _.map(list, function(item){
					var object = {title:item[title], value:item[value]};
					if(item._childList){
						object._childList = wordbookFilter(item._childList, title, value);
					}
					return object;
				});
			}

			if(model && this.model.get('dataType') === 'wordbook'){
				value = model.schema.idName;
				title = _.findWhere(model.schema.attributes, {display:'title'});
				title = title ? title.name : value;
				list = wordbookFilter(model.data.collection, title, value);
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
		onNormal:function(){
			this.$el.removeClass('has-error');
			this.$el.tooltip('hide');
			this.$el.tooltip('destroy');
			//this.$('.glyphicon-remove').remove();
			//this.$el.addClass('has-success has-feedback');
			//this.$el.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
		},
		onError:function(title){
			//this.$el.removeClass('has-success');
			//this.$('.glyphicon-ok').remove();
			this.$el.addClass('has-error');
			this.$el.tooltip({title:title, selector:true});
			//this.$el.append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
		},
		verify:function(){
			var result;
			var rules = [];
			var value = this.control.getValue();
			if(this.$el.hasClass('has-error')){
				this.$el.removeClass('has-error');
			}

			this.model.get('required') && rules.push({name:'required'});
			rules.push({name:this.model.get('dataType')});
			this.model.get('max') && rules.push({name:'max', params:[this.model.get('max')]});
			this.model.get('min') && rules.push({name:'min', params:[this.model.get('min')]});
			this.model.get('maxLength') && rules.push({name:'maxLength', params:[this.model.get('maxLength')]});
			this.model.get('minLength') && rules.push({name:'minLength', params:[this.model.get('minLength')]});			
			for(var i = 0; i < rules.length; i++){
				if(validation[rules[i]['name']]){
					if(!rules[i]['params']){
						rules[i]['params'] = [];
					}
					rules[i]['params'].unshift(value);
					result = validation[rules[i]['name']].apply(null, rules[i]['params']);
					if(true !== result){
						this.form.errors[this.model.get('name')] = result;
						this.onError((this.model.get('alias') ? this.model.get('alias') : this.model.get('name')) + ' ' + result);
						return;
					}else{
						this.onNormal();
						this.form.errors[this.model.get('name')] && delete this.form.errors[this.model.get('name')];
					}
				}
			}
			this.setValue(value);
		},
		display:function(){

		},
		filter:function(){

		},
		setValue:function(value){
			var attrs = {};
			var name = this.model.get('name');
			attrs[name] = value;
			if(this.type === 'filter'){
				!value && value !== false && this.form.model.unset(name);
				value && this.form.model.set(attrs);
			}else{
				this.form.model.set(attrs, {silent:true});
			}
		},
		onFocus:function(){
			this.onNormal();
		},
		onChange:function(e){
			this.verify();
		},
		onFileChange:function(e){
			this.verify();
		}
	});
	return Item;
});