// JavaScript Document

var employee = function ()
{

    var test = "test_var";

    return {

        employee_load : function(name, company_no, phone){
            var gubun = "R";
            var iData = ['name', 'company_no', 'phone'];
            iData[0] = name;
            iData[1] = company_no;
            iData[2] = phone;
            var result = _DB_query.httpService("employee",gubun, iData);
            var res = result[0].data[0][0];
            $('#email').val(res.email);
            $('#jumin1').val(res.jumin1);
            $('#jumin2').val(res.jumin2);
            $('#name').val(res.name);
            $('#phone').val(res.phone);
            $('#bank_owner').val(res.bank_owner);
            $('#bank_name').val(res.bank_name);
            $('#bank_account').val(res.bank_account);





        },
        employee_sujung : function(){

            var gubun = "S";
            var iData = ['email','jumin1','jumin2','name','phone','bank_owner','bank_name','bank_account'];
            iData[0] = $('#email').val();
            iData[1] = $('#jumin1').val();
            iData[2] = $('#jumin2').val();
            iData[3] = $('#name').val();
            iData[4] = $('#phone').val();
            iData[5] = $('#bank_owner').val();
            iData[6] = $('#bank_name').val();
            iData[7] = $('#bank_account').val();


            var result = _DB_query.httpService("employee",gubun, iData);

            var msg = result[0].data[0][0].msg;
            var return_code = result[0].data[0][0].return_code;

            if(return_code =="100"){
                alert(msg);
                alert('로그아웃 하셔야 합니다.');
            }


            // 신상정보를 수정하면 재로그인 하도록,




        }



    };

}();



