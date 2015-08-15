define(function(require){
	var Base = require('./base');
	var Select = Base.extend({
		tagName:'select',
		optionTpl:'<option value="<%=value%>"><%=title%></option>',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.multiple = options.multiple;
			this.isTree = options.isTree;
			delete this.attributes.value;
			delete this.attributes.type;
		},
		render:function(){
			this.before();
			this.$el.attr(this.attributes);
			this.multiple && this.$el.attr('multiple', true);
			_.each(this.model.get('list'), this.renderOption, this)
			this.after();
			return this;
		},
		before:function(){
			this.model.get('isNull') && this.addEmptyOption();
			!this.model.get('required')
				&& this.model.get('isNull') !== true
				&& this.addEmptyOption();
			this.model.format && this.model.format.apply(this);
			return this;
		},
		after:function(){
			this.selected(this.model.get('value'));
			this.display && this.display.apply(this);
			return this;
		},
		addEmptyOption:function(){
			this.model.get('list').unshift({title:'(Null)', value:''});
			return this;
		},
		addGroup:function(){

		},
		levelJoin:function(num){
			var str = '';
			for(var i = 0; i < num; i++){
				str += '│';
			}
			return str;
		},
		renderOption:function(item, index, list,level){
			level = level ? level : 0;
			if(this.isTree){
				var levelStr = this.levelJoin(level);
				item.title = levelStr + '├' + item.title;
				this.$el.append(_.template(this.optionTpl, item));
				item._childList && _.each(item._childList, function(item){
					this.renderOption(item, index, null, level + 1);
				}, this);
			}else{
				this.$el.append(_.template(this.optionTpl, item));
			}
			return this;
		},
		selected:function(value){
			this.$('option[value="' + value + '"]').attr('selected', true);
			return this;
		}
	});

	return Select;
});