// JavaScript Document

var member = function ()
{

    var test = "test_var";

    return {

        member_register : function(){

            var gubun = "president_register";
            var iData = ['email','jumin1','jumin2','name','phone','bank_owner','bank_name','bank_account'
            ,'company_name','company_id','president','c_phone','c_fax','c_postnum','c_address1','c_address2','c_LawNumber','c_bank_owner','c_bank_name','c_bank_account'];
            iData[0] = $('#email').val();
            iData[1] = $('#jumin1').val();
            iData[2] = $('#jumin2').val();
            iData[3] = $('#name').val();
            iData[4] = $('#phone').val();
            iData[5] = $('#bank_owner').val();
            iData[6] = $('#bank_name').val();
            iData[7] = $('#bank_account').val();
            iData[8] = $('#company_name').val();
            iData[9] = $('#company_id').val();
            iData[10] = $('#president').val();
            iData[11] = $('#c_phone').val();
            iData[12] = $('#c_fax').val();
            iData[13] = $('#c_postnum').val();
            iData[14] = $('#c_address1').val();
            iData[15] = $('#c_address2').val();
            iData[16] = $('#c_LawNumber').val();
            iData[17] = $('#c_bank_owner').val();
            iData[18] = $('#c_bank_name').val();
            iData[19] = $('#c_bank_account').val();



            //alert(iData[5]);
            var result = _DB_query.httpService("member",gubun, iData);

            var msg = result[0].data[0][0].msg;
            var return_code = result[0].data[0][0].return_code;
            if(return_code == '200'){
                alert(msg);
            }else if(return_code == '100'){
                alert(msg);
                location.href='/pages/login.html';
            }





        },
        employee_register : function(){




        }


    };

}();



