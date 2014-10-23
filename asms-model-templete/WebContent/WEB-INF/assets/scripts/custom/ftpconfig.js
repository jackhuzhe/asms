var FtpConfig = function () {
    return {

        //main function
        init: function () {
        	$('#description').maxlength({
	            limitReachedClass: "label label-danger",
	            threshold: 20
	        });
					
        	$('#address').ipAddress();
        	
        	$("#address").blur(function(){
        		  var ip = $("#address").attr("value");
        		  if ( ip == "___.___.___.___"){
        			  $("#address").attr("value", "");
        		  }
        		});
					
			$("#port").inputmask({
	            "mask": "9",
	            "repeat": 5,
	            "greedy": true
	        });
					
			$('#spinner-reconnect').spinner({value:5, min: 0, max: 10});
        	$('#spinner-concurrentCount').spinner({value:1, min: 1, max: 10});  
        }

    };

}();
