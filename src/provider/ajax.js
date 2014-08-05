define(function(require){
	
	var statusCode = {
		404: function() {
	      alert( "page not found" );
	    }
	};
	
	var ajax = function(id,url,options){
		$.ajax()
		.done(function(data,textStatus,jqXHR){
			
		})
		.fail(function(jqXHR,textStatus){
			alert('服务器异常');
		});
	};
	
	var current;
	ajax.view = function(id,url,options){
		current = id;
		$.ajax()
		.done(function(data,textStatus,jqXHR){
			if(current == id){
				
			}
		})
		.fail(function(jqXHR,textStatus){
			if(current == id){
				alert('服务器异常');
			}
		});
	};
});