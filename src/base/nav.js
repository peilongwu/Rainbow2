define(function(require){
	var nav = {};
	var ViewModel = require('../component/view/model');
	var Model = Backbone.Model.extend({
		idAttribute:'id'
	});
	
	var Collection = Backbone.Collection.extend({
		url:'http://www.glosea.com/admin/res',
		model:Model
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
			this.path += this.model.get('code');
			this.tplId = options.tplId ? options.tplId : this.tplId;
			this.parent = options.parent;
			this.level = options.level;
			this.collection = new Backbone.Collection(this.model.get('childs'));
			this.parent.model.on('change:_active',function(){
				if(this.parent.model.get('_active') !== this.model.id ){
					this.$el.removeClass('active') ;
				}
			},this);
		},
		route:function(){
			var name = this.path;
			var res = this;
			if('signout' !== name){
				rainbow.router.route(name + '*path',function(path){
					console.log(res.path + ': OK -------' + path);
					res.onActive(path);
				});
			}
			return '#' + name;
		},
		render:function(){
			this.$el.attr('href',this.route());
			this.$el.html(_.template(
				$('#' + this.tplId).html(),
				this.model.toJSON()
			));
			return this;
		},
		renderChild:function(model,i){
			var v = new Item({
				model:model, path:this.path, parent:this,
				tplId:'tpl-nav-child-item',tagName:'li',className:'',
				level:this.level + 1
			});
			
			$('.J-nav-child').append(v.render().el);
			v.$('a').attr('href',v.$el.attr('href'));
			this.first = this.first ? this.first : v;
			if(this.childPath === v.model.get('code')){
				v.onActive();
			}
		},
		onActive:function(childPath){
			this.childPath = childPath ? childPath.split('/')[1] : childPath;
			this.parent.model.set('_active',this.model.id);
			this.$el.addClass('active');
			if(1 === this.level){
				$('.J-nav-child').empty();
			}
			
			if(this.collection.length > 0){
				this.collection.each(this.renderChild,this);
				childPath || rainbow.route(this.first.path, {trigger: true});
			}else if(this.model.get('action')){
				this.loadView();
			}
			
			this.childPath = null;
		},
		loadView:function(){
			var view = new ViewModel;
			view.url = this.model.get('action');
			view.request(this);
		},
		onClick:function(e){
			rainbow.route(this.path, {trigger: true});
			event.preventDefault();
		}
	});
	
	var NavView = Backbone.View.extend({
		tagName:'div',
		className:'list-group',
		initialize:function(options){
			this.model = new Backbone.Model;
		},
		render:function(){
			$('.side').empty();
			this.$el.appendTo('.side');
			this.collection.each(this.renderItem,this);
			return this;
		},
		renderItem:function(model,i){
			var v = new Item({model:model, path:'', parent:this, level:1});
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
			error:function(){
				
			}
		});
	};
	
	return nav;
});