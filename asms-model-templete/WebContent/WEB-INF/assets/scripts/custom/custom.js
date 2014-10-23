/**
Custom module for you to write your own javascript functions
**/
var Custom = function () {

    // private functions & variables
	
    var myFunc = function(text) {
        alert(text);
    }

    // public functions
    return {

        //main function
        init: function () {
            //initialize here something.
        	//初始化成功失败提示信息样式
        	toastr.options = {
			  closeButton: false,
			  debug: false,
			  positionClass: "toast-top-center",
			  onclick: null,
			  showDuration: "1000",
			  hideDuration: "1000",
			  timeOut: "5000",
			  extendedTimeOut: "1000",
			  showEasing: "swing",
			  hideEasing: "linear",
			  showMethod: "fadeIn",
			  hideMethod: "fadeOut"
			}
        },
        
        //公用基础ajax调用类
        ajax : function(object) {
        	$.ajax({
				url : "/platformaccount/" + $('body').data("accountid") + '/' + object.url,
				dataType : "json",
				contentType : "application/json",
				type : object.type,
				data : JSON.stringify(object.data),
				success : object.success,
				error : object.error	
			});
        },
        
        /**
         * 将表单对象转为json对象
         * @param formValues
         * @returns
         */
        convertToJson : function(formValues) {
        	var result = {};
        	for ( var formValue, j = 0; j < formValues.length; j++) {
        		formValue = formValues[j];
        		var name = formValue.name;
        		var value = formValue.value;
        		if (name.indexOf('.') < 0) {
        			result[name] = value;
        			continue;
        		} else {
        			var simpleNames = name.split('.');
        			// 构建命名空间
        			var obj = result;
        			for ( var i = 0; i < simpleNames.length - 1; i++) {
        				var simpleName = simpleNames[i];
        				if (simpleName.indexOf('[') < 0) {
        					if (obj[simpleName] == null) {
        						obj[simpleName] = {};
        					}
        					obj = obj[simpleName];
        				} else { // 数组
        					// 分隔
        					var arrNames = simpleName.split('[');
        					var arrName = arrNames[0];
        					var arrIndex = parseInt(arrNames[1]);
        					if (obj[arrName] == null) {
        						obj[arrName] = []; // new Array();
        					}
        					obj = obj[arrName];
        					multiChooseArray = result[arrName];
        					if (obj[arrIndex] == null) {
        						obj[arrIndex] = {}; // new Object();
        					}
        					obj = obj[arrIndex];
        				}
        			}

        			if (obj[simpleNames[simpleNames.length - 1]]) {
        				var temp = obj[simpleNames[simpleNames.length - 1]];
        				obj[simpleNames[simpleNames.length - 1]] = temp;
        			} else {
        				obj[simpleNames[simpleNames.length - 1]] = value;
        			}

        		}
        	}
        	return result;
        },
        
        //公用格式化String方法，例：Custom.stringFormat('a{0}c','b') 返回abc
        stringFormat : function() {
        	if( arguments.length == 0 )
                return null;

            var str = arguments[0]; 
            for(var i=1;i<arguments.length;i++) {
                var re = new RegExp('\\{' + (i-1) + '\\}','gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        },
        
        //公用根据值取数组下标方法，如果没有找到，返回-1
        arrayIndexOf : function(arr, value) {
        	for (var i = 0,length = arr.length; i < length; i++) {
        		if (arr[i] == value) {
        			return i;
        		}
        	}
        	return -1;
        },

        initIntro: function () {
        	
        	setInterval(function () {

        		var postMsg = {"pageable" : { "page" : 0, "size" : 5}}
        		
        		Custom.ajax({
					url : "messages",
					type : "POST",
					data : postMsg,
					success : function(response) {
						//初始化header里的InMessage提示
			        	var newInMessageCount = $('#header_inbox_bar .badge').text();
			        	
						if (newInMessageCount != response.payload.totalElements) {
                    		
							//newInMessageCount = response.payload.totalElements;
                    		
	                        $('.new-message-badge').text(response.payload.totalElements);
	                        $("#header_inbox_newmessagecount").text("您有 " + response.payload.totalElements +" 条新消息");
	                        
	                        if (newInMessageCount < response.payload.totalElements) { 
		                        $('#header_inbox_bar').pulsate({
		                            color: "#dd5131",
		                            repeat: 10
		                        });
		                        
	                    		$.extend($.gritter.options, {
	                                position: 'top-left'
	                            });

	                            var unique_id = $.gritter.add({
	                                // (string | mandatory) the heading of the notification
	                                title: '消息',
	                                // (string | mandatory) the text inside the notification
	                                text: '您有' + response.payload.totalElements + '条新消息！',
	                                // (bool | optional) if you want it to fade out on its own or just sit there
	                                sticky: true,
	                                // (int | optional) the time you want it to be alive for before fading out
	                                time: '',
	                                // (string | optional) the class name you want to apply to that specific message
	                                class_name: 'my-sticky-class'
	                            });

	                            setTimeout(function () {
	                                $.gritter.remove(unique_id, {
	                                    fade: true,
	                                    speed: 'slow'
	                                });
	                            }, 4000);
	                        }
	                        
	                        //确定inbox的高度
	                        if (response.payload.content.length == 0) {
	                        	$("#header_inbox").css("height","0px");
	                        	$(".inbox .slimScrollDiv").css("height","0px");
	                        } else if (response.payload.content.length == 1) {
	                        	$("#header_inbox").css("height","85px");
	                        	$(".inbox .slimScrollDiv").css("height","85px");
	                        } else if (response.payload.content.length == 2) {
	                        	$("#header_inbox").css("height","170px");
	                        	$(".inbox .slimScrollDiv").css("height","170px");
	                        } else {
	                        	$("#header_inbox").css("height","255px");
	                        	$(".inbox .slimScrollDiv").css("height","255px");
	                        }
	                        
	                        //生成inbox中的message
	                        var inbox_content = "";
	                        var inbox_content_template = 
	                        	"<li>" +
	                            "    <a href='{0}'>" +
	                            "        <span class='subject'>" +
	                            "           <span class='from'>" +
	                            "                 {1}" +
	                            "            </span>" +
	                            "            <span class='time'>" +
	                            "                 {2}" +
	                            "            </span>" +
	                            "        </span>" +
	                            "        <span class='message'>" +
	                            "             {3}" +
	                            "        </span>" +
	                            "    </a>" +
	                            "</li>";
	                        
	                        for (var i = 0; i <= response.payload.content.length -1; i++) {
	                        	inbox_content = inbox_content + 
	                        		Custom.stringFormat(inbox_content_template,
	                        			"#",
	                        			response.payload.content[i].subject,
	                        			response.payload.content[i].createtime,
	                        			response.payload.content[i].content.substr(0,30) + "...");
	                        }
	                        
	                        $("#header_inbox").html(inbox_content);
                    	}
					},
					error: function (jqXHR, textStatus, errorThrown) {
			            console.log("jqXHR: " + jqXHR.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
			        }
        		});
        	}, 60000);
        },
        
        globalError : function(response) {
        	toastr["error"](response.responseJSON.globalMessage);
    		for (var i = 0; i < response.responseJSON.errorMessageList.length; i++) {
    			var item = response.responseJSON.errorMessageList[i];
    			var element = $('#' + item.fieldName);
    			element.closest('.form-group').addClass('has-error');							
    			var icon = element.parent('.input-icon').children('i');		                    
                icon.attr("data-original-title", item.message).tooltip({'container': 'body'});
    		}
        }
    };

}();




