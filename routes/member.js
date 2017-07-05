
var router_name = 'member';

function member(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

member.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/member/ajax.json

        var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);

        var email = data[0];
        var jumin1 = data[1];
        var jumin2 = data[2];
        var name = data[3];
        var phone = data[4];
        var bank_owner = data[5];
        var bank_name = data[6];
        var bank_account = data[7];
        var company_name = data[8];
        var company_id = data[9];
        var president = data[10];
        var c_phone = data[11];
        var c_fax = data[12];
        var c_postnum = data[13];
        var c_address1 = data[14];
        var c_address2 = data[15];
        var c_LawNumber = data[16];
        var c_bank_owner = data[17];
        var c_bank_name = data[18];
        var c_bank_account = data[19];


        if(gubun == 'president_register'){
            var query = "CALL _member_register('대표', '" +email +"','" +jumin1 +"','" +jumin2 +"','" +name +"','" +phone +"','" +jumin2 +"','"  +bank_owner +"','"  +bank_name +"','"  +bank_account +"'" +
                ",'"+company_name+"','"+company_id+"','"+president+"','"+c_phone+"','"+c_fax+"','"+c_postnum+"','"+c_address1+"','"+c_address2+"','"+c_LawNumber+"','"+c_bank_owner+"','"+c_bank_name+"','"+c_bank_account+"');";   //대표가 서비스를 처음 신청할 때
            console.log(query);
            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec
        }




    });

}

member.prototype.query_after = function(res, req, result)
{

    console.log(result);



}

module.exports = member;