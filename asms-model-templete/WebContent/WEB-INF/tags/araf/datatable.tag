<%@ tag pageEncoding="utf-8" %>

<%@ attribute name="tablename" required="true" rtexprvalue="true"
	description="Name of corresponding property in bean object"%>
<%@ attribute name="label" required="true" rtexprvalue="true"
	description="Label appears in red color if input is considered as invalid after submission"%>
<%@ attribute name="searchUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="createUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="editUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="deleteUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="viewUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="model" required="false"
	description="éè¿modelï¼èªå¨çærestfulçurl  添加"%>
<%@ attribute name="header" fragment="true" required="false"%>
<%@ attribute name="search_header" fragment="true" required="false"%>


<spring:url var="commonSearchUrl"
	value="/platformaccount/${accountId}/${model}s/datatable"></spring:url>
<spring:url var="commonCreateUrl"
	value="/platformaccount/${accountId}/${model}/new"></spring:url>
<spring:url var="commonEditUrl"
	value="/platformaccount/${accountId}/${model}"></spring:url>
<spring:url var="commonDeleteUrl"
	value="/platformaccount/${accountId}/${model}"></spring:url>

<div id="${tablename}_delete-modal" class="modal fade" aria-hidden="true"
	aria-labelledby="myModalLabel" role="dialog" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button class="close" aria-hidden="true" data-dismiss="modal"
					type="button"></button>
				<h4 class="modal-title">确认删除</h4>
			</div>
			<div class="modal-body">确定要删除此记录？</div>
			<div class="modal-footer">
				<button class="btn green" type="button" id="${tablename}_delete-modal-confirm">确认</button>
				<button class="btn default" data-dismiss="modal" type="button">返回</button>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet">
			<div class="portlet-title">
				<div class="caption">
					<!-- <i class="fa fa-shopping-cart"></i> -->
					${label}
				</div>
				<div class="actions">
					<a href="${commonCreateUrl}">
						<button id="${tablename}_add" class="btn green">
							添加 <i class="fa fa-plus"></i>
						</button> </a> <a href="#"><button id="${tablename}_edit"
							class="btn purple"">
							修改 <i class="fa fa-edit"></i>
						</button> </a> <a href="#"><button id="${tablename}_delete"
							class="btn default red">
							删除 <i class="fa fa-trash-o"></i>
						</button> </a>
				</div>
			</div>

			<div class="portlet-body">
				<div class="table-container">
					<div class="table-actions-wrapper">
						<span> </span>
					</div>
					<table class="table table-striped table-bordered table-hover"
						id="${tablename}">
						<thead>
							<tr role="row" class="heading">
								<th width="5%"><input type="checkbox"
									class="group-checkable">
								</th>

								<jsp:invoke fragment="header" />

								<th width="10%">操作</th>
							</tr>
							<tr role="row" class="filter">
								<td></td>
								<jsp:invoke fragment="search_header" />
								<td>
									<div class="margin-bottom-5">
										<button class="btn btn-sm yellow filter-submit margin-bottom">
											<i class="fa fa-search"></i> 查询
										</button>

									</div>
									<button class="btn btn-sm red filter-cancel">
										<i class="fa fa-times"></i> 重置
									</button>
								</td>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>


<!-- END PAGE LEVEL SCRIPTS -->
<script type="text/javascript">
	/* Add a click handler to the rows - add class to this row. */
	$('#${tablename} tbody').click(function(event) {		

		var a = $(event.target.parentNode).find(':checkbox');
		var id = a.attr("value");
		// ç»å®æé®
		$('#${tablename}_edit').bind("click", function(e) {
			editUrl(id);
			e.preventDefault();
			return false;
		});

		// ç»å®æé®
		$('#${tablename}_delete').unbind();
		$('#${tablename}_delete').bind("click", function(e) {
			deleteUrl(id);
			e.preventDefault();
			return false;
		});

	});

	var TableAjax = function() {

		var initPickers = function() {
			//init date pickers
			$('.date-picker').datepicker({
				rtl : App.isRTL(),
				autoclose : true
			});
		}

		var handleRecords = function() {

			var grid = new Datatable();
			grid.init({
				src : $("#${tablename}"),
				onSuccess : function(grid) {
					// execute some code after table records loaded
				},
				onError : function(grid) {
					// execute some code on network or other general error  
				},
				dataTable : { // here you can define a typical datatable settings from http://datatables.net/usage/options 
					/* 
					    By default the ajax datatable's layout is horizontally scrollable and this can cause an issue of dropdown menu is used in the table rows which.
					    Use below "sDom" value for the datatable layout if you want to have a dropdown menu for each row in the datatable. But this disables the horizontal scroll. 
					 */
					//"sDom" : "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>r>>", 
					"aLengthMenu" : [ [ 10, 20, 50, 100, 150 ],
							[ 10, 20, 50, 100, 150 ] // change per page values here
					],
					"iDisplayLength" : 20, // default record count per page
					"bServerSide" : true, // server side processing
					"bStateSave" : true,
					"bRetrieve" : true,
					"sAjaxSource" : "${commonSearchUrl}", // ajax source
					"aaSorting" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc
				}
			});

		}

		return {

			//main function to initiate the module
			init : function() {

				initPickers();
				handleRecords();
			}

		};

	}();

	// é¡µé¢å è½½çæ¶åå¯å¨
	jQuery(document).ready(function() {
		App.init();
		TableAjax.init();
	});

	function editUrl(id) {
		window.location.href = "${commonEditUrl}/" + id + "/update";
	};

	function viewUrl(id) {

		window.location.href = "${commonEditUrl}/" + id + "/view";
	};

	function deleteUrl(id) {
		$('#${tablename}_delete-modal').modal('show');

		/* var selected = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked',
				oTable); */
		// ç»å®modalä¸­çbuttonçjsäºä»¶
		$('#${tablename}_delete-modal-confirm').unbind();
		$('#${tablename}_delete-modal-confirm').bind("click", function(e) {
			$.ajax({
				"url" : "${commonDeleteUrl}/" + id + "/delete",
				"type" : "DELETE",
				"success" : function(response) {
					$('#${tablename}_delete-modal').modal('hide');
					toastr["success"](response.globalMessage);

					oTable = $("#${tablename}").dataTable({
						"bProcessing" : true,
						"bServerSide" : true,						
						"bRetrieve" : true,
						"sAjaxSource" : "${commonSearchUrl}"
					});

					oTable.fnDraw();

				},
				"error" : function(response) {
					$('#${tablename}_delete-modal').modal('hide');
					Custom.globalError(response);
				}
			});
			$('#${tablename}_delete-modal-confirm').unbind();
			e.preventDefault();
			return false;
		});
		
	}
</script>