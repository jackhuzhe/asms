var JobMonitor = function() {

	return {
		// main function
		init : function() {
			// --detail中用的js
			var sta = $("#sta_col").html();

			if (sta == "COMPLETED") {
				$("#sta_col").addClass("label-success");
			} else if (sta == "FAILED" || sta == "KILLED" || sta == "KILLING") {
				$("#sta_col").addClass("label-danger");
			} else if (sta == "PROCESSING" || sta == "QUEUED"
					|| sta == "WAITING") {
				$("#sta_col").addClass("label-info");
			} else if (sta == "SUSPENDED" || sta == "SUSPENDING"
					|| sta == "SCHEDULED") {
				$("#sta_col").addClass("label-warning");
			}

			var sta = $("#sta_col1").html();

			if (sta == "COMPLETED") {
				$("#sta_col1").addClass("label-success");
			} else if (sta == "FAILED" || sta == "KILLED" || sta == "KILLING") {
				$("#sta_col1").addClass("label-danger");
			} else if (sta == "PROCESSING" || sta == "QUEUED"
					|| sta == "WAITING") {
				$("#sta_col1").addClass("label-info");
			} else if (sta == "SUSPENDED" || sta == "SUSPENDING"
					|| sta == "SCHEDULED") {
				$("#sta_col1").addClass("label-warning");
			}

			var sta = $("#sta_col2").html();
			if (sta == "COMPLETED") {
				$("#sta_col2").addClass("label-success");
			} else if (sta == "FAILED" || sta == "KILLED" || sta == "KILLING") {
				$("#sta_col2").addClass("label-danger");
			} else if (sta == "PROCESSING" || sta == "QUEUED"
					|| sta == "WAITING") {
				$("#sta_col2").addClass("label-info");
			} else if (sta == "SUSPENDED" || sta == "SUSPENDING"
					|| sta == "SCHEDULED") {
				$("#sta_col2").addClass("label-warning");
			}
			var status = $("#sta_col").html();
			if (status == "SCHEDULED") {
				$("#forceRun").show();
				$("#run").show();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "WAITING") {
				$("#forceRun").show();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "QUEUED") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "PROCESSING") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").show();
				$("#kill").show();
			} else if (status == "COMPLETED") {
				$("#forceRun").show();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "FAILED") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").show();
				$("#reRun").show();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "SUSPENDING") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").hide();
				$("#kill").show();
			} else if (status == "SUSPENDED") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").show();
				$("#reRun").show();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "KILLING") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").hide();
				$("#suspend").hide();
				$("#kill").hide();
			} else if (status == "KILLED") {
				$("#forceRun").hide();
				$("#run").hide();
				$("#resume").hide();
				$("#reRun").show();
				$("#suspend").hide();
				$("#kill").hide();
			}

			$('#goForceRun').bind(
					"click",
					function(e) {
						window.location.href = "/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ $("#id").val() + "/forceRun";

					});
			$('#goResume').bind(
					"click",
					function(e) {
						window.location.href = "/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ $("#id").val() + "/resume";

					});

			$('#goRerun').bind(
					"click",
					function(e) {
						window.location.href = "/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ $("#id").val() + "/rerun";

					});

			$('#goSuspend').bind(
					"click",
					function(e) {
						window.location.href = "/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ $("#id").val() + "/suspend";

					});

			$('#goKill').bind(
					"click",
					function(e) {
						window.location.href = "/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ $("#id").val() + "/kill";

					});

			$('#goRun').bind(
					"click",
					function(e) {
						window.location.href = "/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ $("#id").val() + "/runRun";

					});

			// end
			$('#datatable_ajax tbody').click(
					function(event) {

						function forceRunUrl(id) {
							window.location.href = "/platformaccount/"
									+ $('body').data("accountid")
									+ "/jobMonitor/" + id + "/forceRun";
						}

						function resumeUrl(id) {

							window.location.href = "/platformaccount/"
									+ $('body').data("accountid")
									+ "/jobMonitor/" + id + "/resume";
						}

						function rerunUrl(id) {
							window.location.href = "/platformaccount/"
									+ $('body').data("accountid")
									+ "/jobMonitor/" + id + "/rerun";
						}

						function suspendUrl(id) {

							window.location.href = "/platformaccount/"
									+ $('body').data("accountid")
									+ "/jobMonitor/" + id + "/suspend";
						}

						function killUrl(id) {

							window.location.href = "/platformaccount/"
									+ $('body').data("accountid")
									+ "/jobMonitor/" + id + "/kill";
						}

						function runUrl(id) {

							window.location.href = "/platformaccount/"
									+ $('body').data("accountid")
									+ "/jobMonitor/" + id + "/runRun";
						}

						var a = $(event.target.parentNode).find(':checkbox');
						var id = a.attr("value");
						$('#goForceRun').bind("click", function(e) {
							forceRunUrl(id);

						});

						$('#goResume').bind("click", function(e) {
							resumeUrl(id);

						});

						$('#goRerun').bind("click", function(e) {
							rerunUrl(id);

						});

						$('#goSuspend').bind("click", function(e) {
							suspendUrl(id);

						});

						$('#goKill').bind("click", function(e) {
							killUrl(id);

						});

						$('#goRun').bind("click", function(e) {
							runUrl(id);

						});

						$.getJSON("/platformaccount/"
								+ $('body').data("accountid") + "/jobMonitor/"
								+ id, function(data) {
							if (data.jobStatus == 'WAITING') {
								$('#suspend').removeClass("dark");
								$('#suspend').addClass("default disabled");
								$('#kill').removeClass("red");
								$('#kill').addClass("default disabled");
								$('#reRun').removeClass("btn-primary");
								$("#reRun").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$('#run').removeClass("purple");
								$("#run").addClass("default disabled");
								$("#forceRun").addClass("green");
								$("#forceRun").removeClass("default disabled");
							} else if (data.jobStatus == 'SCHEDULED') {
								$('#suspend').removeClass("dark");
								$('#suspend').addClass("default disabled");
								$('#kill').removeClass("red");
								$('#kill').addClass("default disabled");
								$('#reRun').removeClass("btn-primary");
								$("#reRun").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$("#forceRun").addClass("green");
								$("#forceRun").removeClass("default disabled");
								$("#run").addClass("purple");
								$("#run").removeClass("default disabled");
							} else if (data.jobStatus == 'PROCESSING') {
								$('#reRun').removeClass("btn-primary");
								$("#reRun").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$('#forceRun').removeClass("green");
								$("#forceRun").addClass("default disabled");
								$('#run').removeClass("purple");
								$("#run").addClass("default disabled");
								$("#kill").addClass("red");
								$("#kill").removeClass("default disabled");
								$("#suspend").addClass("dark");
								$("#suspend").removeClass("default disabled");
							} else if (data.jobStatus == 'SUSPENDED') {
								$('#suspend').removeClass("dark");
								$("#suspend").addClass("default disabled");
								$('#kill').removeClass("red");
								$("#kill").addClass("default disabled");
								$('#forceRun').removeClass("green");
								$("#forceRun").addClass("default disabled");
								$('#run').removeClass("purple");
								$("#run").addClass("default disabled");
								$("#reRun").addClass("btn-primary");
								$("#reRun").removeClass("default disabled");
								$("#resume").addClass("yellow");
								$("#resume").removeClass("default disabled");
							} else if (data.jobStatus == 'FAILED') {
								$('#forceRun').removeClass("green");
								$('#forceRun').addClass("default disabled");
								$('#suspend').removeClass("dark");
								$("#suspend").addClass("default disabled");
								$('#kill').removeClass("red");
								$("#kill").addClass("default disabled");
								$('#run').removeClass("purple");
								$("#run").addClass("default disabled");
								$("#reRun").addClass("btn-primary");
								$("#reRun").removeClass("default disabled");
								$("#resume").addClass("yellow");
								$("#resume").removeClass("default disabled");
							} else if (data.jobStatus == 'COMPLETED') {
								$('#reRun').removeClass("btn-primary");
								$('#reRun').addClass("default disabled");
								$("#suspend").removeClass("dark");
								$("#suspend").addClass("default disabled");
								$("#kill").removeClass("red");
								$("#kill").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$("#run").removeClass("purple");
								$("#run").addClass("default disabled");
								$('#forceRun').addClass("green");
								$("#forceRun").removeClass("default disabled");
							} else if (data.jobStatus == 'SUSPENDING') {
								$("#suspend").removeClass("dark");
								$("#suspend").addClass("default disabled");
								$('#reRun').removeClass("btn-primary");
								$("#reRun").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$('#forceRun').removeClass("green");
								$("#forceRun").addClass("default disabled");
								$("#run").removeClass("purple");
								$("#run").addClass("default disabled");
								$("#kill").addClass("red");
								$("#kill").removeClass("default disabled");
							} else if (data.jobStatus == 'KILLED') {
								$("#suspend").removeClass("dark");
								$("#suspend").addClass("default disabled");
								$("#kill").removeClass("red");
								$("#kill").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$('#forceRun').removeClass("green");
								$("#forceRun").addClass("default disabled");
								$("#run").removeClass("purple");
								$("#run").addClass("default disabled");
								$("#reRun").addClass("btn-primary");
								$("#reRun").removeClass("default disabled");
							} else if (data.jobStatus == 'QUEUED') {
								$("#suspend").removeClass("dark");
								$("#suspend").addClass("default disabled");
								$('#reRun').removeClass("btn-primary");
								$("#reRun").addClass("default disabled");
								$("#kill").removeClass("red");
								$("#kill").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$('#forceRun').removeClass("green");
								$("#forceRun").addClass("default disabled");
								$("#run").removeClass("purple");
								$("#run").addClass("default disabled");
							} else if (data.jobStatus == 'KILLING') {
								$("#suspend").removeClass("dark");
								$("#suspend").addClass("default disabled");
								$('#reRun').removeClass("btn-primary");
								$("#reRun").addClass("default disabled");
								$("#kill").removeClass("red");
								$("#kill").addClass("default disabled");
								$("#resume").removeClass("yellow");
								$("#resume").addClass("default disabled");
								$('#forceRun').removeClass("green");
								$("#forceRun").addClass("default disabled");
								$("#run").removeClass("purple");
								$("#run").addClass("default disabled");
							}

						})

					});
		},

		viewUrl : function(id) {
			window.location.href = "/platformaccount/"
					+ $('body').data("accountid") + "/jobMonitor/" + id
					+ "/view";
		},

		initPickers : function() {
			// init date pickers
			$('.date-picker').datepicker({
				rtl : App.isRTL(),
				autoclose : true
			});
		},

		handleRecords : function() {

			var grid = new Datatable();
			grid.init({
				src : $("#datatable_ajax"),
				onSuccess : function(grid) {
					// execute some code after table records loaded
				},
				onError : function(grid) {
					// execute some code on network or other general error
				},
				dataTable : { // here you can define a typical datatable
					// settings from
					// http://datatables.net/usage/options
					/*
					 * By default the ajax datatable's layout is horizontally
					 * scrollable and this can cause an issue of dropdown menu
					 * is used in the table rows which. Use below "sDom" value
					 * for the datatable layout if you want to have a dropdown
					 * menu for each row in the datatable. But this disables the
					 * horizontal scroll.
					 */
					// "sDom" : "<'row'<'col-md-8 col-sm-12'pli><'col-md-4
					// col-sm-12'<'table-group-actions
					// pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4
					// col-sm-12'>r>>",
					"aLengthMenu" : [ [ 10, 20, 50, 100, 150 ],
							[ 10, 20, 50, 100, 150 ] // change per page
					// values here
					],
					"iDisplayLength" : 20, // default record count per page
					"bServerSide" : true, // server side processing
					"bStateSave" : true,
					"bRetrieve" : true,
					"sAjaxSource" : "/platformaccount/"
							+ $('body').data("accountid")
							+ "/jobMonitors/datatable", // ajax source
					"aaSorting" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc
				}
			});
		}
	}

}();
