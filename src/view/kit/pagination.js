define(function(require){
	var Base = require('./list');
	var Item = Base.Item.extend({
		tagName:'li',
		events:{
			'click':'onClick'
		},
		initialize:function(options){
			Base.Item.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			var tpl = '<a href="javascript:void(0);"><%=name%></a>';
			this.$el.html(_.template(tpl, this.model.toJSON()));
			return this;
		},
		onClick:function(){
			this.$el
				.addClass('active')
				.siblings()
				.removeClass('active');
			this.view.model.filter.set({_page:this.model.get('num')});
		}
	});

	var List = Base.List.extend({
		tagName:'li',
		className:'pagination',
		initialize:function(options){
			Base.List.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			var size = 9;
			var s,lt,rt;
			var count = this.model.get('count');
			var current = this.model.get('current');
			
			if(count > size){
				s = Math.floor(size/2);
				rt = current + s;
				rt = rt > count ? count : rt;
				lt = rt - size + 1;
				lt = lt < 1 ? 1:lt;
			}else{
				size = count;
				lt = 1;
			}
			
			if(count > 1){
				for(var i = lt; i < lt + size; i++){
					this.renderItem(new Backbone.Model({num:i, name:i}) ,i);
				}
			}
			this.view.$('.rb-pagination').empty().append(this.el);
			return this;
		},
		renderItem:function(model, i){
			var item = new Item({
				model: model,
				view: this.view
			});
			this.$el.append(item.render().el);
			i === this.model.get('current') && item.$el.addClass('active');
		}
	});

	return List;
});