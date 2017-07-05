var mysql = require("mysql");


var Config = require('../service_config.js');
var Con = new Config();

/** @namespace Con.db_config */
var dbConnection = mysql.createPool(Con.db_config);

var Member = require("./member.js");  //서비스 신청, 직원등록
var Auth = require("./auth.js"); //로그인
var Employee = require("./employee.js"); // 직원 정보 수정, 직원정보 로드


function Mobile_routerAct(router)   //  생성자, 매개변수의 인자값  /m
{
    var self = this;
    self.handleRoutes(router);  //Mobile_routerAct.handleRoutes(/m)
    console.log('router standby~~');

    //sqltest (프로시져 테스트)
    var member = new Member(router, this);
    var auth = new Auth(router, this);
    var employee = new Employee(router, this);





}



Mobile_routerAct.prototype.handleRoutes = function(router)
{
    router.get('/ajax.json', function(req, res) {   //m/ajax.json  => 이경로로 가면 json객체 출력된다.
        res.json({"Message" : "Hello Moblie!"});
    });

    //test
    router.post('/ajax.json', function(req, res) {  // 포스트 방식으로 /m/ajax.json
        //필수
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        var msg = req.body.msg;

        msg = [msg, '에코'];
        res.send({result:true, msg:msg});
    });
}


Mobile_routerAct.prototype.mysql_proc_exec = function(query, res, req, router_name, parent, i, repeat_num)
{

    dbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수

        if (err){
            console.log(err);
        }

        connection.query(query, function(err, result) {  //query를 던짐

            var error = false;  // 에러가 없다면 false
            if(err) {
                error = true;  // 에러가 있다면 true
                console.log(err);  //console창에 error값 출력
                //console.log(result);

            }

            if(router_name=='auth') {
                Auth.prototype.query_after(res, req, result, error);
            }
            /*
            else if(router_name=='MobileUI/Driver_login') {
                MobileUI.prototype.Driver_login_query_after(res, req, result);
            }
            else if(router_name=='admin_login') {
                Admin_login.prototype.query_after(res, req, result);
            }
            else if(router_name=="fileUpload") {
                //응답 보류~(자체해결)
            }
            else if(router_name=="gps/U") {

                //마지막에 응답
                if(i==(repeat_num-1)) {

                    GPS.prototype.gps_update_after_update(result, res, req, parent, repeat_num);
                    //connection.release();

                }

            }
            else if(router_name=="SMS/S") {

                //마지막에 응답
                if(i==(repeat_num-1)) {

                    SMS.prototype.SMS_send_after_update(result, res, req, parent, repeat_num);
                    //connection.release();

                }

            }*/
            else {  // 정상적으로 query가 실행된경우 json을 response해준다. ==>요청한 곳으로
                var return_data = {
                    "error": error,
                    "data": result
                };
                res.json(return_data);
            }
            connection.release();

        });


    });
};

module.exports = Mobile_routerAct;