var express = require('express'); // 引用express模块
var app = express(); // 创建一个简单的服务器

var requestPort = 4001; // 请求页面跑在4001端口

app.use(express.static(__dirname + '/staticRes')); //3000端口的静态文件，即index.html


//跨域情境演示接口---------------------------------------------------------------------------------------------------------
app.get('/case', (req, res) => {
    res.send("Hello world from http://localhost:4001/case--get."); // 空格部分为表情，可能在编辑器不会显示
});
app.post('/case', (req, res) => {
    res.send("Hello world from http://localhost:4001/case---post."); // 空格部分为表情，可能在编辑器不会显示
});


//proxy跨域演示接口---------------------------------------------------------------------------------------------------------
app.get('/proxy1', (req, res) => {
    res.send("Hello world from Proxy  :)")
});
app.get("/proxy2", function (req, res) {
    res.send("I am here from 4001 ¬_¬");
})



//跨域cors-------被跨域方处理--------------------------------------------------------------------------------------------------
app.get('/cros', (req, res) => {
    res.send("Hello world from http://localhost:4001/cros  CROS--get."); // 空格部分为表情，可能在编辑器不会显示
});
app.post('/cros', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4000'); // 设置允许跨域的origin，允许4000端口访问本端口（4001）
    res.send("Hello world from http://localhost:4001/cros  CROS---post."); // 空格部分为表情，可能在编辑器不会显示
});
// app.all('*',function(req, res, next) {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:4000'); // 设置允许跨域的origin，允许4000端口访问本端口（4001）
//     //res.set('Access-Control-Allow-Methods', 'GET,PUT,DELETE'); // 设置允许跨域的请求方式
//     //res.set('Access-Control-Allow-Headers', 'x-requested-with,content-type'); // 设置允许跨域的响应头
//     return next();
// });


//跨域jsonp-------双方协作--------------改成post则请求失败------------------------------------------------------------------------------------
app.get('/jsonp', function (req, res) {
    var callbackName = req.query.callback;   
    res.send(callbackName+"({'message': 'hello world from http://localhost:4001/jsonp get JSONP!'});");
});
app.post('/jsonp', function (req, res) {
    var callbackName = req.query.callback;   
    res.send(callbackName+"({'message': 'hello world from http://localhost:4001/jsonp post JSONP!'});");
});



//跨域websocket---------------------------------------------------------------------------------------------------------
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function (client) {
    client.emit('data', 'Hello WebSocket from 4001.');
});



app.listen(requestPort, function() {
    console.log('Requester is listening on port ' + requestPort); // 在dos窗口会执行这个回调函数
});

//跨域websocket
// server.listen(requestPort, function() {
//     console.log('Requester is listening on port ' + requestPort); // 在dos窗口会执行这个回调函数
// });