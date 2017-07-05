
var router_name = 'family';

function family(router, parent)
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);

}

family.prototype.handleRoutes = function(router, parent)
{
    var parent = parent;

    router.post("/"+router_name+"/ajax.json", function(req, res) {

        var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;

        var ins_id = req.session.userId;

        //학원코드 없으면 에러
        if(ins_id=="") {
            var return_data = {
                "error": true,
                "data": "not ins_id"
            };

            res.json(return_data);
            return;
        }

        if(gubun=="R") {

            var fmailyKey = data[0];

            var query = "CALL family_R(" +
                "'" + ins_id + "', " +
                fmailyKey + ")";

            console.log(query);

            parent.mysql_proc_exec(query, res);

        }

        if(gubun=="S") {

            var db_key = data[0];
            var registDay = data[4];
            var gubunKey = data[1];
            var categoryCode = data[2];
            var studentKey = data[3];
            var tuitionKey = 0;
            var money = data[5];
            var bank = data[6];
            var memo = data[7];

            if(studentKey==null || studentKey=="") {
                studentKey = 0;
            }

            if(gubunKey==3) {
                gubunKey = 9;
                categoryCode = 100;
            }

            var query = "CALL _temp_S(" +
                db_key + ", " +
                "'" + registDay + "', " +
                gubunKey + ", " +
                categoryCode + ", " +
                studentKey + ", " +
                tuitionKey + ", " +
                money + ", " +
                bank + ", " +
                "'" + memo + "', " +
                "'" + ins_id + "'" +
                ")";

            console.log(query);
            parent.mysql_proc_exec(query, res);

        }

        if(gubun=="D") {

            var table = "_temp";
            var db_key = data[0];
            var query = "CALL data_delete(" +
                "'" + table + "', " +
                db_key + ")";

            console.log(query);
            parent.mysql_proc_exec(query, res);

        }

    });

}

module.exports = family;