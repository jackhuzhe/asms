<%@ tag pageEncoding="utf-8"%>


<%@ attribute name="modelAttribute" required="true" rtexprvalue="true"%>
<%@ attribute name="id" required="true" rtexprvalue="true"%>
<%@ attribute name="formUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="validateUrl" required="false" rtexprvalue="true"%>
<%@ attribute name="method" required="false" rtexprvalue="true"%>
<%@ attribute name="redirect" required="false" rtexprvalue="true"%>
<%@ attribute name="formClass" required="false" rtexprvalue="true"%>
<%@ attribute name="notBindId" required="false" rtexprvalue="true"
	description="有的form，id是可以自己手工输入的，此时，不需要再放一个hidden的id input了。此变量有值，则不绑定hidden id"%>


<spring:url value="/platformaccount/${accountId}/${formUrl}" var="processedFormUrl" />
<spring:url value="/platformaccount/${accountId}/${formUrl}s" var="successUrl" />

<c:if test="${empty formClass}">
	<c:set var="formClass" value="form-horizontal" />
</c:if>

<form:form modelAttribute="${modelAttribute}" id="${id}"
	 class="${formClass }">
	 
	
		<c:if test="${empty notBindId}">
			<form:hidden path="id" />
		</c:if>
		<jsp:doBody />
	
	
</form:form>

<c:set var="method" value="POST"/>
<c:if test="${operationAction eq 'update'}">	
	<c:set var="method" value="PUT"/>
</c:if>

<script type="text/javascript">			
			
		$(document).ready(function() {			
			
			var $form = $('#${id}');
			$form.bind('submit', function(e) {
				
				// æ¸çéªè¯éè¯¯çcss
				$('.has-error').each(function(){
					$(this).removeClass('has-error');
				});
				
				// Ajax validation. ä½¿ç¨serializeArrayæ¹æ³ï¼inputç»ä»¶å¿é¡»idï¼nameå±æ§é½æå¼ã				
				var data = $("#${id}").serializeArray();
				
				$.ajax({
					"url":"${processedFormUrl}",
					"type":"${method}",
					dataType : "json",
					contentType : "application/json",
					data: JSON.stringify(Custom.convertToJson(data)),
					"success":function(response){
						toastr["success"](response.globalMessage);

						<c:if test="${redirect != false}">
							window.location.href = '${successUrl}';
						</c:if>
						},
					"error":function(response){Custom.globalError(response);}
					});	 	
				
				e.preventDefault();
				return false;
			});
		});
		
</script>
