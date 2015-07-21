define(function(require){
	var Base = require('./base');
	var Standard = Base.extend({
		tplId:'tpl-view-nested',
		initialize:function(options){
			Base.prototype.initialize.apply(this, arguments);
			this.level = options.level ? this.level : 1;
		},
		exit:function(e){
			this.destroy();
			this.mainView.show();
			e.stopPropagation();
			e.preventDefault();
		}
});