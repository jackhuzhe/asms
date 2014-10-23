var Login = function () {

	var handleLogin = function() {
		$('.login-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                remember: {
	                    required: false
	                }
	            },

	            messages: {
	                username: {
	                    required: "Username is required."
	                },
	                password: {
	                    required: "Password is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	            
	        });

	        $('.login-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.login-form').validate().form()) {
	                    $('.login-form').submit();
	                }
	                return false;
	            }
	        });
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true,
	                    maxlength: 30
	                }
	            },

	            messages: {
	                email: {
	                	required: "请输入Email地址",
	                    email: "请输入正确的Email地址",
	                    maxlength: jQuery.validator.format("Email地址不能大于 {0} 个字符")
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	            	toastr["error"]("校验未通过！");
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (lable, element) {
	            	var icon = $(element).parent('.input-icon').children('i');
	                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
	            	//label.closest('.form-group').removeClass('has-error');
	                //label.remove();
	            },

	            errorPlacement: function (error, element) {
	                //error.insertAfter(element.closest('.input-icon'));
	            	var icon = $(element).parent('.input-icon').children('i');
                    icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
	            },

	            submitHandler: function (form) {
	            	var postMsg = {"email" : $("#find-password-email").val()}
	            	$.ajax({
    					url : "/password",
    					dataType : "json",
    					type : "PATCH",
    					contentType : "application/json",
    					data : JSON.stringify(postMsg),
    					success : function(response) {
    						toastr["success"](response.globalMessage);
    						jQuery('.login-form').show();
    			            jQuery('.forget-form').hide();
    					},
    					error: function (jqXHR, textStatus, errorThrown) {
    			            console.log("jqXHR: " + jqXHR.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
    						Custom.globalError(jqXHR);
    					}
	    				
    				});
	            }
	        });

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {
		
		$('.register-form').validate({
			errorElement: 'span', //default input error message container
	        errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                
                applicationName: {
                    required: true,
                    maxlength: 20
                },
                email: {
                    required: true,
                    email: true,
                    maxlength: 30
                },
                username: {
                    required: true,
                    maxlength: 20
                },
                password: {
                    required: true,
                    rangelength:[8,20]
                },
                rpassword: {
                    equalTo: "#register_password"
                },
                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
            	applicationName: {
                    required: "请输入接入系统名",
                    maxlength: jQuery.validator.format("接入系统名不能大于 {0} 个字符")
                },
                email: {
                    required: "请输入Email地址",
                    email: "请输入正确的Email地址",
                    maxlength: jQuery.validator.format("Email地址不能大于 {0} 个字符")
                },
                username: {
                    required: "请输入用户名",
                    maxlength: jQuery.validator.format("用户名不能大于 {0} 个字符")
                },
                password: {
                    required: "请输入密码",
                    rangelength: jQuery.validator.format("密码长度介于 {0} 和 {1} 之间")
                },
                rpassword: {
                    equalTo: "两次密码输入不一致"
                },
            	tnc: {
                    required: "请接受协议"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   
            	toastr["error"]("校验未通过！");
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (lable, element) {
            	var icon = $(element).parent('.input-icon').children('i');
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                //icon.removeClass("fa-warning").addClass("fa-check");
            },

            errorPlacement: function (error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    //error.insertAfter(element.closest('.input-icon'));
                	var icon = $(element).parent('.input-icon').children('i');
                    //icon.removeClass('fa-check').addClass("fa-warning");  
                    icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
                } else {
                	error.insertAfter(element);
                }
            },

            submitHandler: function (form) {
    			var postMsg = {"username" : $("#username").val(),
					"password" : $("#register_password").val(),
					"applicationName" : $("#applicationName").val(),
					"email" : $("#email").val() }
    			$.ajax({
					url : "/platformaccount",
					dataType : "json",
					contentType : "application/json",
					type : "POST",
					data : JSON.stringify(postMsg),
					success : function(response) {
						toastr["success"](response.globalMessage);
						jQuery('.login-form').show();
			            jQuery('.register-form').hide();
					},
					error: function (jqXHR, textStatus, errorThrown) {
			            console.log("jqXHR: " + jqXHR.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
						Custom.globalError(jqXHR);
					}
				
				});
            }
        });

		$('.register-form input').keypress(function (e) {
		    if (e.which == 13) {
		        if ($('.register-form').validate().form()) {
		            $('.register-form').submit();
		        }
		        return false;
		    }
		});

        jQuery('#register-btn').click(function () {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            handleForgetPassword();
            handleRegister();        
	       
	       	$.backstretch([
		        "assets/img/bg/1.jpg",
		        "assets/img/bg/2.jpg",
		        "assets/img/bg/3.jpg",
		        "assets/img/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		    });
        }

    };

}();