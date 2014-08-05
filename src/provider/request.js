define(function(require){
	var request = {
		'get':function(){
			return ajax('GET');
		},
		'put':function(){
			return ajax('PUT');
		},
		'post':function(){
			return ajax('POST');
		},
		'delete':function(){
			return ajax('DELETE');
		},
		'file':function(){
			
		}
	};
	
	var ajax = function(type){
		
	};
	
	return request;
});