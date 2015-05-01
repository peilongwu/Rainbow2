define(function(require){
	var Chart = require('app/widget/chart');
	var FusionChart = Chart.extend({
		initialize:function(options){
			Chart.prototype.initialize.apply(this, arguments);
		},
		render:function(){
			
		}
	});
	return FusionChart;
});