//CSR Template for Document Libraries
// @author Edwin Young 
// 2017-12-14
(function() {
	'use strict';
	var applyStyle = function() {
		var cssText = ['.announcement { ',
							'background:#90EE90; ',
							'padding:10px; font-size:13px; ',
							'color: #000; width:300px; ',
							'margin-bottom: 7.5px;border-radius: 10px; }'
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
		//To add your own custom columns just add it to the list view and call it here
		var title = ctx.CurrentItem["Title"]; //Need to have Title column in List View
		var id = ctx.CurrentItem.ID; //Need to have ID column in list view
		var created = ctx.CurrentItem.Created; //Need to have Created column in list view
		var tempDateTimeArray = created.split(' '); 
		var tempDateArray = tempDateTimeArray[0];
		var tempTimeArray = tempDateTimeArray[1] + " " + tempDateTimeArray[2];
		var html = ['<a style="text-decoration: none !important;" href="https://{SharePointSite}/Lists/TestAnnouncementsCSR/DispForm.aspx?ID=',id,'"><div class="announcement"><tr><td rowspan="2"><h3>',title,'</h3></td><td>Posted: ', tempDateArray , '</td></tr><tr><td> at ',tempTimeArray ,'</td></tr><br></div></a>'].join('');
	    return html;                                                    //Use URL for Announcement list you are adding this CSR file to
	};
	var override = {
			Templates: {
			    Item: item,
			    Footer: '<table><tbody>',
			    Header: '</tbody></table>'
			},
		BaseViewID: 1,
		ListTemplateType: 104 //Needs to be 104 to work with Announcement List Views
	};
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(override);
})();