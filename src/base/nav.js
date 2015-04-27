define(function(require){
	var nav = {};
	var ViewModel = require('../view/model');
	var Model = Backbone.Model.extend({
		idAttribute:'id'
	});
	
	var Collection = Backbone.Collection.extend({
		url:'http://dev.xiyouqi.cn:8080/develop/res',
		model:Model,
		parse: function(response) {
	    return response.resources;
	  }
	});
	
	var Item = Backbone.View.extend({
		tplId:'tpl-nav-item',
		template:_.template,
		tagName:'a',
		className:'list-group-item',
		events:{
			'click' : 'onClick'
		},
		initialize:function(options){
			this.path = options.path ? options.path + '/' : '';
			this.path += this.model.get('key');
			this.tplId = options.tplId ? options.tplId : this.tplId;
			this.parent = options.parent;
			this.view = options.view;
			this.level = options.level;
			this.collection = new Backbone.Collection(this.model.get('childs'));
			this.$childs = null;
			this.view.model.on('change:_current',function(e){
				if(this.view.model.get('_current').indexOf(this.path) === 0){
					this.$el.addClass('active');
				}else{
					this.$el.removeClass('active');
				}
			},this);
		},
		route:function(){
			var name = this.path;
			var res = this;
			rainbow.router.route(name + '*path',function(path){
				console.log('Route:', res.path, '- Paths:', path);
				path = path ? path.split('/').slice(1) : path;
				res.onActive(path);
			});
			return '#' + name;
		},
		render:function(){
			//this.$el.attr('href',this.route());
			this.route();
			this.$el.html(_.template(
				$('#' + this.tplId).html(),
				this.model.toJSON()
			));
			return this;
		},
		renderChild:function(model,i){
			var v = new Item({
				model:model, path:this.path, view:this.view, parent:this,
				tplId:'tpl-nav-child-item',tagName:'li',className:'',
				level:this.level + 1
			});
			
			this.$childs.append(v.render().el);
			v.$('a').attr('href',v.$el.attr('href'));
			this.first = this.first ? this.first : v;
			if(this.childPath && this.childPath[0] === v.model.get('key')){
				var childPath = this.childPath ? this.childPath.slice(1) : null;
				v.onActive(childPath);
			}
		},
		onActive:function(childPath){
			console.log('Active:', this.path,'- Childs Path:', childPath);
			this.childPath = childPath;
			this.view.model.set('_current', this.path);
			if(0 === this.level){
				$('.rb-nav-1').empty();
			}
			
			if(this.collection.length > 0){
				if(!this.$childs){
					this.$childs = $('.rb-nav-' + (this.level + 1));
					if(!this.$childs.size()){
						this.$childs = $('<ul class="sub"></ul>').appendTo(this.$el);
					}
				}
				this.$childs.empty();
				this.collection.each(this.renderChild,this);
				childPath || rainbow.route(this.first.path, {trigger: true});
			}else if(this.model.get('type') === 'view'){
				this.loadView();
			}
		},
		loadView:function(){
			var view = new ViewModel;
			view.url = 'http://dev.xiyouqi.cn:8080/develop/' + this.path.replace(/\//g, '-');
			view.request(this);
		},
		onClick:function(e){
			rainbow.route(this.path, {trigger: true});
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	var NavView = Backbone.View.extend({
		tagName:'div',
		className:'list-group',
		initialize:function(options){
			this.model = new Backbone.Model;
		},
		render:function(){
			$('.rb-nav-0').empty();
			this.$el.appendTo('.rb-nav-0');
			this.collection.each(this.renderItem,this);
			return this;
		},
		renderItem:function(model,i){
			var v = new Item({model:model, path:'', view:this, parent:this, level:0});
			this.$el.append(v.render().el);
			this.first = this.first ? this.first : v;
		}
	});
	
	nav.request = function(){
		var res = new Collection;
		res.fetch({
			success:function(collection, response, options){
				var view = new NavView({collection:collection});
				view.render();
				rainbow.start();
			},
			error:function(collection, response, options){
				alert(response.responseJSON.content);
				rainbow.route('signin', {trigger: true});
			}
		});
	};
	
	return nav;
});