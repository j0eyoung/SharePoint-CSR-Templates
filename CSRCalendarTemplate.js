//CSR Template for Document Libraries
// @author Edwin Young 
// 2017-12-14
(function() {
	'use strict';
	var applyStyle = function() {
		var cssText = ['.UpcomingEvent { background:lightblue; ',
									'padding:10px; font-size:13px; ',
									'color: #000; width:300px; ',
									'margin-bottom: 7.5px;border-radius: 10px; }'
								].join('');
		//add style block: http://stackoverflow.com/a/524715/632117
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
	//Must have the following column in the list view for JS Link to work correctly: Title, ID, StartDate, Location
		var title = ctx.CurrentItem.Title;
		var id = ctx.CurrentItem.ID;
		var eventdate = ctx.CurrentItem.EventDate;
		var tempDateTimeArray = eventdate.split(' ');
		var tempDateArray = tempDateTimeArray[0].split('/');
		var tempMonth = "";
		switch(tempDateArray[0]) {
			case "1":
				tempMonth = "January";
				break;
			case "2":
				tempMonth = "February";
				break;
			case "3":
				tempMonth = "March";
				break;
			case "4":
				tempMonth = "April";
				break;
			case "5":
				tempMonth = "May";
				break;
			case "6":
				tempMonth = "June";
				break;
			case "7":
				tempMonth = "July";
				break;
			case "8":
				tempMonth = "Aug.";
				break;
			case "9":
				tempMonth = "September";
				break;
			case "10":
				tempMonth = "October";
				break;
			case "11":
				tempMonth = "November";
				break;
			case "12":
				tempMonth = "December";
				break;
			default:
				tempMonth = "";
		}
		var tempDate = tempMonth+" "+tempDateArray[1];
		var location = ctx.CurrentItem.Location;
	    var html = ['<a style="text-decoration: none !important;" href="https://rmd.msc.fema.gov/BradTest/Lists/TestCalendarCSR/DispForm.aspx?ID=',id,'"><div class="UpcomingEvent"><tr><td rowspan="2">',tempDate,'</td><td><h3>', title, '</h3></td></tr><tr><td>',location,'</td></tr><br></div></a>'].join('');
	    return html;
	};

	var override = {
		Templates: {
	    Item: item,
	    Footer: '<table><tbody>',
	    Header: '</tbody></table>'
		},
	BaseViewID: 1,
	ListTemplateType: 106
	};

	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(override);
})();