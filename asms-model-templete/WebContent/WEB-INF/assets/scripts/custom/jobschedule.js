var JobSchedule = function(accountId, scheduleid) {
	return {

		// main function
		init : function(accountId, scheduleid) {

			// $("input#status").at
			// var a= ${scheduleType};

			// for Select of cronExpression ordinary setting
			$("#weekly").select2({

				tags : [ "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ]
			});
			$("#monthly").select2(
					{

						tags : [ "1号", "2号", "3号", "4号", "5号", "6号", "7号",
								"8号", "9号", "10号", "11号", "12号", "13号", "14号",
								"15号", "16号", "17号", "18号", "19号", "20号",
								"21号", "22号", "23号", "24号", "25号", "26号",
								"27号", "28号", "29号", "30号", "31号", "最后一天" ]
					});

			$("#yearly").select2(
					{

						tags : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月",
								"8月", "9月", "10月", "11月", "12月" ]
					});
			// for Radio of cronExpression ordinary setting
			$("input#alldayOfweek").on(
					'change',
					function() {
						if (this.checked) {
							$("div#s2id_weekly").find(
									"li.select2-search-choice").remove();
							$("#weekly").attr("value", "");
							$("#weekly").attr("disabled", "true");
						} else {
							$("#weekly").attr("value", "");
							$("#weekly").removeAttr("disabled");
						}

					});
			$("input#alldayOfmonth").on(
					'change',
					function() {
						if (this.checked) {
							$("div#s2id_monthly").find(
									"li.select2-search-choice").remove();
							$("#monthly").attr("value", "");
							$("#monthly").attr("disabled", "true");
						} else {
							$("#monthly").attr("value", "");
							$("#monthly").removeAttr("disabled");
						}

					});
			$("input#allmonthOfyear").on(
					'change',
					function() {
						if (this.checked) {
							$("div#s2id_yearly").find(
									"li.select2-search-choice").remove();
							$("#yearly").attr("value", "");
							$("#yearly").attr("disabled", "true");
						} else {
							$("#yearly").attr("value", "");
							$("#yearly").removeAttr("disabled");
						}

					});
			// for timepicker of cronExpression ordinary setting
			$('.timepicker-24').timepicker({
				autoclose : true,
				minuteStep : 5,
				showSeconds : true,
				showMeridian : false,
				defaultTime : ''
			});
			// handle input group button click
			$('.timepicker').parent('.input-group').on(
					'click',
					'.input-group-btn',
					function(e) {
						e.preventDefault();
						$(this).parent('.input-group').find('.timepicker')
								.timepicker('showWidget');
					});

			// for create JobSchedule
			$.ajax({
				url : "/platformaccount/" + accountId + "/jobschedule/new",
				type : "POST",
				data : '{}',
				dataType : 'json',
				contentType : 'application/json',
				traditional : true,
				success : function(data) {
					var optionstring = "";
					var vv = "";

					// alert($(selectedJob));
					for ( var i in data) {
						var jsonObj = eval(data[i]);
						for ( var j = 0; j < jsonObj.length; j++) {
							var jj = jsonObj[j];
							vv = jj.id;
							optionstring += "<option value=\"" + jj.id + "\">"
									+ "" + jj.type + "</option>";

						}

					}
					$("select#id").html(optionstring);

				},
				error : function(response) {
					// alert(response.status);
					// alert(response.readyState);
				}

			});

			// for time of ordinary Setting
			function formatStr(valuestr, str) {
				var arrayValue = valuestr.split(str);
				for ( var j = 0; j < arrayValue.length; j++) {
					if (arrayValue[j].length == 2) {
						if (arrayValue[j].substring(0, 1) == '0') {
							arrayValue[j] = arrayValue[j].substring(1, 2);
						}
					}
				}
				return arrayValue;
			}

function CronExpressionValidator() {
			}
			// ----------------------------------
			// convertDays 静态方法;
			// ----------------------------------
			CronExpressionValidator.convertDaysToInteger = function(value) {
				var v = value;
				v = v.replace(/SUN/gi, "1");
				v = v.replace(/MON/gi, "2");
				v = v.replace(/TUE/gi, "3");
				v = v.replace(/WED/gi, "4");
				v = v.replace(/THU/gi, "5");
				v = v.replace(/FRI/gi, "6");
				v = v.replace(/SAT/gi, "7");
				return v;
			}

			CronExpressionValidator.convertMonthsToInteger = function(value) {
				var v = value;
				v = v.replace(/JAN/gi, "1");
				v = v.replace(/FEB/gi, "2");
				v = v.replace(/MAR/gi, "3");
				v = v.replace(/APR/gi, "4");
				v = v.replace(/MAY/gi, "5");
				v = v.replace(/JUN/gi, "6");
				v = v.replace(/JUL/gi, "7");
				v = v.replace(/AUG/gi, "8");
				v = v.replace(/SEP/gi, "9");
				v = v.replace(/OCT/gi, "10");
				v = v.replace(/NOV/gi, "11");
				v = v.replace(/DEC/gi, "12");
				return v;
			}
			function cronValidate(cronExpression){   
		        //alert("校验函数的开始！");  
				cronExpression=cronExpression.toUpperCase();
				cronExpression = cronExpression.replace(
						/(^\s*)|(\s*$)/g, "");
		        var cronParams = cronExpression.split(" ");   
		  
		        if (cronParams.length < 6 || cronParams.length > 7) {   
		            return false;   
		        }   
		  
		        //CronTrigger cronTrigger = new CronTrigger();   
		        //cronTrigger.setCronExpression( cronExpression );   
		  
		        if (cronParams[3] == "?" || cronParams[5]=="?") {   
		            //Check seconds param   
		            if (!checkSecondsField(cronParams[0])) {   
		                return false;   
		            }   
		  
		            //Check minutes param   
		            if (!checkMinutesField(cronParams[1])) {   
		                return false;   
		            }   
		  
		            //Check hours param   
		            if (!checkHoursField(cronParams[2])) {   
		                return false;   
		            }   
		  
		            //Check day-of-month param   
		            if (!checkDayOfMonthField(cronParams[3])) {   
		                return false;   
		            }   
		  
		            //Check months param   
		            if (!checkMonthsField(cronParams[4])) {   
		                return false;   
		            }   
		  
		            //Check day-of-week param   
		            if (!checkDayOfWeekField(cronParams[5])) {   
		                return false;   
		            }   
		  
		            //Check year param   
		            if (cronParams.length == 7) {   
		                if (!checkYearField(cronParams[6])) {   
		                    return false;   
		                }   
		            }   
		  
		            return true;   
		        } else {   
		            return false;   
		        }   
		    }   
		  
		    function checkSecondsField(secondsField) {   
		        return checkField(secondsField, 0, 59);   
		    }   
		  
		  
		    function checkField(secondsField, minimal, maximal) {   
		        if (secondsField.indexOf("-") > -1 ) {   
		            var startValue = secondsField.substring(0, secondsField.indexOf( "-" ));  
		            var endValue="";
		            var increment="";
		            if(secondsField.indexOf("/") > -1){
		            	endValue = secondsField.substring(secondsField.indexOf( "-" ) + 1,secondsField.indexOf( "/" )); 
		            	increment=secondsField.substring(secondsField.indexOf( "/" )+1); 
		            }else{
		            	endValue = secondsField.substring(secondsField.indexOf( "-" ) + 1); 	
		            }
		               
		            if(increment!=""&&!checkIntValue(increment, minimal, maximal, true)){
		            	return false;
		            }
		            if (!(checkIntValue(startValue, minimal, maximal, true) && checkIntValue(endValue, minimal, maximal, true))) {   
		                return false;   
		            }   
		            try {   
		                var startVal = parseInt(startValue, 10);   
		                var endVal = parseInt(endValue, 10);   
		  
		                return endVal > startVal;   
		            } catch (e) {   
		                return false;   
		            }   
		        } else if (secondsField.indexOf(",") > -1) {   
		            return checkListField(secondsField, minimal, maximal);   
		        } else if (secondsField.indexOf( "/" ) > -1) {   
		            return checkIncrementField( secondsField, minimal, maximal );   
		        } else if (secondsField.indexOf( "*" ) != -1) {   
		            return true;   
		        } else {   
		            return checkIntValue(secondsField, minimal, maximal);   
		        }   
		    }   
		  
		    function checkIntValue(value, minimal, maximal, checkExtremity) {   
		        try {   
		            var val = parseInt(value, 10);   
		            //判断是否为整数   
		            if (value == val) {   
		                if (checkExtremity) {   
		                    if (val < minimal || val > maximal) {   
		                        return false;   
		                    }   
		                }   
		  
		                return true;   
		            }   
		  
		            return false;   
		        } catch (e) {   
		            return false;   
		        }   
		    }   
		  
		    function checkMinutesField(minutesField) {   
		        return checkField(minutesField, 0, 59);   
		    }   
		  
		    function checkHoursField(hoursField) {   
		        return checkField(hoursField, 0, 23);   
		    }   
		  
		    function checkDayOfMonthField(dayOfMonthField) {   
		        if (dayOfMonthField == "?") {   
		            return true;   
		        }   
		  
		        if (dayOfMonthField.indexOf("L") >= 0) {   
		            return checkFieldWithLetter(dayOfMonthField, "L", 1, 7, -1, -1);   
		        } else if ( dayOfMonthField.indexOf("W") >= 0) {   
		            return checkFieldWithLetter(dayOfMonthField, "W", 1, 31, -1, -1);   
		        } else if (dayOfMonthField.indexOf("C") >= 0) {   
		            return checkFieldWithLetter(dayOfMonthField, "C", 1, 31, -1, -1);   
		        } else {   
		            return checkField( dayOfMonthField, 1, 31 );   
		        }   
		    }   
		  
		  
		    function checkMonthsField(monthsField) {   

		  
		        monthsField.replace("JAN", "1");   
		        monthsField.replace("FEB", "2");   
		        monthsField.replace("MAR", "3");   
		        monthsField.replace("APR", "4");   
		        monthsField.replace("MAY", "5");   
		        monthsField.replace("JUN", "6");   
		        monthsField.replace("JUL", "7");   
		        monthsField.replace("AUG", "8");   
		        monthsField.replace("SEP", "9");   
		        monthsField.replace("OCT", "10");   
		        monthsField.replace("NOV", "11");   
		        monthsField.replace("DEC", "12");   
		  
		        return checkField(monthsField, 1, 31);   
		    }   
		  
		    function checkDayOfWeekField(dayOfWeekField) {   
	
		  
		        dayOfWeekField.replace("SUN", "1" );   
		        dayOfWeekField.replace("MON", "2" );   
		        dayOfWeekField.replace("TUE", "3" );   
		        dayOfWeekField.replace("WED", "4" );   
		        dayOfWeekField.replace("THU", "5" );   
		        dayOfWeekField.replace("FRI", "6" );   
		        dayOfWeekField.replace("SAT", "7" );           
		  
		        if (dayOfWeekField == "?") {   
		            return true;   
		        }   
		  
		        if (dayOfWeekField.indexOf("L") >= 0) {   
		            return checkFieldWithLetter(dayOfWeekField, "L", 1, 7, -1, -1);   
		        } else if (dayOfWeekField.indexOf("C") >= 0) {   
		            return checkFieldWithLetter(dayOfWeekField, "C", 1, 7, -1, -1);   
		        } else if (dayOfWeekField.indexOf("#") >= 0) {   
		            return checkFieldWithLetter(dayOfWeekField, "#", 1, 7, 1, 5);   
		        } else {   
		            return checkField(dayOfWeekField, 1, 7);   
		        }   
		    }   
		  
		    function checkYearField(yearField) {   
		        return checkField(yearField, 1970, 2099);   
		    }   
		  
		  
		    function checkFieldWithLetter(value, letter, minimalBefore, maximalBefore,   
		                                          minimalAfter, maximalAfter) {   
		        var canBeAlone = false;   
		        var canHaveIntBefore = false;   
		        var canHaveIntAfter = false;   
		        var mustHaveIntBefore = false;   
		        var mustHaveIntAfter = false;   
		  
		        if (letter == "L") {   
		            canBeAlone = true;   
		            canHaveIntBefore = true;   
		            canHaveIntAfter = false;   
		            mustHaveIntBefore = false;   
		            mustHaveIntAfter = false;   
		        }   
		        if (letter == "W" || letter == "C") {   
		            canBeAlone = false;   
		            canHaveIntBefore = true;   
		            canHaveIntAfter = false;   
		            mustHaveIntBefore = true;   
		            mustHaveIntAfter = false;   
		        }   
		        if (letter == "#") {   
		            canBeAlone = false;   
		            canHaveIntBefore = true;   
		            canHaveIntAfter = true;   
		            mustHaveIntBefore = true;   
		            mustHaveIntAfter = true;   
		        }   
		  
		        var beforeLetter = "";   
		        var afterLetter = "";   
		  
		        if (value.indexOf(letter) >= 0 ) {   
		            beforeLetter = value.substring( 0, value.indexOf(letter));   
		        }   
		  
		        if (value.substring(value.length-1)!=letter) {   
		            afterLetter = value.substring( value.indexOf( letter ) + 1 );   
		        }   
		  
		        if (value.indexOf(letter) >= 0) {   
		            if (letter == value) {   
		                return canBeAlone;   
		            }   
		  
		            if (canHaveIntBefore) {   
		                if (mustHaveIntBefore && beforeLetter.length == 0) {   
		                    return false;   
		                }   
		  
		                if (!checkIntValue(beforeLetter, minimalBefore, maximalBefore, true)){   
		                    return false;   
		                }   
		            } else {   
		                if (beforeLetter.length > 0 ) {   
		                    return false;   
		                }   
		            }   
		  
		            if (canHaveIntAfter) {   
		                if ( mustHaveIntAfter && afterLetter.length == 0 ) {   
		                    return false;   
		                }   
		  
		                if (!checkIntValue(afterLetter, minimalAfter, maximalAfter, true)) {   
		                    return false;   
		                }   
		            } else {   
		                if (afterLetter.length > 0) {   
		                    return false;   
		                }   
		            }   
		        }   
		  
		        return true;   
		    }   
		  
		/*    function checkIntValue(value, minimal, maximal) {  
		        return checkIntValue(value, minimal, maximal, true);  
		    } */  
		  
		    function checkIncrementField(value, minimal, maximal) {   
		        var start = value.substring(0, value.indexOf("/"));   
		  
		        var increment = value.substring(value.indexOf("/") + 1);   
		  
		        if (!("*" == start)) {   
		            return checkIntValue(start, minimal, maximal, true) && checkIntValue(increment, minimal, maximal, false);   
		        } else {   
		            return checkIntValue(increment, minimal, maximal, true);   
		        }   
		    }   
		  
		  
		  
		    function checkListField(value, minimal, maximal ) {   
		        var st = value.split(",");   
		  
		        var values = new Array(st.length);   
		  
		        for(var j = 0; j < st.length; j++) {   
		            values[j] = st[j];   
		        }   
		  
		        var previousValue = -1;   
		  
		        for (var i= 0; i < values.length; i++) {   
		            var currentValue = values[i];   
		  
		            if (!checkIntValue(currentValue, minimal, maximal, true)) {   
		                return false;   
		            }   
		  
		            try {   
		                var val = parseInt(currentValue, 10);   
		  
		                if (val <= previousValue) {   
		                    return false;   
		                } else {   
		                    previousValue = val;   
		                }   
		            } catch (e) {   
		                // we have always an int   
		            }   
		        }   
		  
		        return true;   
		    }  


			// submit 提交所有的数据
			$('button#allsubmit')
					.bind(
							'click',
							function(e) {
								e.preventDefault();
								// form.validate().element($('#scheduleName'));
								var validstatus = true;
								// validator base information:
								if ($('input#scheduleName').attr("value") == "") {
									addErrorMessage("scheduleNameMessage");
									addErrorFlag("scheduleNamediv", null)
									validstatus = false;
								} else {
									removeErrorMessage("scheduleNameMessage");
									removeErrorFlag("scheduleNamediv", null)
								}

								if (scheduleid == "") {
									var selectvalue = $('div#s2id_id > a > span.select2-chosen')[0].outerText
											.toString();
									selectvalue = selectvalue.replace(
											/(^\s*)|(\s*$)/g, "");
									if (selectvalue == "") {
										addErrorMessage("jobidmessage");
										addErrorFlag("jobiddiv", null);
										addErrorFlag("s2id_autogen3", null);
										validstatus = false;
									} else {
										removeErrorMessage("jobidmessage");
										removeErrorFlag("jobiddiv", null);
										removeErrorFlag("s2id_autogen3", null);
									}
								}

								if ($('div#ordinarysetting').hasClass("active")) {
									var a = checkOrdinaryValid();
									if (!a) {
										validstatus = false;
									}
								} else {
									var a = cronValidate($(
													'input#cronExpression')
													.attr("value"))
									if (!a) {
										addErrorMessage("cronExpressionMessage");
										addErrorFlag("cronExpressiondiv", null);
										validstatus = false;
									} else {
										removeErrorMessage("cronExpressionMessage");
										removeErrorFlag("cronExpressiondiv",
												null);
									}

								}
								if (!validstatus) {
									return;
								}

								// for depend list
								var array = new Array();
								var jobDependOns = new Array();
								var paramlist = new Array();
								var depends = $('#dependon_ajax');
								var childs = depends.children("tbody")[0].children;
								if (childs.length > 0) {
									for ( var j = 0; j < childs.length; j++) {
										if (childs[j].id != "") {
											array[j] = childs[j].id;
										}
									}
								}

								var data = $("#jobScheduleForm")
										.serializeArray();
								var data1 = Custom.convertToJson(data);
								// var data2=JSON.stringify(data1);

								for ( var j = 0; j < array.length; j++) {

									jobDependOns[j] = {
										"jobScheduleId" : scheduleid,
										"jobDependOnId" : array[j]
									};
								}

								data1["jobDependOns"] = jobDependOns;

								var params = $('div#params').find("input");

								for ( var j = 0; j < params.length; j++) {
									var key = params[j].getAttribute("key");
									paramlist[j] = {
										"id" : params[j].id,
										"jobInstanceId" : scheduleid,
										"key" : key,
										"value" : params[j].value
									};
								}
								data1["jobParams"] = paramlist;

								if ($('div#ordinarysetting').hasClass("active")) {
									data1["scheduleType"] = "NORMAL";
									data1["time"] = $("input#daily").attr(
											"value");
									if (!$("input#alldayOfweek")[0].checked) {
										data1["dayOfWeek"] = $('input#weekly')
												.attr('value');
									} else {
										data1["dayOfWeek"] = "ALL";
									}
									if (!$("input#alldayOfmonth")[0].checked) {
										data1["dayOfMonth"] = $('input#monthly')
												.attr('value');
									} else {
										data1["dayOfMonth"] = "ALL";
									}
									if (!$("input#allmonthOfyear")[0].checked) {
										data1["month"] = $('input#yearly')
												.attr('value');
									} else {
										data1["month"] = "ALL";
									}
									data1["scheduleTime"] = getOrdinaryDesc();

								} else {
									data1["scheduleType"] = "USERDEFINED";
									data1["cronExpression"] = $(
											'input#cronExpression').attr(
											"value");

									data1["scheduleTime"] = translateCronExpression($(
											'input#cronExpression').attr(
											"value"));

								}

								var data3 = JSON.stringify(data1);
								var method = "POST";
								if (scheduleid != '') {
									method = "PUT";
								}
								$
										.ajax({
											"url" : "/platformaccount/"
													+ accountId
													+ "/jobschedule",
											"type" : method,
											dataType : "json",
											contentType : "application/json",
											data : data3,
											"success" : function(response) {
												toastr["success"]
														(response.globalMessage);

												window.location.href = "/platformaccount/"
														+ accountId
														+ "/jobschedules";

											},
											"error" : function(response) {
												Custom.globalError(response);
											}
										});

							});

			function addErrorMessage(message) {
				if ($("#" + message).hasClass("hidden")) {
					$("#" + message).removeClass("hidden");
				}
			}

			function addErrorFlag(divname, select2div) {
				if (!$("div#" + divname).hasClass("has-error")) {
					$("div#" + divname).addClass("has-error");
				}
				if (select2div != null) {
					if ($('#' + select2div).css("border-left-style") == "none") {
						select2BorderStyleError(select2div);
					}
				}
			}

			function removeErrorMessage(message) {
				if (!$("#" + message).hasClass("hidden")) {
					$("#" + message).addClass("hidden");
				}
			}

			function removeErrorFlag(divname, select2div) {
				if ($("div#" + divname).hasClass("has-error")) {
					$("div#" + divname).removeClass("has-error");
				}
				if (select2div != null) {
					if ($('#' + select2div).css("border-left-style") == "solid") {
						select2BorderStyleNoError(select2div);
					}
				}
			}

			function select2BorderStyleError(select2div) {
				$('#' + select2div).css("border-left-style", "solid");
				$('#' + select2div).css("border-left-width", "1px");
				$('#' + select2div)
						.css("border-left-color", "rgb(185, 74, 72)");
				$('#' + select2div).css("border-right-style", "solid");
				$('#' + select2div).css("border-right-width", "1px");
				$('#' + select2div).css("border-right-color",
						"rgb(185, 74, 72)");
				$('#' + select2div).css("border-bottom-style", "solid");
				$('#' + select2div).css("border-bottom-width", "1px");
				$('#' + select2div).css("border-bottom-color",
						"rgb(185, 74, 72)");
				$('#' + select2div).css("border-top-style", "solid");
				$('#' + select2div).css("border-top-width", "1px");
				$('#' + select2div).css("border-top-color", "rgb(185, 74, 72)");
			}
			function select2BorderStyleNoError(select2div) {
				$('#' + select2div).css("border-left-style", "none");
				$('#' + select2div).css("border-left-width", "0px");
				$('#' + select2div).css("border-left-color", "rgb(51, 51, 51)");
				$('#' + select2div).css("border-right-style", "none");
				$('#' + select2div).css("border-right-width", "0px");
				$('#' + select2div)
						.css("border-right-color", "rgb(51, 51, 51)");
				$('#' + select2div).css("border-bottom-style", "none");
				$('#' + select2div).css("border-bottom-width", "0px");
				$('#' + select2div).css("border-bottom-color",
						"rgb(51, 51, 51)");
				$('#' + select2div).css("border-top-style", "none");
				$('#' + select2div).css("border-top-width", "0px");
				$('#' + select2div).css("border-top-color", "rgb(51, 51, 51)");
			}
			function checkOrdinaryValid() {
				var valid = true;
				var time = $("input#daily").attr("value");
				var dayOfWeek = $('input#weekly').attr('value');
				var dayOfMonth = $('input#monthly').attr('value');
				var month = $('input#yearly').attr('value');
				if (time == "") {

					addErrorMessage("dailymessage");
					addErrorFlag("dailydiv", null);
					valid = false;
				} else {
					removeErrorMessage("dailymessage");
					removeErrorFlag("dailydiv", null);
				}
				if (month == "" && !$("input#allmonthOfyear")[0].checked) {

					addErrorMessage("yearlymessage");
					addErrorFlag("yearlydiv", "s2id_yearly");
					valid = false;

				} else {
					removeErrorMessage("yearlymessage");
					removeErrorFlag("yearlydiv", "s2id_yearly");

				}

				if (dayOfWeek == "" && !$("input#alldayOfweek")[0].checked) {

					removeErrorMessage("weeklymessageConflict");
					removeErrorMessage("monthlymessageConflict");
					addErrorMessage("weeklymessage");
					addErrorFlag("weeklydiv", "s2id_weekly");

					valid = false;
				} else {
					removeErrorMessage("weeklymessage");
					removeErrorFlag("weeklydiv", "s2id_weekly");
				}

				if (dayOfMonth == "" && !$("input#alldayOfmonth")[0].checked) {

					removeErrorMessage("weeklymessageConflict");
					removeErrorMessage("monthlymessageConflict");
					addErrorMessage("monthlymessage");
					addErrorFlag("monthlydiv", "s2id_monthly");

					valid = false;
				} else {
					removeErrorMessage("monthlymessage");
					removeErrorFlag("monthlydiv", "s2id_monthly");
				}

				if (dayOfWeek != "" && dayOfMonth != "") {

					removeErrorMessage("weeklymessage");
					removeErrorMessage("monthlymessage");
					addErrorMessage("weeklymessageConflict");
					addErrorMessage("monthlymessageConflict");
					addErrorFlag("weeklydiv", "s2id_weekly");
					addErrorFlag("monthlydiv", "s2id_monthly");
					valid = false;
				}
				return valid;

			}
			function getOrdinaryDesc() {
				var a = "";
				var month = $('input#yearly').attr('value');
				var time = $("input#daily").attr("value");
				var dayOfWeek = $('input#weekly').attr('value');
				var dayOfMonth = $('input#monthly').attr('value');
				if (month != "") {
					a += "每年 ";
					a += month;
				}
				if (dayOfMonth != "") {
					a += "每月 ";
					a += dayOfMonth;
				}
				if (dayOfWeek != "") {
					a += "每周 ";
					a += dayOfWeek;
				}
				var arrayTime = formatStr(time, ":");
				a += "每天" + arrayTime[0] + "时" + arrayTime[1] + "分"
						+ arrayTime[2] + "秒";
				return a;
			}

			$('button#checkordinarysetting').bind('click', function() {

				if (checkOrdinaryValid()) {
					var desc = getOrdinaryDesc();
					document.getElementById("ordinaryDesc").innerText = desc;
					document.getElementById("ordinaryDesc").textContent = desc;
				} else {
					document.getElementById("ordinaryDesc").innerText = "";
					document.getElementById("ordinaryDesc").textContent = "";
				}

			});
			function convertIntegerToDays(value) {
				var v = value;
				v = v.replace(/1/gi, "天");
				v = v.replace(/2/gi, "一");
				v = v.replace(/3/gi, "二");
				v = v.replace(/4/gi, "三");
				v = v.replace(/5/gi, "四");
				v = v.replace(/6/gi, "五");
				v = v.replace(/7/gi, "六");

				return v;
			}
			function commonTranslate(value, type) {
				value = CronExpressionValidator.convertDaysToInteger(value);
				value = CronExpressionValidator.convertMonthsToInteger(value);
				value = value.toUpperCase();
				var str = "";
				var array;
				if (value.indexOf("*") == -1 && value.indexOf("?") == -1) {
					array = value.split(",");
					for ( var j = 0; j < array.length; j++) {
						if (array[j].indexOf("-") != -1) {
							var index = array[j].indexOf("-");
							var index2 = -1;
							if (array[j].indexOf("/") != -1) {
								index2 = array[j].indexOf("/");
							}
							if (type != "星期") {
								if (index2 == -1) {
									var num1 = Number(array[j].substring(0,
											index));
									var num2 = Number(array[j]
											.substring(index + 1));
									if (num1 <= num2) {

										str += array[j].substring(0, index)
												+ type + "到"
												+ array[j].substring(index + 1)
												+ type + "每" + type;
									} else {
										str += array[j].substring(index + 1)
												+ type + "到"
												+ array[j].substring(0, index)
												+ type + "每" + type;
									}

								} else {
									var num1 = Number(array[j].substring(0,
											index));
									var num2 = Number(array[j].substring(
											index + 1, index2));
									if (num1 <= num2) {
										str += array[j].substring(0, index)
												+ type
												+ "到"
												+ array[j].substring(index + 1,
														index2)
												+ type
												+ "每隔"
												+ array[j]
														.substring(index2 + 1)
												+ type;
									} else {
										str += array[j].substring(index + 1,
												index2)
												+ type
												+ "到"
												+ array[j].substring(0, index)
												+ type
												+ "每隔"
												+ array[j]
														.substring(index2 + 1)
												+ type;
									}

								}

							} else {
								if (index2 == -1) {
									var num1 = Number(array[j].substring(0,
											index));
									var num2 = Number(array[j]
											.substring(index + 1));
									if (num1 <= num2 && num1 >= 2) {
										str += "星期"
												+ convertIntegerToDays(array[j]
														.substring(0, index))
												+ "到"
												+ "星期"
												+ convertIntegerToDays(array[j]
														.substring(index + 1))
												+ "每天";
									} else {
										str += "星期"
												+ convertIntegerToDays(array[j]
														.substring(0, index))
												+ "到"
												+ "下周的星期"
												+ convertIntegerToDays(array[j]
														.substring(index + 1))
												+ "每天";
									}
								} else {
									var num1 = Number(array[j].substring(0,
											index));
									var num2 = Number(array[j].substring(
											index + 1, index2));
									if (num1 <= num2 && num1 >= 2) {
										str += "星期"
												+ convertIntegerToDays(array[j]
														.substring(0, index))
												+ "到"
												+ "星期"
												+ convertIntegerToDays(array[j]
														.substring(index + 1,
																index2))
												+ "每隔"
												+ array[j]
														.substring(index2 + 1)
												+ "天";
									} else {
										str += "星期"
												+ convertIntegerToDays(array[j]
														.substring(0, index))
												+ "到"
												+ "下周的星期"
												+ convertIntegerToDays(array[j]
														.substring(index + 1,
																index2))
												+ "每隔"
												+ array[j]
														.substring(index2 + 1)
												+ "天";
									}
								}

							}
							if (j != array.length - 1) {
								str += ",";
							}
						} else if (array[j].indexOf("/") != -1) {
							var index = array[j].indexOf("/");
							if (type != "星期") {
								str += array[j].substring(0, index) + type
										+ "起每隔" + array[j].substring(index + 1)
										+ type;
							} else {

								str += "星期"
										+ convertIntegerToDays(array[j]
												.substring(0, index)) + "起每隔"
										+ array[j].substring(index + 1) + "天";

							}
							if (j != array.length - 1) {
								str += ",";
							}
						} else if (array[j].indexOf("L") != -1) {
							var index = array[j].indexOf("L");
							if (array[j] == "L") {
								if (type == "天") {
									// dayOfWeek,dayOfMonth
									str += "月份的最后一天";
								} else {
									str += "星期天";
								}
								if (j != array.length - 1) {
									str += ",";
								}
							} else if (array[j] == "LW") {// dayOfMonth
								str += "月份的最后一个工作日";
								if (j != array.length - 1) {
									str += ",";
								}
							} else if (array[j].substring(0, index).length >= 1) {
								// 6L,dayOfWeek
								var num = Number(array[j].substring(0, index)) - 1;
								if (num == 0) {
									str += "月份的最后一个星期天";
								} else {
									str += "月份的最后一个星期"
											+ convertIntegerToDays(num);
								}

								if (j != array.length - 1) {
									str += ",";
								}
							}
						} else if (array[j].indexOf("W") != -1) {
							// dayOfMonth
							var index = array[j].indexOf("W");
							str += "离每月" + array[j].substring(0, index)
									+ "天最近的工作日";
							if (j != array.length - 1) {
								str += ",";
							}
						} else if (array[j].indexOf("C") != -1) {
							// dayOfMonth,dayOfWeek
							var index = array[j].indexOf("C");
							if (type == "天") {
								str += "每月"
										+ array[j].substring(0, index) + type;
								if (j != array.length - 1) {
									str += ",";
								}
							} else {

								str += "每周星期"
										+ convertIntegerToDays(array[j]
												.substring(0, index));
								if (j != array.length - 1) {
									str += ",";
								}
							}

						} else if (array[j].indexOf("#") != -1) {
							// dayOfWeek
							var index = array[j].indexOf("#");
							var num = Number(array[j].substring(0, index)) - 1;
							if (num == 0) {

								str += "月份第" + array[j].substring(index + 1)
										+ "周" + "星期天";
							} else {
								str += "月份第" + array[j].substring(index + 1)
										+ "周" + "星期"
										+ convertIntegerToDays(num);
							}
							if (j != array.length - 1) {
								str += ",";
							}
						} else {
							if (type != "星期") {
								str += array[j] + type;
							} else {
								str += type + convertIntegerToDays(array[j]);
							}
							if (j != array.length - 1) {
								str += ",";
							}
						}
					}

				} else if (value.indexOf("*") != -1 && value != "*") {
					// 如 */5
					if (value.indexOf("/") != -1) {
						var index = value.indexOf("/");
						if (type != "星期") {
							str += "每隔" + value.substring(index + 1) + type;
						} else {
							str += "每周星期天开始每隔" + value.substring(index + 1)
									+ "天";
						}
					}
				} else {
					str = "*";
				}
				return str;
			}
			function translateCronExpression(value) {
				var strDesc = "";
				value = value.replace(
						/(^\s*)|(\s*$)/g, "");
				var expressionArray = value.split(" ");
				var length = expressionArray.length;
				var arrayType = new Array();
				arrayType[0] = "秒";
				arrayType[1] = "分";
				arrayType[2] = "时";
				arrayType[3] = "天";
				arrayType[4] = "月";
				arrayType[5] = "星期";
				arrayType[6] = "年";
				var arrayStr = new Array();
				for ( var j = 0; j < length; j++) {
					// arrayStr,从秒开始0,1,2,3,4,5,6
					arrayStr[j] = commonTranslate(expressionArray[j],
							arrayType[j]);
				}
				if (length == 6) {
					arrayStr[6] = "*";
				}
				var particle = -1;
				for ( var j = 0; j < length; j++) {
					// 从秒开始,0,1,2,3,4,5,6
					if (arrayStr[j] == "*") {
						particle = j;
						break;
					}
				}
				// 处理得到"每"的最小粒度
				if (particle != -1) {
					if (arrayType[particle] != "星期"
							&& arrayType[particle] != "天") {
						arrayStr[particle] = "每" + arrayType[particle];
					} else if (arrayType[particle] == "星期") {
						// particlet对应的是每星期，则说明dayOfMonth有具体的值了，每星期的去掉，改成每年
						arrayStr[particle] = "";
						arrayStr[particle + 1] = "每年";

					} else {
						// arrayType[length-1-particle]=="天"，arrayStr[particle+2]星期为*时，即都是*
						if (arrayStr[particle + 2] == "*") {
							arrayStr[particle] = "每天";
						} else {
							// 天为*,星期为具体值时,天的值去掉，年和月需要看是每月还是每年
							arrayStr[particle] = "";
							if (arrayStr[particle + 1] == "*") {
								arrayStr[particle + 1] = "每月";
							} else if (arrayStr[particle + 3] == "*") {
								// 此时从秒到年找到第一个*的时候，是天，而且月和星期非*
								arrayStr[particle + 3] = "每年";
							}
						}
					}
				}
				var yearStr = "";
				var monthStr = "";
				var dayOfWeekStr = "";
				var lastStr = "";
				for ( var j = arrayStr.length - 1; j >= 0; j--) {
					var strsub = "";
					if (arrayStr[j] == "*") {
						strsub = "";
					} else {
						strsub = arrayStr[j] + " ";
					}
					if (arrayType[j] == "年") {
						yearStr = strsub;
					} else if (arrayType[j] == "月") {
						monthStr = strsub;
					} else if (arrayType[j] == "星期") {
						dayOfWeekStr = strsub;
					} else {
						lastStr += strsub;
					}
				}
				strDesc = yearStr + monthStr + dayOfWeekStr + lastStr;
				return strDesc;

			}
			$('button#checkCronExpression')
					.bind(
							'click',
							function() {
								var test = "";
								var isvalid = cronValidate($(
												'input#cronExpression').attr(
												"value"));
								if (!isvalid) {
									addErrorMessage("cronExpressionMessage");
									addErrorFlag("cronExpressiondiv", null);

									document
											.getElementById("hardingSettingDesc").innerText = "";
									document
											.getElementById("hardingSettingDesc").textContent = "";
								} else {
									removeErrorMessage("cronExpressionMessage");
									removeErrorFlag("cronExpressiondiv", null);

									var desc = translateCronExpression($(
											'input#cronExpression').attr(
											"value"));
									document
											.getElementById("hardingSettingDesc").innerText = desc;
									document
											.getElementById("hardingSettingDesc").textContent = desc;
								}

							});
		}
	};

}();
