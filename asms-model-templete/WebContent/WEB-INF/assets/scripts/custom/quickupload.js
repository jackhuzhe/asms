var QuickUpload = function () {
    return {

        //main function
        init: function () {
        	Dropzone.options.uploadDropzone = {
                    init: function() {
//                        this.on("addedfile", function(file) {
//                            // Create the remove button
//                            var removeButton = Dropzone.createElement("<button class='btn btn-sm btn-block'>Remove file</button>");
//                            
//                            // Capture the Dropzone instance as closure.
//                            var _this = this;
//
//                            // Listen to the click event
//                            removeButton.addEventListener("click", function(e) {
//                              // Make sure the button click doesn't submit the form:
//                              e.preventDefault();
//                              e.stopPropagation();
//
//                              // Remove the file preview.
//                              _this.removeFile(file);
//                              // If you want to the delete the file on the server as well,
//                              // you can do the AJAX request here.
//                            });
//
//                            // Add the button to the file preview element.
//                            file.previewElement.appendChild(removeButton);
//                        });
                    	 
                        this.on("error", function(file, errorMessage, XHR) {
                        	console.log(errorMessage);
                        	$(file.previewElement.children[4].children[0]).text(errorMessage.globalMessage);
                        });
                    }            
                }
        	
        	//var ftpConfigs;
        	var postMsg = {"iDisplayStart" : 0 , "iDisplayLength" : 10}
        	Custom.ajax(
        			{
        				url : "ftpconfigs",
        				type : "POST",
        				//data : postMsg,
        				success : function(response) {
        					var ftpConfigs = response.payload;
        					
        					var configNames = new Bloodhound({
        		        		datumTokenizer : function(d) { return Bloodhound.tokenizers.whitespace(d.configName); },
        		        		queryTokenizer : Bloodhound.tokenizers.whitespace,
        		        		local: ftpConfigs
        		        	});
        		        	
        		        	configNames.initialize();
        		        	
        		        	var $typeaheadConfigName = $("#configName").typeahead(null, {
        		        		hint : true,
        		        		hightlight : true,
        		        		//limit : 10,
        		        		displayKey : "configName",
        		        		val : "id",
        		        		source : configNames.ttAdapter(),
        		        		templates: {
        		            	    empty: [
        		            	      '<div class="empty-message">',
        		            	      '没有匹配的数据',
        		            	      '</div>'
        		            	    ].join('\n'),
        		            	    suggestion: Handlebars.compile('<p><strong>{{configName}}</strong> – {{localDir}}</p>')
        		            	  }
        		        	});
        		        	
        		        	$typeaheadConfigName.on('typeahead:selected', function (obj, datum, name) {
        		        		$("#localPath").val(datum.localDir);
	                    		$("#localDir").val(datum.localDir);
        		        	});
        		        	
        		        	$typeaheadConfigName.on('typeahead:cursorchanged', function (obj, datum, name) {
        		        		$("#localPath").val(datum.localDir);
	                    		$("#localDir").val(datum.localDir);
        		        	});
        		        	
        		        	$typeaheadConfigName.on('typeahead:autocompleted', function (obj, datum, name) {
        		        		$("#localPath").val(datum.localDir);
	                    		$("#localDir").val(datum.localDir);
        		        	});

        				},
        				error: function (jqXHR, textStatus, errorThrown) {
    			            console.log("jqXHR: " + jqXHR.status + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
    			        }
        			
        			});        	
        	
        	
        }

    };

}();
