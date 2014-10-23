var UserDetail = function () {


    return {
        // main function to initiate the module
        init: function () {
        	$('#tab_1_1').addClass("active");
        	
        	$('#userPasswordForm').validate({
        		errorElement : 'span', //default input error message container
        		errorClass : 'help-block', // default input error message class
        		focusInvalid : false, // do not focus the last invalid input
        		rules : {
        			password : {
        				required : true,
        				rangelength : [ 8, 20 ]
        			},
        			newPassword : {
        				required : true,
        				rangelength : [ 8, 20 ]
        			},
        			reNewPassword : {
        				required : true,
        				equalTo : "#newPassword"
        			}
        		},

        		messages : {
        			password : {
        				required : "请输入旧密码.",
        				rangelength : jQuery.validator.format("密码长度介于 {0} 和 {1} 之间")

        			},
        			newPassword : {
        				required : "请输入新密码.",
        				rangelength : jQuery.validator.format("密码长度介于 {0} 和 {1} 之间")
        			},
        			reNewPassword : {
        				required : "请再次输入新密码.",
        				equalTo : "两次密码输入不一致"
        			}
        		},

        		invalidHandler : function(event, validator) { //display error alert on form submit   
        			toastr["error"]("校验未通过！");

        		},

        		highlight : function(element) { // hightlight error inputs
        			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        		},

        		success : function(label) {
        			label.closest('.form-group').removeClass('has-error');
        			label.remove();
        		},

        		errorPlacement : function(error, element) {
        			error.insertAfter(element.closest('.input-icon'));
        		},

        		submitHandler : function(form) {

        			var $form = $('#userPasswordForm');

        			$('.has-error').each(function() {
        				$(this).removeClass('has-error');
        			});

        			var data = $("#userPasswordForm").serializeArray();

        			$.ajax({
        				"url" : "/platformaccount/" + $('body').data("accountid") + '/user/password',
        				"type" : "PUT",
        				dataType : "json",
        				contentType : "application/json",
        				data : JSON.stringify(Custom.convertToJson(data)),
        				"success" : function(response) {
        					toastr["success"](response.globalMessage);

        				},
        				"error" : function(response) {
        					Custom.globalError(response);
        				}
        			});

        		}
        	});

        	$('#userPasswordForm input').keypress(function(e) {
        		if (e.which == 13) {
        			if ($('#userPasswordForm').validate().form()) {
        				$('#userPasswordForm').submit();
        			}
        			return false;
        		}
        	});
        }
    }
    
}();