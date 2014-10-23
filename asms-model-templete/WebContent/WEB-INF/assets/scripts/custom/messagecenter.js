var MessageCenter = function () {
    return {

        //main function
        init: function () {
        	$('.message > .message-heading').click(function (e) {
                e.preventDefault();
                var el = $(this).closest(".message").children(".message-body");
                var toolIco = $(this).children(".message-tools");
                if (toolIco.hasClass("fa-angle-down")) {
                    toolIco.removeClass("fa-angle-down").addClass("fa-angle-up");
                    el.slideUp(200);
                } else {
                    toolIco.removeClass("fa-angle-up").addClass("fa-angle-down");
                    el.slideDown(200);
                    
                    //读新消息
                    if (!$(this).children(".message-status").hasClass("readed")) {
                    	var postMsg = {"id" : $(this).closest(".message").data("messageid") }
                    	Custom.ajax({
                    		url : "message/readed",
                    		type : "PUT",
                    		data : postMsg,
                    		success : function(response) {
                    			$(e.currentTarget).children(".message-status").addClass("readed");
                    		},
                    		error: function (jqXHR, textStatus, errorThrown) {
        			            console.log("jqXHR: " + jqXHR.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
        			        }
                    	});
                    }
                }
            });
        }

    };

}();
