

/**
 * Initialisation options that can be given to DataTables at initialisation 
 * time.
 *  @namespace
 */
DataTable.defaults = {
	/**
	 * An array of data to use for the table, passed in at initialisation which 
	 * will be used in preference to any data which is already in the DOM. This is
	 * particularly useful for constructing tables purely in Javascript, for
	 * example with a custom Ajax call.
	 *  @type array
	 *  @default null
	 *  @dtopt Option
	 * 
	 *  @example
	 *    // Using a 2D array data source
	 *    $(document).ready( function () {
	 *      $('#example').dataTable( {
	 *        "aaData": [
	 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
	 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
	 *        ],
	 *        "aoColumns": [
	 *          { "sTitle": "Engine" },
	 *          { "sTitle": "Browser" },
	 *          { "sTitle": "Platform" },
	 *          { "sTitle": "Version" },
	 *          { "sTitle": "Grade" }
	 *        ]
	 *      } );
	 *    } );
	 *    
	 *  @example
	 *    // Using an array of objects as a data source (mData)
	 *    $(document).ready( function () {
	 *      $('#example').dataTable( {
	 *        "aaData": [
	 *          {
	 *            "engine":   "Trident",
	 *            "browser":  "Internet Explorer 4.0",
	 *            "platform": "Win 95+",
	 *            "version":  4,
	 *            "grade":    "X"
	 *          },
	 *          {
	 *            "engine":   "Trident",
	 *            "browser":  "Internet Explorer 5.0",
	 *            "platform": "Win 95+",
	 *            "version":  5,
	 *            "grade":    "C"
	 *          }
	 *        ],
	 *        "aoColumns": [
	 *          { "sTitle": "Engine",   "mData": "engine" },
	 *          { "sTitle": "Browser",  "mData": "browser" },
	 *          { "sTitle": "Platform", "mData": "platform" },
	 *          { "sTitle": "Version",  "mData": "version" },
	 *          { "sTitle": "Grade",    "mData": "grade" }
	 *        ]
	 *      } );
	 *    } );
	 */
	"aaData": null,


	/**
	 * If sorting is enabled, then DataTables will perform a first pass sort on 
	 * initialisation. You can define which column(s) the sort is performed upon, 
	 * and the sorting direction, with this variable. The aaSorting array should 
	 * contain an array for each column to be sorted initially containing the 
	 * column's index and a direction string ('asc' or 'desc').
	 *  @type array
	 *  @default [[0,'asc']]
	 *  @dtopt Option
	 * 
	 *  @example
	 *    // Sort by 3rd column first, and then 4th column
	 *    $(document).ready( function() {
	 *      $('#example').dataTable( {
	 *        "aaSorting": [[2,'asc'], [3,'desc']]
	 *      } );
	 *    } );
	 *    
	 *    // No initial sorting
	 *    $(document).ready( function() {
	 *      $('#example').dataTable( {
	 *        "aaSorting": []
	 *      } );
	 *    } );
	 */
	"aaSorting": [[0,'asc']],


	/**
	 * This parameter is basically identical to the aaSorting parameter, but 
	 * cannot be overridden by user interaction with the table. What this means 
	 * is that you could have a column (visible or hidden) which the sorting will 
	 * always be forced on first - any sorting after that (from the user) will 
	 * then be performed as required. This can be useful for grouping rows 
	 * together.
	 *  @type array
	 *  @default null
	 *  @dtopt Option
	 * 
	 *  @example
	 *    $(document).ready( function() {
	 *      $('#example').dataTable( {
	 *        "aaSortingFixed": [[0,'asc']]
	 *      } );
	 *    } )
	 */
	"aaSortingFixed": null,


	/**
	 * This parameter allows you to readily specify the entries in the length drop
	 * down menu that DataTables shows when pagination is enabled. It can be 
	 * either a 1D array of options which will be used for both the displayed 
	 * option and the value, or a 2D array which will use the array in the first 
	 * position as the value, and the array in the second position as the 
	 * displayed options (useful for language strings such as 'All').
	 *  @type array
	 *  @default [ 10, 25, 50, 100 ]
	 *  @dtopt Option
	 * 
	 *  @example
	 *    $(document).ready( function() {
	 *      $('#example').dataTable( {
	 *        "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
	 *      } );
	 *    } );
	 *  
	 *  @example
	 *    // Setting the default display length as well as length menu
	 *    // This is likely to be wanted if you remove the '10' option which
	 *    // is the iDisplayLength default.
	 *    $(document).ready( function() {
	 *      $('#example').dataTable( {
	 *        "iDisplayLength": 25,
	 *        "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]]
	 *      } );
	 *    } );
	 */
	"aLengthMenu": [ 10, 25, 50, 100 ],


	/**
	 * The aoColumns option in the initialisation parameter allows you to define
	 * details about the way individual columns behave. For a full list of
	 * column options that can be set, please see 
	 * {@link DataTable.defaults.columns}. Note that if you use aoColumns to
	 * define your columns, you must have an entry in the array for every single
	 * column that you have in your table (these can be null if you don't which
	 * to specify any options).
	 *  @member
	 */
	"aoColumns": null,

	/**
	 * Very similar to aoColumns, aoColumnDefs allows you to target a specific 
	 * column, multiple columns, or all columns, using the aTargets property of 
	 * each object in the array. This allows great flexibility when creating 
	 * tables, as the aoColumnDefs arrays can be of any length, targeting the 
	 * columns you specifically want. aoColumnDefs may use any of the column 
	 * options available: {@link DataTable.defaults.columns}, but it _must_
	 * have aTargets defined in each object in the array. Values in the aTargets
	 * array may be:
	 *   <ul>
	 *     <li>a string - class name will be matched on the TH 