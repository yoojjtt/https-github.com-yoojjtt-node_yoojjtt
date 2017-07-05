var multer = require('multer');

var http = require('http');
var fs = require('fs');
var gm = require('gm'); //섬네일 처리

var Common_libs = require("../libs/common_libs.js");

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var attachType = req.body.attachType;
        var ins_id = req.session.userId;
        var basic = 'uploads/';

        //폴더 확인 : 학원명
        var path = basic+ins_id;
        if (!fs.existsSync(path)) {
            fs.mkdir(path, 0755, function(err) {
                if(err) throw err;
                console.log('Created : '+path);
            });
        }

        //폴더 확인 : attachType
        path = path+'/'+attachType;
        if (!fs.existsSync(path)) {
            fs.mkdir(path, 0755, function(err) {
                if(err) throw err;
                console.log('Created : '+path);
            });
        }

        //폴더 확인 : 년도
        var D = new Date();
        var year = D.getFullYear();
        path = path+'/'+year;
        if (!fs.existsSync(path)) {
            fs.mkdir(path, 0755, function(err) {
                if(err) throw err;
                console.log('Created : '+path);
            });
        }

        //폴더 확인 : _thumb폴더
        var thumbPath = path+'/_thumb';
        if (!fs.existsSync(thumbPath)) {
            fs.mkdir(thumbPath, 0755, function(err) {
                if(err) throw err;
                console.log('Created : '+thumbPath);
            });
        }

        cb(null, path)
    },
    filename: function (req, file, cb) {

        var attachType = req.body.attachType;

        //console.log('attachType : ' + attachType);

        var filename = file.originalname;
        var _lastDot = filename.lastIndexOf('.');
        var _fileExt = filename.substring(_lastDot, filename.length).toLowerCase();

        var rFilename = attachType +'_' + Common_libs.prototype.toDate() + _fileExt;

        cb(null, rFilename)
    }
});
var upload = multer({ storage: _storage });




var router_name = 'fileUpload';

//sftp파일생성과 읽기 요청 기능
function fileUpload(router, parent)
{

    console.log('router '+router_name+' standby~~');

    var self = this;
    self.handleRoutes(router, parent);

}

fileUpload.prototype.handleRoutes = function(router, parent)
{
    var self = this;
    var parent = parent;

    router.post("/"+router_name+"/ajax.json", function(req, res) {

        var apiKey = req.body.apiKey;
        var gubun = req.body.gubun;
        var data = req.body.data;

        var msg = req.body.msg;

        msg = [msg, '파일업로드 에코'];
        res.send({result:true, msg:msg});

    });

    router.post("/"+router_name+"/S", upload.single('uploaded_file'), function(req, res) //Filedata
    {
        //<input type="file" name="uploaded_file"/>

        var relativeKey = req.body.relativeKey;
        var attachType = req.body.attachType;
        var ins_id = req.session.userId;
        var thumb_width = req.body.thumb_width;
        var thumb_height = req.body.thumb_height;
        var basic = 'uploads/';
        var D = new Date();
        var year = D.getFullYear();

        var file_name = req.file.filename;
        var originalname = req.file.originalname;

        //console.log(req.file);

        var _lastDot = file_name.lastIndexOf('.');
        var _fileExt = file_name.substring(_lastDot, file_name.length).toLowerCase();
        console.log(_fileExt, thumb_width);

        //sudo apt-get install graphicsmagick 필수~
        //섬네일 처리
        if(_fileExt=='.png' || _fileExt=='.jpg' || _fileExt=='.gif') {

            var path = basic+ins_id+'/'+attachType+'/'+year+'/';
            var _width = thumb_width;
            var _height = thumb_height;

            //섬네일을 만들지 않을때는 thumb_width = 0으로 보내라~
            if(thumb_width>0) {

                gm(path+file_name)//--> 가로값만 있으면 세로는 자동임. 찌그러지지 않고 비율에 맞쳐 만들어짐.. 좋아~
                    .size(function (err, size) {
                        if (!err) {
                            console.log('width = ' + size.width);
                            console.log('height = ' + size.height);
                            if(size.width > size.height) {
                                _width = thumb_height;
                                _height = thumb_width;
                            }

                            //console.log(_width, _height);
                            gm(path+file_name)
                                .thumb(_width, _height, path+'/_thumb/'+file_name, function (err) {
                                    if (err) console.error(err);
                                    else console.log('done - thumb');
                                });
                        }
                    });



            }
        }

        //추가시
        var db_key = 0;

        var query = "CALL file_S(" +
            db_key + ", " +
            "'" + attachType + "', " +
            relativeKey + ", " +
            "'" + file_name + "', " +
            "'" + originalname + "', " +
            "'" + ins_id + "'" +
            ")";

        console.log(query);
        parent.mysql_proc_exec(query, res, req, router_name);

        var return_data = {
            "data": file_name
        };
        res.json(return_data);

    });
}


module.exports = fileUpload;