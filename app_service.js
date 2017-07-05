var express = require('express');
var path = require('path');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser  = require("body-parser");

var Config = require('./service_config.js');
var Con = new Config();

var app = express();
var Mobile_routerAct = require('./routes/_routerAct.js');


app.use(session({
    secret: 'yoojjtt695032@gmail.com',
    resave: false,
    saveUninitialized: true,
    store : new MySQLStore(Con.db_config)
}));


function Mobile_start() {
    var self = this;
    self.configureExpress();
}

Mobile_start.prototype.configureExpress = function()
{
    var self = this;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, 'public')));



    //app.use('/m/uploads', express.static('uploads'));
    //app.use('/update', express.static('update'));

    var router = express.Router();
    app.use('/m', router);

    var mobile_routerAct = new Mobile_routerAct(router);  //  /m경로를 router에 할당해서 인자값으로 전달



    self.startServer();
}

Mobile_start.prototype.startServer = function()
{
    var port = 3001;
    app.listen(port, function() {
        console.log('connection for Mobile' + port);
    });
}

new Mobile_start();   //생성자, 객체를 할당

