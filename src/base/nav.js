define(function(require){
	var nav = {};
	var ViewModel = require('../view/model');
	var Model = Backbone.Model.extend({
		idAttribute:'id'
	});
	rainbow.ViewModel = ViewModel;

	var Collection = Backbone.Collection.extend({
		url: rainbow.baseUrl + '/res',
		model:Model,
		parse: function(response) {
	    return response.resources;
	  }
	});
	
	var Item = Backbone.View.extend({
		tplId:'tpl-nav-item',
		template:_.template,
		tagName:'a',
		//className:'list-group-item',
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
			this.view.model.on('change:_active',function(e){
				var active = this.view.model.get('_active');
				var path = active.path.slice(0, this.path.length);
				if(active === this){
					this.$el.addClass('active');
				}else if(this.level !== active.level && this.path === path){
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
				//console.log('Route:', res.path, '- Paths:', path);
				path = path ? path.split('/').slice(1) : path;
				res.onActive(path);
			});
			return '#' + name;
		},
		render:function(){
			this.route();
			this.$el.html(_.template(
				$('#' + this.tplId).html(),
				this.model.toJSON()
			));
			if(this.$el.is('a')){
				this.$el.attr('href',this.route());
			}else{
				this.$('a').attr('href',this.route());
			}
			return this;
		},
		renderChild:function(model,i){
			var v = new Item({
				model:model, path:this.path, view:this.view, parent:this,
				tplId:'tpl-nav-child-item',tagName:'li',className:'list-group-item',
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
			//console.log('Active:', this.path,'- Childs Path:', childPath);
			this.childPath = childPath;
			this.view.model.set('_active', this);
			var $childs = $('.rb-nav-' + (this.level + 1));
			$childs.empty();
			
			if(this.collection.length > 0){
				if(!this.$childs){
					this.$childs = $childs;
					if(!this.$childs.size()){
						this.$childs = $('<ul class="sub"></ul>').appendTo(this.$el);
					}
				}
				this.$childs.empty();
				this.collection.each(this.renderChild,this);
				childPath || rainbow.route(this.first.path, {trigger: true});
			}else if(this.model.get('type') === 'view' || this.model.get('type') === 'link'){
				this.loadView(childPath);
			}
		},
		loadView:function(params){
			var view = new ViewModel({
				res:this
			});
			view.params = params;
			view.url = rainbow.baseUrl + '/' + this.path.replace(/\//g, '-');
			view.$body = $('<div class="rb-view view loading"></div>');
			rainbow.layout.$('.rb-views')
				.empty()
				.append(view.$body);
			view.request();
		},
		onClick:function(e){
			rainbow.route(this.path, {trigger: true});
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	var NavView = Backbone.View.extend({
		tagName:'ul',
		className:'nav navbar-nav',
		initialize:function(options){
			this.model = new Backbone.Model;
			this.path = options.path;
		},
		render:function(){
			$('.rb-nav-0').empty();
			this.$el.appendTo('.rb-nav-0');
			this.collection.each(this.renderItem,this);
			return this;
		},
		renderItem:function(model,i){
			var v = new Item({
				model:model, 
				path:'', 
				view:this, 
				parent:this, 
				level:0, 
				tagName:'li',
				tplId:'tpl-nav-child-item'
			});
			this.$el.append(v.render().el);
			this.first = this.first ? this.first : v;
		},
		start:function(){
			this.path && rainbow.route(this.path, {trigger: true});
			if(!this.model.get('_active')){
				rainbow.route(this.first.path, {trigger: true});
			}
		}
	});
	
	nav.request = function(path){
		var res = new Collection;
		res.fetch({
			success:function(collection, response, options){
				var view = new NavView({
					collection:collection,
					path:path
				});
				view.render();
				rainbow.start();
				view.start();
			},
			error:function(collection, response, options){
				alert(response.responseJSON.content);
				rainbow.start();
				rainbow.route('signin', {trigger: true});
			}
		});
	};
	
	return nav;
});