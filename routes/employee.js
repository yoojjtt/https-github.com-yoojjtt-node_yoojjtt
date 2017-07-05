
var router_name = 'employee';

function employee(router, parent)  //  /m, Mobile_routerAct   생성자
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);  //  /m, Mobile_routerAct

}

employee.prototype.handleRoutes = function(router, parent)  //  /m, Mobile_routerAct
{
    var parent = parent;  //Mobile_routerAct

    router.post("/"+router_name+"/ajax.json", function(req, res) { //  /m/employee/ajax.json

        //var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;
        //console.log(apiKey);



        if(gubun =="R") {
            var name = data[0];
            var company_no = data[1];
            var phone = data[2];


            var query = "CALL employee_list_R('"+name+"','"+phone+"','"+company_no+"')";

            console.log(query);

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec


        }
        if(gubun =="S"){
            var email = data[0];
            var jumin1 = data[1];
            var jumin2 = data[2];
            var name = data[3];
            var phone = data[4];
            var bank_owner = data[5];
            var bank_name = data[6];
            var bank_account = data[7];

            var query = "CALL employee_list_S('','"+email+"','"+jumin1+"','"+jumin2+"','','"+name+"','"+phone+"','"+bank_account+"','"+bank_name+"','"+bank_owner +"')";

            console.log(query);

            parent.mysql_proc_exec(query, res, req, router_name); //Mobile_routerAct.mysql_proc_exec

        }


    });

}

employee.prototype.query_after = function(res, req, result, error)
{
    console.log(return_data);




}

module.exports = employee;