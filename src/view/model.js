define(function(require){
	var View = require('./view');
	var Model = Backbone.Model.extend({
		idAttribute:'id',
		initialize:function(options){
			this.res = null;
			this.view = null;
			this.filter = new Backbone.Model;
			this.filter.on('change', this.request, this);
		},
		request:function(res){
			//this.res = res ? res : this.res;
			var _this = this;
			this.fetch({
				success:function(model, response, options){
					model.display();
				},
				error:function(model, response, options){
					var error = response.responseJSON;
					if(error && error.type === 'unauthorized'){
						alert(error.content);
						return rainbow.route('signin', {trigger: true});
					}
					rainbow.alert('REQUEST_ERROR');
				},
				data:_.extend(
					this.filter.toJSON(),
					{_time:new Date().getTime()}
				)
			});
			return this;
		},
		display:function(){
			if(this.get('extend')){
				this.extend(this.get('extend'));
			}else{
				!this.view && this.createView();
				this.view && this.view.setCollection() && this.view.update();
			}
			return this;
		},
		extend:function(view){
			var _this = this;
			require(['../../js/view/' + view], function(view){
				view.apply(_this);
			});
		},
		createView:function(){
			var type = this.get('type');
			type = type 
				? type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase() 
					: 'Standard';
			var v = new View[type]({
				model: this,
				res: this.res,
				coms: View,
				attributes:{
					id: 'view-' + this.id
				}
			});
			this.$body
				.removeClass('loading')
				.empty()
				.append(v.el);
			rainbow.current = v;
			this.view = v;
			this.view.render();
			return this;
		}
	});
	return Model;
});