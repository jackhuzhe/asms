<%@ tag pageEncoding="utf-8"%>
<%@ attribute name="tablename" required="true" rtexprvalue="true"
	description="Name of corresponding property in bean object"%>
<%@ attribute name="model" required="false"
	description="éè¿modelï¼èªå¨çærestfulçurl"%>
<%@ attribute name="view" required="true" rtexprvalue="true"
	description="for view"%>
<spring:url var="commonSearchUrl"
	value="/platformaccount/${accountId}/${model}/${id}/dependon/datatable"></spring:url>
<spring:url var="commonCreateUrl"
	value="/platformaccount/${accountId}/${model}/${id}/dependon/new"></spring:url>
<spring:url var="specialSearchUrl"
	value="/platformaccount/${accountId}/${model}/new/dependon/datatable"></spring:url>
<spring:url var="specialCreateUrl"
	value="/platformaccount/${accountId}/${model}/new/dependon/new"></spring:url>

<div id="${tablename}_delete-modal" class="modal fade"
	aria-hidden="true" aria-labelledby="myModalLabel" role="dialog"
	tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button class="close" aria-hidden="true" data-dismiss="modal"
					type="button"></button>
				<h4 class="modal-title">确认删除</h4>
			</div>
			<div class="modal-body">确定要删除此记录？</div>
			<div class="modal-footer">
				<button class="btn green" type="button"
					id="${tablename}_delete-modal-confirm">确认</button>
				<button class="btn default" data-dismiss="modal" type="button">返回</button>
			</div>
		</div>
	</div>
</div>
<div id="${tablename}_new-modal" class="modal fade" aria-hidden="true"
	aria-labelledby="myModalLabel" role="dialog" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button class="close" aria-hidden="true" data-dismiss="modal"
					type="button"></button>
				<h4 class="modal-title">job schedule list</h4>
			</div>
			<div class="modal-body">
				<table class="table table-striped table-bordered table-hover"
					id="${tablename}_new-modal_table">
					<thead>
						<tr>

							<th>调度名</th>
							<th>Job类型</th>
							<th>状态</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>


<div class="table-toolbar">
	<div class="btn-group">
		<c:if test="${!view}">
			<button id="editable_new" class="btn green">
				添加 <i class="fa fa-plus"></i>
			</button>
		</c:if>
	</div>
</div>

<table
	class="table table-bordered table-striped table-condensed flip-content"
	id="${tablename}">
	<thead class="flip-content">
		<tr>
			<th width="20%">调度名</th>
			<th>Job类型</th>

			<th class="numeric">状态</th>
			<c:if test="${!view}">
				<th>修改</th>
				<th>删除</th>
			</c:if>


		</tr>
	</thead>
	<tbody>


	</tbody>
</table>





<script type="text/javascript">
	var oTable = $('#${tablename}').dataTable({

		"aLengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] // change per page values here
		],
		// set the initial value
		"iDisplayLength" : 5,

		"sPaginationType" : "bootstrap",
		"oLanguage" : {
			"sLengthMenu" : "每页 _MENU_ 条记录",
            "sInfo": "</span>\u603b\u5171 _TOTAL_ \u6761\u8bb0\u5f55",
            "sInfoEmpty": "",
            "sGroupActions": "_TOTAL_ \u6761\u8bb0\u5f55\u9009\u4e2d  ",
            "sEmptyTable":  "\u672a\u67e5\u8be2\u5230\u6570\u636e",
			"oPaginate" : {
				"sPrevious" : "Prev",
				"sNext" : "Next"
			}
		},
		"aoColumnDefs" : [ {
			'bSortable' : false,
			'aTargets' : [ 0 ]
		} ]
	});

	var currentRow = 0;
	var preschedulelist;
	var nEditing = null;
	function restoreRow(oTable, nRow) {
		var aData = oTable.fnGetData(nRow);
		var jqTds = $('>td', nRow);

		for ( var i = 0, iLen = jqTds.length; i < iLen; i++) {
			oTable.fnUpdate(aData[i], nRow, i, false);
		}

		oTable.fnDraw();
	}
	function editRow(oTable, nRow, dataMode) {
		var aData = oTable.fnGetData(nRow);
		var jqTds = $('>td', nRow);
		var data2 = "";
		if (aData[2] != '') {
			data2 = nRow.children[2].firstChild.outerText;
		}
		jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
		jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
		jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + data2 + '">';

		jqTds[3].innerHTML = '<button type="submit" class="btn btn-sm green" id="edit_curr_table">保存 <i class="fa fa-save"></button>';
		jqTds[4].innerHTML = '<button type="button" class="btn btn-sm default red" '+ dataMode + 'id="cancel_curr_table">取消 <i class="fa fa-times"></i></button>'
;
		searchModal();
		$('#${tablename}_new-modal').modal('show');
	}

	function saveRow(oTable, nRow) {
		var v = nRow.id;
		var index = nRow.rowIndex;
		var childs = oTable[0].children[1].childNodes;
		for ( var j = 0; j < childs.length; j++) {
			if (j != index - 1 && childs[j].id == v) {
				toastr["error"]("存在重复记录！");
				return false;
			}
		}
		var jqInputs = $('input', nRow);
		oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
		oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
		var css = 'ENABLE' == jqInputs[2].value.trim() ? "success" : "danger";
		var t = "<span class=\"label label-sm label-" + css
								+ "\"> "
				+ jqInputs[2].value + " </span>";
		oTable.fnUpdate(t, nRow, 2, false);
		oTable.fnUpdate('<button id="edit_curr_table" class="btn btn-sm purple">修改 <i class="fa fa-edit"></i></button>', nRow, 3, false);
		//'<a class="edit" href="">修改</a>'
		oTable.fnUpdate('<button id="delete_curr_table"	class="btn btn-sm default red">删除 <i class="fa fa-trash-o"></i></button>', nRow, 4, false);
		oTable.fnDraw();
		return true;
	}

	function cancelEditRow(oTable, nRow) {
		var jqInputs = $('input', nRow);
		oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
		oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
		var css = 'ENABLE' == jqInputs[2].value ? "success" : "danger";
		var t = "<span class=\"label label-sm label-" + css
								+ "\"> "
				+ jqInputs[2].value + " </span>";
		oTable.fnUpdate(t, nRow, 2, false);
		oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
		oTable.fnUpdate('<button id="edit_curr_table" class="btn btn-sm purple">修改 <i class="fa fa-edit"></i></button>', nRow, 4, false);
		oTable.fnDraw();
	}
	$('#${tablename} button#delete_curr_table').live('click', function(e) {
		e.preventDefault();
		var obj=$(this);
		deleteConfirm(obj);
	});
	function deleteConfirm(obj) {
		$('#${tablename}_delete-modal').modal('show');

		$('#${tablename}_delete-modal-confirm').unbind();
		$('#${tablename}_delete-modal-confirm')
				.bind(
						"click",
						function(e) {
							var nRow = obj.parents('tr')[0];
							oTable.fnDeleteRow(nRow);
							$('#${tablename}_delete-modal').modal('hide');
							toastr["success"]("删除完毕！不要忘记提交到后台!");   
						});
	}

	
	$('#${tablename} button#cancel_curr_table').live('click', function(e) {
		e.preventDefault();
		if ($(this).attr("data-mode") == "new") {
			var nRow = $(this).parents('tr')[0];
			oTable.fnDeleteRow(nRow);
			nEditing = null;
		} else {
			restoreRow(oTable, nEditing);
			nEditing = null;
		}
	});

	$('#${tablename} button#edit_curr_table')
			.live(
					'click',
					function(e) {
						e.preventDefault();

						/* Get the row as a parent of the link that was clicked on */
						var nRow = $(this).parents('tr')[0];

						if (nEditing !== null && nEditing != nRow) {
							/* Currently editing - but not this row - restore the old before continuing to edit mode */
							restoreRow(oTable, nEditing);
							editRow(oTable, nRow,'');
							nEditing = nRow;
						} else if (nEditing == nRow && this.innerHTML.indexOf("保存") != -1) {
							/* Editing this row and want to save it */
							var saveable = saveRow(oTable, nEditing);
							if (saveable) {
								nEditing = null;
								//alert("Updated! Do not forget to do some ajax to sync with backend :)");
								toastr["success"]("更新完毕！不要忘记提交到后台!");   
							}

						} else {
							/* No edit in progress - let's start one */
							editRow(oTable, nRow,'');
							nEditing = nRow;
						}
					});
	$('#editable_new')
			.click(
					function(e) {
						e.preventDefault();
						var aiNew = oTable
								.fnAddData([ '', '', '',
								             '<button id="edit_curr_table" class="btn btn-sm purple">修改 <i class="fa fa-edit"></i></button>',
								             '<button type="button" class="btn btn-sm default red" id="cancel_curr_table" data-mode="new">取消</button>' ]);
						var nRow = oTable.fnGetNodes(aiNew[0]);
						editRow(oTable, nRow, 'data-mode="new"');
						nEditing = nRow;
						searchModal();
					});
	jQuery('#${tablename}_wrapper .dataTables_filter input').addClass(
			"form-control input-medium input-inline"); // modify table search input
	jQuery('#${tablename}_wrapper .dataTables_length select').addClass(
			"form-control input-small"); // modify table per page dropdown
	jQuery('#${tablename}_wrapper .dataTables_length select').select2({
		showSearchInput : false
	//hide search box with special css class
	}); // initialize select2 dropdown

	function handleRecords() {
		//for search the depended on job schedule list
		var urlstr = "";
		if ("${id}" != "") {
			urlstr = "${commonSearchUrl}";
		} else {
			urlstr = "${specialSearchUrl}";
		}
		$.ajax({
			url : urlstr,
			type : "POST",
			data : '{}',
			dataType : 'json',
			contentType : 'application/json',
			traditional : true,
			success : function(data) {
				//var t="";
				var editStr = '<button id="edit_curr_table" class="btn btn-sm purple">修改 <i class="fa fa-edit"></i></button>';
				var deleteStr = '<button id="delete_curr_table"	class="btn btn-sm default red">删除 <i class="fa fa-trash-o"></i></button>';

				for ( var i in data) {
					var jsonObj = eval(data[i]);

					for ( var j = 0; j < jsonObj.length; j++) {
						var jj = jsonObj[j];
						//	t+="<tr>";
						///	t+="<td>"+jj.name+"</td>";
						//	t+="<td>"+jj.jobtype+"</td>";

						//	t+="<td>"+jj.status+"</td>";
						//	t+="<td>"+jj.editflag+"</td>";
						//	t+="<td>"+jj.deleteflag+"</td>";
						//	t+="</tr>";
						var aiNew = null;
						if ("${view}" == "true") {
							aiNew = oTable.fnAddData([ jj.name, jj.jobtype,
									jj.status ]);
						} else {
							aiNew = oTable.fnAddData([ jj.name, jj.jobtype,
									jj.status, editStr, deleteStr ]);
							var nRow = oTable.fnGetNodes(aiNew[0]);
							nRow.id = jj.id;
							var jqTds = $('>td', nRow);
							nEditing = nRow;
						}

					}

				}

			},
			error : function(response) {
				//alert(response.status);
				//alert(response.readyState);
			}

		});

	}
	/*
	for modal
	 */
	function searchModal() {
		var urlstr = "";
		if ("${id}" != "") {
			urlstr = "${commonCreateUrl}";
		} else {
			urlstr = "${specialCreateUrl}";
		}

		$
				.ajax({
					url : urlstr,
					type : "GET",
					data : '{}',
					dataType : 'json',
					contentType : 'application/json',
					traditional : true,
					success : function(data) {
						var t = "";

						for ( var i in data) {
							var jsonObj = eval(data[i]);

							for ( var j = 0; j < jsonObj.length; j++) {
								var jj = jsonObj[j];
								t += "<tr id=\""+jj.id+"\">";
								t += "<td>" + jj.name + "</td>";
								t += "<td>" + jj.jobtype + "</td>";
								var css = 'ENABLE' == jj.status ? "success"
										: "danger";
								t += "<td>"
										+ "<span class=\"label label-sm label-" + css
													+ "\"> "
										+ jj.status + " </span>" + "</td>";
								t += "</tr>";

							}

						}

						$("table#${tablename}_new-modal_table > tbody").html(t);

					},
					error : function(response) {
						//alert(response.status);
						//alert(response.readyState);
					}

				});

	}
	//var modalSelectedRow=null;
	jQuery('#${tablename}_new-modal_table tbody > tr')
			.live(
					'click',
					function(e) {
						//modalSelectedRow= event.target.parentNode;
						e.preventDefault();
						var modalSelectedRow = $(this)[0];
						var jqInputs = $('input', nEditing);
						for ( var j = 0; j < 2; j++) {
							var col = modalSelectedRow.children[j];
							jqInputs[j].value = col.firstChild.data;
						}

						jqInputs[2].value = modalSelectedRow.children[2].firstChild.firstChild.data;
						nEditing.id = modalSelectedRow.id;
						$('#${tablename}_new-modal').modal('hide');
					});

	jQuery(document).ready(function() {
		handleRecords();
	});
</script>