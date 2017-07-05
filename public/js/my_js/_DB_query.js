	// JavaScript Document

	var send_url = "/m/"; //httpService/ajax.json";

	var _DB_query = function () {
	
		return {
			
			_init : function () {
				
				
				
			},
			httpService : function (proc, gubun, data) {

				var tmp_arr = new Array();

				$.ajax({
					url: send_url+proc+'/ajax.json',
					crossDomain:true,
					dataType: 'json',
					type: 'POST',
					async:false,
					data:{ gubun:gubun, data:data },

					success: function(data) {

						if ( data['error'] == false ) { //에러없으면..

							//console.log(data['type']);

                            if (data['type'] == "CUD") {
                                $.each(data, function(){

                                    tmp_arr.push(data);

                                });
                            }
                            else {
                                var i=0;
                                $.each(data, function(){

                                    //console.log(i);
                                    if(i==1) {
                                        tmp_arr.push(data);
                                    }

                                    i++;

                                });
                            }

						}

					}

				});

				return tmp_arr;

			},

			
		};
		
	}();
	
	