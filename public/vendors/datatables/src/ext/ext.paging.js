/*
 * Variable: oPagination
 * Purpose:  
 * Scope:    jQuery.fn.dataTableExt
 */
$.extend( DataTable.ext.oPagination, {
	/*
	 * Variable: two_button
	 * Purpose:  Standard two button (forward/back) pagination
	 * Scope:    jQuery.fn.dataTableExt.oPagination
	 */
	"two_button": {
		/*
		 * Function: oPagination.two_button.fnInit
		 * Purpose:  Initialise dom elements required for pagination with forward/back buttons only
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:nPaging - the DIV which contains this pagination control
		 *           function:fnCallbackDraw - draw function which must be called on update
		 */
		"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
		{
			var oLang = oSettings.oLanguage.oPaginate;
			var oClasses = oSettings.oClasses;
			var fnClickHandler = function ( e ) {
				if ( oSettings.oApi._fnPageChange( oSettings, e.data.action ) )
				{
					fnCallbackDraw( oSettings );
				}
			};

			var sAppend = (!oSettings.bJUI) ?
				'<a class="'+oSettings.oClasses.sPagePrevDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button">'+oLang.sPrevious+'</a>'+
				'<a class="'+oSettings.oClasses.sPageNextDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button">'+oLang.sNext+'</a>'
				:
				'<a class="'+oSettings.oClasses.sPagePrevDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><span class="'+oSettings.oClasses.sPageJUIPrev+'"></span></a>'+
				'<a class="'+oSettings.oClasses.sPageNextDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><span class="'+oSettings.oClasses.sPageJUINext+'"></span></a>';
			$(nPaging).append( sAppend );
			
			var els = $('a', nPaging);
			var nPrevious = els[0],
				nNext = els[1];
			
			oSettings.oApi._fnBindAction( nPrevious, {action: "previous"}, fnClickHandler );
			oSettings.oApi._fnBindAction( nNext,     {action: "next"},     fnClickHandler );
			
			/* ID the first elements only */
			if ( !oSettings.aanFeatures.p )
			{
				nPaging.id = oSettings.sTableId+'_paginate';
				nPrevious.id = oSettings.sTableId+'_previous';
				nNext.id = oSettings.sTableId+'_next';

				nPrevious.setAttribute('aria-controls', oSettings.sTableId);
				nNext.setAttribute('aria-controls', oSettings.sTableId);
			}
		},
		
		/*
		 * Function: oPagination.two_button.fnUpdate
		 * Purpose:  Update the two button pagination at the end of the draw
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           function:fnCallbackDraw - draw function to call on page change
		 */
		"fnUpdate": function ( oSettings, fnCallbackDraw )
		{
			if ( !oSettings.aanFeatures.p )
			{
				return;
			}
			
			var oClasses = oSettings.oClasses;
			var an = oSettings.aanFeatures.p;
			var nNode;

			/* Loop over each instance of the pager */
			for ( var i=0, iLen=an.length ; i<iLen ; i++ )
			{
				nNode = an[i].firstChild;
				if ( nNode )
				{
					/* Previous page */
					nNode.className = ( oSettings._iDisplayStart === 0 ) ?
					    oClasses.sPagePrevDisabled : oClasses.sPagePrevEnabled;
					    
					/* Next page */
					nNode = nNode.nextSibling;
					nNode.className = ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() ) ?
					    oClasses.sPageNextDisabled : oClasses.sPageNextEnabled;
				}
			}
		}
	},
	
	
	/*
	 * Variable: iFullNumbersShowPages
	 * Purpose:  Change the number of pages which can be seen
	 * Scope:    jQuery.fn.dataTableExt.oPagination
	 */
	"iFullNumbersShowPages": 5,
	
	/*
	 * Variable: full_numbers
	 * Purpose:  Full numbers pagination
	 * Scope:    jQuery.fn.dataTableExt.oPagination
	 */
	"full_numbers": {
		/*
		 * Function: oPagination.full_numbers.fnInit
		 * Purpose:  Initialise dom elements required for pagination with a list of the pages
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           node:nPaging - the DIV which contains this pagination control
		 *           function:fnCallbackDraw - draw function which must be called on update
		 */
		"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
		{
			var oLang = oSettings.oLanguage.oPaginate;
			var oClasses = oSettings.oClasses;
			var fnClickHandler = function ( e ) {
				if ( oSettings.oApi._fnPageChange( oSettings, e.data.action ) )
				{
					fnCallbackDraw( oSettings );
				}
			};

			$(nPaging).append(
				'<a  tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPageFirst+'">'+oLang.sFirst+'</a>'+
				'<a  tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPagePrevious+'">'+oLang.sPrevious+'</a>'+
				'<span></span>'+
				'<a tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPageNext+'">'+oLang.sNext+'</a>'+
				'<a tabindex="'+oSettings.iTabIndex+'" class="'+oClasses.sPageButton+" "+oClasses.sPageLast+'">'+oLang.sLast+'</a>'
			);
			var els = $('a', nPaging);
			var nFirst = els[0],
				nPrev = els[1],
				nNext = els[2],
				nLast = els[3];
			
			oSettings.oApi._fnBindAction( nFirst, {action: "first"},    fnClickHandler );
			oSettings.oApi._fnBindAction( nPrev,  {action: "previous"}, fnClickHandler );
			oSettings.oApi._fnBindAction( nNext,  {action: "next"},     fnClickHandler );
			oSettings.oApi._fnBindAction( nLast,  {action: "last"},     fnClickHandler );
			
			/* ID the first elements only */
			if ( !oSettings.aanFeatures.p )
			{
				nPaging.id = oSettings.sTableId+'_paginate';
				nFirst.id =oSettings.sTableId+'_first';
				nPrev.id =oSettings.sTableId+'_previous';
				nNext.id =oSettings.sTableId+'_next';
				nLast.id =oSettings.sTableId+'_last';
			}
		},
		
		/*
		 * Function: oPagination.full_numbers.fnUpdate
		 * Purpose:  Update the list of page buttons shows
		 * Returns:  -
		 * Inputs:   object:oSettings - dataTables settings object
		 *           function