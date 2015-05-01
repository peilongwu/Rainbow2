define(function(require){
	var Widget = require('./widget');
	var Webkit = Widget.extend({
		initialize:function(options){
			Widget.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			Widget.prototype.render.apply(this, arguments);
			return this;
		},
		tooltip:function(){
			$('[data-toggle="tooltip"]').tooltip();
			return this;
		},
		display:function(){
			this.model.get('tooltip') && this.tooltip();
			return this;
		}
	});
	return Webkit;
});