define(function(require){
	var Cell;
	var Row;
	var Header;
	var Body;
	
	var fixed = function(){
		
	};
	
	var Base = Backbone.View.extend({
		tagName:'div',
		initialize:function(){
			this.fixed = this.options.fixed;
		},
		render:function(){
			
		},
		renderHead:function(){
			
		},
		renderBody:function(){
			
		}
	});
	
	var Table = Base.extend({
		tplId:'tpl-content-table',
		initialize:function(){
			Base.prototype.initialize.apply(this, arguments);
			this.headCellTag = 'th';
		}
	});
	
	var List = Base.extend({
		tplId:'tpl-content-list',
		initialize:function(){
			Base.prototype.initialize.apply(this, arguments);
		}
	});
	
	var Content = {
		Table:Table,
		List:List
	};
	
	return Content;
});