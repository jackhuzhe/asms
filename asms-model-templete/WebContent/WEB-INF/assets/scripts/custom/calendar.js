var Calendar = function () {


    return {
        // main function to initiate the module
        init: function () {
        	// 默认start，end为三个月
        	var start = moment().subtract('month', 1).startOf('month').format('YYYY-MM-DD');
        	var end = moment().subtract('month', -1).endOf('month').format('YYYY-MM-DD');
            Calendar.initCalendar('jobCalendars/' + start + '/'+ end);
            Calendar.initDashboardDaterange();
        },

        initCalendar: function (url) {

            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if (App.isRTL()) {
                 if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        right: 'title, prev, next',
                        center: '',
                        right: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }                
            } else {
                 if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }
           

            var initDrag = function (el) {
                // create an Event Object
				// (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the
												// event title
                };
                // store the Event Object in the DOM element so we can get to it
				// later
                el.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 // original position after the drag
                });
            }

            var addEvent = function (title) {
                title = title.length == 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event label label-default">' + title + '</div>');
                jQuery('#event_box').append(html);
                initDrag(html);
            }

            $('#external-events div.external-event').each(function () {
                initDrag($(this))
            });

            $('#event_add').unbind('click').click(function () {
                var title = $('#event_title').val();
                addEvent(title);
            });           
            
            
            /*******************************************************************
			 * Ajax获取数据
			 */            
            Custom.ajax({
            	url: url,
            	type : "GET",	
            	success : function(response) {
            		
            		var vos = response.payload;
            		var calendarEvents = [];
            		
            		for(var i = 0; i < vos.length; i++){
            			var event = {};
            			event.title = vos[i].tittle;
            			event.start = new Date(vos[i].startYear, vos[i].startMonth, vos[i].startDay, vos[i].startHour, vos[i].startMin);
            			event.end = new Date(vos[i].endYear, vos[i].endMonth, vos[i].endDay, vos[i].endHour, vos[i].endMin);
            			event.allDay = vos[i].allDay;
            			event.backgroundColor = vos[i].color;
            			if(vos[i].jobInstanceId != null ){
            				event.url = "/platformaccount/" + $('body').data("accountid") + '/jobMonitor/' + vos[i].jobInstanceId + '/view';
            			}
            			
            			calendarEvents.push(event);
            		}           		
            		
            		$('#calendar').fullCalendar('destroy'); // destroy the calendar
                    $('#calendar').fullCalendar({ // re-initialize the calendar
                        header: h,
                        slotMinutes: 15,
                        editable: false,
                        droppable: false, // this allows things to be dropped onto the
        									// calendar !!!
                        drop: function (date, allDay) { // this function is called when
        												// something is dropped

                            // retrieve the dropped element's stored Event Object
                            var originalEventObject = $(this).data('eventObject');
                            // we need to copy it, so that multiple events don't have a
        					// reference to the same object
                            var copiedEventObject = $.extend({}, originalEventObject);

                            // assign it the date that was reported
                            copiedEventObject.start = date;
                            copiedEventObject.allDay = allDay;
                            copiedEventObject.className = $(this).attr("data-class");

                            // render the event on the calendar
                            // the last `true` argument determines if the event "sticks"
        					// (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                            // is the "remove after drop" checkbox checked?
                            if ($('#drop-remove').is(':checked')) {
                                // if so, remove the element from the "Draggable Events"
        						// list
                                $(this).remove();
                            }
                        },
                        events: calendarEvents
                    });
                    
            		
            	}
            });
            
            /*******************************************************************
			 * 
			 */
            
            
         

        },
        
        initDashboardDaterange: function () {

            $('#jobCalendar-report-range').daterangepicker({
                opens: (App.isRTL() ? 'right' : 'left'),
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month'),
                minDate: '01/01/2012',
                maxDate: '12/31/3014',
                dateLimit: {
                    days: 180
                },
                showDropdowns: false,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: true,
                ranges: {                    
                    '当前月': [moment().startOf('month'), moment().endOf('month')],
                    '三个月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', -1).endOf('month')],
                    '半年': [moment().subtract('month', 3).startOf('month'), moment().subtract('month', -3).endOf('month')],
                    '一年': [moment().subtract('month', 6).startOf('month'), moment().subtract('month', -6).endOf('month')]
                },
                buttonClasses: ['btn'],
                applyClass: 'blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: 'Apply',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                }
            },
            function (start, end) {
                console.log("Callback has been called!");
                $('#jobCalendar-report-range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
            );


            $('#jobCalendar-report-range span').html(moment().subtract('month', 1).startOf('month').format('MMMM D, YYYY') + ' - ' + moment().subtract('month', -1).endOf('month').format('MMMM D, YYYY'));
            $('#jobCalendar-report-range').show();
            
            //选择日期。
            $('#jobCalendar-report-range').on('apply.daterangepicker', function(ev, picker) {
            	  
            	  var start = picker.startDate.format('YYYY-MM-DD');
            	  var end = picker.endDate.format('YYYY-MM-DD');
            	  Calendar.initCalendar('jobCalendars/' + start + '/' + end);
            	});
            
          
        }

    };

}();