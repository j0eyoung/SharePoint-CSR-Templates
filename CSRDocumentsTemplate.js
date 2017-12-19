//CSR Template for Document Libraries
// @author Edwin Young 
// 2017-12-14
//Creates blocks for each document and when the box is clicked it will download or open the file depending on file type and browser being used
(function() {
	'use strict';
	var applyStyle = function() {
		//Sets the style of the blob
		var cssText = ['.documentType {',
							'background:#FF8784; ',
							'padding:10px; font-size:13px; ',
							'color: #000; width:300px; ',
							'margin-bottom: 7.5px;',
							'border-radius: 10px;}'
						].join('');
		var styleNode = document.createElement('style');
		styleNode.type = "text/css";
		if(!!(window.attachEvent && !window.opera)) {
	    	styleNode.styleSheet.cssText = cssText;
		} else {
	    	var styleText = document.createTextNode(cssText);
	    	styleNode.appendChild(styleText);
		}
		document.getElementsByTagName('head')[0].appendChild(styleNode);
	}
	applyStyle();
	var item = function(item) {
		//If you want to use data from a column it must be included in the list view
		var title = ctx.CurrentItem["FileLeafRef"]; //Gets title of document with extension PLUS: this is an invisible column no need to add to ListView
		var link = ctx.CurrentItem["_dlc_DocIdUrl"]; //column used to store Document ID which can be used to link to actual document
		var created = ctx.CurrentItem.Created; // Created date and time
		var tempDateTimeArray = created.split(' '); 
		var tempDateArray = tempDateTimeArray[0]; 
		var tempTimeArray = tempDateTimeArray[1] + " " +tempDateTimeArray[2];
		var html = ['<a style="text-decoration: none !important;" href="https://rmd.msc.fema.gov',link ,'"><div class="documentType"><tr><td rowspan="2"><h3>',title,'</h3></td><td>Posted: ', tempDateArray , '</td></tr><tr><td> at ',tempTimeArray ,'</td></tr><br></div></a>'].join('');
	    return html;
	};
	var override = {
			Templates: {
		    Item: item,
		    Footer: '<table><tbody>',
		    Header: '</tbody></table>'
		},
		BaseViewID: 1,
		ListTemplateType: 101
	};
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(override);
})();