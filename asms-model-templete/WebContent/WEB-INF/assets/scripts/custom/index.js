/**
Custom module for you to write your own javascript functions
**/
var Index = function () {

    // private functions & variables

    var myFunc = function(text) {
        alert(text);
    }
    
    //处理histoyr数据，生成[{label:"aaa", data:[[0,10],[1,20]]}，{}]这种结构，给flot插件用
	function getHistoryStaticsData(nodesName, datas) { 
		
		var staticsDatas = [];
		
		if (datas.length > 0) {

			for(var i = 0; i < nodesName.length; i++) {
        		var dataObj = {};
        		var staticsData = [];
        		for ( var j = 0; j < datas[i].length; ++j) {
        			if (datas[i][j] >= 0) {
        				var index = staticsData.length + 1;
        				if(index < 0){
        					index = 0;
        				}
        				staticsData.push([index, datas[i][j]]);
        			}
        		}
        		dataObj.label = nodesName[i];
        		dataObj.data = staticsData;
        		staticsDatas.push(dataObj);
        	}
		}
    	return staticsDatas;
	}

    // public functions
    return {

        //main function
        init: function () {
            $('#send').click(function(e) {
            	var postMsg = {"subject" : "Hello araf user" + parseInt(100*Math.random()),
    					"content" : "詹姆斯并没像预想中的那样大杀四方，上半场只得6分。第三节他仍然施展不开，热火打得非常艰难。本节还有5分24秒时，詹姆斯好不容易跳投得手，热火以52-51领先，但韦斯特和乔治马上相继还以颜色，步行者又占据上风。波什和科尔在本节结束前相继命中三分，热火才将比分追成62-63。"}
	            	Custom.ajax({
						url : "message",
						type : "POST",
						data : postMsg,
						success : function(response) {
							toastr["success"](response.globalMessage);
						},
						error : function(response) {
							//在custom.js中
							Custom.globalError(response);
						}
	            	});
            });
            
        },
        
        initCharts: function() {
        	if (!jQuery.plot) {
                return;
            }
        	
            var updateInterval = 10000;
            
            //处理cpu, memory数据，生成[{label:"aaa", data:[[0,10],[1,20]]}，{}]这种结构，给flot插件用
        	function getStaticsData(nodesName, datas) {
        		
        		var staticsDatas = [];
        		
        		if (datas.length > 0) {

        			for(var i = 0; i < nodesName.length; i++) {
                		var dataObj = {};
                		var staticsData = [];
                		for ( var j = 0; j < datas[i].length; ++j) {
                			if (datas[i][j] > 0) {
                				var index = staticsData.length - 1;
                				if(index < 0){
                					index = 0;
                				}
                				staticsData.push([index, datas[i][j]]);
                			}
                		}
                		dataObj.label = nodesName[i];
                		dataObj.data = staticsData;
                		staticsDatas.push(dataObj);
                	}
        		}
            	return staticsDatas;
        	}
        	
        	//初始化cpu，内存使用图
            var plot_cpu_statistics = $.plot($("#cpu_statistics"), [], {
	            series: {
	                shadowSize: 1
	            },
	            lines: {
	                show: true
	            },
	            yaxis: {
	            	show: true,
	                ticks: 4,
	                min: 0,
	                max: 100,
	                tickFormatter: function (v) {
	                    return v + "%";
	                },                    
	                tickColor: "#eee"
	            },
	            xaxis: {
	            	show: true,
                    ticks: [0, 60, 120, 180, 240, 300],
                    min: 0,
                    max: 360,
                    tickFormatter: function (v) {
	                    return (v / 6) +  " mins";
	                } 
	            },
	            grid: {
	                tickColor: "#a8a3a3",
	                borderWidth: 0
	            }
            });
            
            var plot_memory_statistics = $.plot($("#memory_statistics"), [], {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: true
                },
                yaxis: {
                	show: true,
                    ticks: 5,
                    min: 0,
                    max: 100,
                    tickFormatter: function (v) {
	                    return v + " mb";
	                }, 
                    tickColor: "#eee"
                },
                xaxis: {
                    show: true,
                    ticks: [0, 60, 120, 180, 240, 300],
                    min: 0,
                    max: 360,
                    tickFormatter: function (v) {
                    	return (v / 6) +  " mins";
	                }
                },
                grid: {
                    tickColor: "#a8a3a3",
                    borderWidth: 0
                }
            });
            
            
            $('.easy-pie-chart .number.run').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: App.getLayoutColorCode('green')
            });

            $('.easy-pie-chart .number.stop').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3
                //barColor: App.getLayoutColorCode('green')
            });
             
            $('.easy-pie-chart .number.warn').easyPieChart({
                animate: 1000,
                size: 75,
                lineWidth: 3,
                barColor: App.getLayoutColorCode('red')
            });
            
            //绘制cpu,memeory和pie chart
            setInterval(function () {

        		var postMsg = {}
        		
        		Custom.ajax({
					url : "nodesperformanceinfo",
					type : "POST",
					data : postMsg,
					success : function(response) {
						
						//重画节点状态图
						var activeNodes_content = "";
						var activeNodes_content_template = 
							"<div class='col-md-3'>" +
		                    "    <div class='easy-pie-chart'>" +
		                    "        <div class='number {0}' data-percent='{1}'>" +
		                    "            <span>" +
		                    "                 {2}" +
		                    "            </span>" +
		                    "             %" +
		                    "        </div>" +
		                    "        <div class='title' >" +
		                    "             {3}" +
		                    "        </div>" +
		                    "    </div>" +
		                    "</div>" +
		                    "<div class='margin-bottom-10 visible-sm'>" +
		                    "</div>";
						for (var i = 0; i < response.payload.activeNodesName.length; i++) {
							
							var cpuIndex = Custom.arrayIndexOf(response.payload.cpuNodesName, response.payload.activeNodesName[i]);
							
							var nodeState = "stop";
							var cpuRadio = 0;
							
							if (cpuIndex != -1) {
								cpuRadio = response.payload.cpuRadios[cpuIndex][0];
								if (cpuRadio >= 75)
									nodeState = "warn";
								else if (cpuRadio > 0 && cpuRadio < 75)
									nodeState = "run";
							}
							
							activeNodes_content = activeNodes_content + Custom.stringFormat(activeNodes_content_template,
									nodeState,
									cpuRadio,
									cpuRadio,
									response.payload.activeNodesName[i]);
						}
						
						$("#activeNodes_content").html(activeNodes_content);
						
						$('.easy-pie-chart .number.run').easyPieChart({
			                animate: 1000,
			                size: 75,
			                lineWidth: 3,
			                barColor: App.getLayoutColorCode('green')
			            });

			            $('.easy-pie-chart .number.stop').easyPieChart({
			                animate: 1000,
			                size: 75,
			                lineWidth: 3
			                //barColor: App.getLayoutColorCode('green')
			            });
			             
			            $('.easy-pie-chart .number.warn').easyPieChart({
			                animate: 1000,
			                size: 75,
			                lineWidth: 3,
			                barColor: App.getLayoutColorCode('red')
			            });
						
						//重画cpu，memory图
			            //根据activeNodesName，是否生成该节点的cpu和memory图
			            var cpuNodesName = [];
			            var cpuRadios = [];
			            var memoryNodesName = [];
			            var jvmMemoryUsed = [];
			            var historyNodesName = [];
			            var historyUsed = [];
			            
			            for ( var i = 0; i < response.payload.activeNodesName.length; i++) {
			            	var cpuTempIndex = Custom.arrayIndexOf(response.payload.cpuNodesName, response.payload.activeNodesName[i]);
			            	var memoryTempIndex = Custom.arrayIndexOf(response.payload.memoryNodesName, response.payload.activeNodesName[i]);
			            	
			            	if (cpuTempIndex != -1) {
				            	cpuNodesName.push(response.payload.cpuNodesName[cpuTempIndex]);
				            	cpuRadios.push(response.payload.cpuRadios[cpuTempIndex]);
			            	}
			            	
			            	if (memoryTempIndex != -1) {
				            	memoryNodesName.push(response.payload.memoryNodesName[memoryTempIndex]);
				            	jvmMemoryUsed.push(response.payload.jvmMemoryUsed[memoryTempIndex]);
			            	}
			            	
			            }
			            
			            //由于内存图的纵坐标和图的示例需要初始化就定义好，不能通过set方式改变，所以不能用draw方法实现动态效果
//						//填充数据
//			            plot_cpu_statistics.setData(getStaticsData(cpuNodesName, cpuRadios));
//						//画图
//						plot_cpu_statistics.draw();
//						plot_memory_statistics.setData(getStaticsData(memoryNodesName, jvmMemoryUsed));
//						plot_memory_statistics.draw();
						
						//动态生成效果图，并且实时调整内存纵坐标和示例，用一下方式实现
						$.plot($("#cpu_statistics"), getStaticsData(cpuNodesName, cpuRadios), {
				            series: {
				                shadowSize: 1
				            },
				            lines: {
				                show: true
				            },
				            yaxis: {
				            	show: true,
				                ticks: 4,
				                min: 0,
				                max: 100,
				                tickFormatter: function (v) {
				                    return v + "%";
				                },                    
				                tickColor: "#eee"
				            },
				            xaxis: {
				            	show: true,
			                    ticks: [0, 60, 120, 180, 240, 300],
			                    min: 0,
			                    max: 360,
			                    tickFormatter: function (v) {
				                    return (v / 6) +  " mins";
				                } 
				            },
				            grid: {
				                tickColor: "#a8a3a3",
				                borderWidth: 0
				            }
			            });
						
						$.plot($("#memory_statistics"), getStaticsData(memoryNodesName, jvmMemoryUsed), {
			                series: {
			                    shadowSize: 1
			                },
			                lines: {
			                    show: true
			                },
			                yaxis: {
			                	show: true,
			                    ticks: 5,
			                    min: 0,
			                    max: response.payload.jvmMaxMemory,
			                    tickFormatter: function (v) {
				                    return v + " mb";
				                }, 
			                    tickColor: "#eee"
			                },
			                xaxis: {
			                    show: true,
			                    ticks: [0, 60, 120, 180, 240, 300],
			                    min: 0,
			                    max: 360,
			                    tickFormatter: function (v) {
			                    	return (v / 6) +  " mins";
				                }
			                },
			                grid: {
			                    tickColor: "#a8a3a3",
			                    borderWidth: 0
			                }
			            });
						
					},
					error: function (jqXHR, textStatus, errorThrown) {
			            console.log("jqXHR: " + jqXHR.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
			        }
        		});
        	}, updateInterval);
            
            
        },
        
        initStaticsDataYear: function(nodeYearLists, yearDates) {
        	if (!jQuery.plot) {
                return;
            }           
			
			//historyNodesName, historyRadios
			$.plot($("#vmap_year"), getHistoryStaticsData(nodeYearLists, yearDates), {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: true
                },
                yaxis: {
                	show: true,
                    ticks: 5,
                    min: 0,
                    max: 100,
                    tickFormatter: function (v) {
	                    return v + " mb";
	                }, 
                    tickColor: "#eee"
                },
                xaxis: {
                    show: true,
                    ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    min: 1,
                    max: 12,
                    tickFormatter: function (v) {
                    	return v +  " month";
	                }
                },
                grid: {
                    tickColor: "#a8a3a3",
                    borderWidth: 0
                }
            });
            
        },
        
        initStaticsDataMonth: function(nodeMonthLists, monthDates) {
        	if (!jQuery.plot) {
                return;
            }
            
            //historyNodesName, historyRadios
			$.plot($("#vmap_month"), getHistoryStaticsData(nodeMonthLists, monthDates), {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: true
                },
                yaxis: {
                	show: true,
                    ticks: 5,
                    min: 0,
                    max: 100,
                    tickFormatter: function (v) {
	                    return v + " mb";
	                }, 
                    tickColor: "#eee"
                },
                xaxis: {
                    show: true,
                    ticks: [1, 5, 10, 15, 20, 25, 31],
                    min: 1,
                    max: 31,
                    tickFormatter: function (v) {
                    	return v +  " days";
	                }
                },
                grid: {
                    tickColor: "#a8a3a3",
                    borderWidth: 0
                }
            });
			
			//historyNodesName, historyRadios
			$.plot($("#vmap_year"), getHistoryStaticsData(nodeYearLists, yearDates), {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: true
                },
                yaxis: {
                	show: true,
                    ticks: 5,
                    min: 0,
                    max: 100,
                    tickFormatter: function (v) {
	                    return v + " mb";
	                }, 
                    tickColor: "#eee"
                },
                xaxis: {
                    show: true,
                    ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    min: 1,
                    max: 12,
                    tickFormatter: function (v) {
                    	return v +  " month";
	                }
                },
                grid: {
                    tickColor: "#a8a3a3",
                    borderWidth: 0
                }
            });
        },
			
			initStaticsDataYearCpu: function(nodeYearLists, yearDates) {
	        	if (!jQuery.plot) {
	                return;
	            }           
				
				//historyNodesName, historyRadios
				$.plot($("#vmap_cpu_year"), getHistoryStaticsData(nodeYearLists, yearDates), {
	                series: {
	                    shadowSize: 1
	                },
	                lines: {
	                    show: true
	                },
	                yaxis: {
	                	show: true,
	                    ticks: 5,
	                    min: 0,
	                    max: 100,
	                    tickFormatter: function (v) {
		                    return v + "%";
		                }, 
	                    tickColor: "#eee"
	                },
	                xaxis: {
	                    show: true,
	                    ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	                    min: 1,
	                    max: 12,
	                    tickFormatter: function (v) {
	                    	return v +  " month";
		                }
	                },
	                grid: {
	                    tickColor: "#a8a3a3",
	                    borderWidth: 0
	                }
	            });
	        },
	        
	        initStaticsDataMonthCpu: function(nodeMonthLists, monthDates) {
	        	if (!jQuery.plot) {
	                return;
	            }
	            
	            //historyNodesName, historyRadios
				$.plot($("#vmap_cpu_month"), getHistoryStaticsData(nodeMonthLists, monthDates), {
	                series: {
	                    shadowSize: 1
	                },
	                lines: {
	                    show: true
	                },
	                yaxis: {
	                	show: true,
	                    ticks: 5,
	                    min: 0,
	                    max: 100,
	                    tickFormatter: function (v) {
		                    return v + "%";
		                }, 
	                    tickColor: "#eee"
	                },
	                xaxis: {
	                    show: true,
	                    ticks: [1, 5, 10, 15, 20, 25, 31],
	                    min: 1,
	                    max: 31,
	                    tickFormatter: function (v) {
	                    	return v +  " days";
		                }
	                },
	                grid: {
	                    tickColor: "#a8a3a3",
	                    borderWidth: 0
	                }
	            });
				
				//historyNodesName, historyRadios
				$.plot($("#vmap_cpu_year"), getHistoryStaticsData(nodeYearLists, yearDates), {
	                series: {
	                    shadowSize: 1
	                },
	                lines: {
	                    show: true
	                },
	                yaxis: {
	                	show: true,
	                    ticks: 5,
	                    min: 0,
	                    max: 100,
	                    tickFormatter: function (v) {
		                    return v + "%";
		                }, 
	                    tickColor: "#eee"
	                },
	                xaxis: {
	                    show: true,
	                    ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	                    min: 1,
	                    max: 12,
	                    tickFormatter: function (v) {
	                    	return v +  " month";
		                }
	                },
	                grid: {
	                    tickColor: "#a8a3a3",
	                    borderWidth: 0
	                }
	            });
            
        }
    };

}();

