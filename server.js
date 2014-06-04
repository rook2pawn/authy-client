var http = require('http');
var path = require('path')
var qs = require('querystring')
var url = require('url')
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var directory = require('serve-static')
app.use(directory('web'))
app.use(bodyParser())
var server = http.createServer(app);
var request = require('request');
var response = require('response');

var prod = {
    url:'https://api.authy.com',
    key:'f6e1b0c0898c4abba10b002034220fa3'
}
app.post('/auth/phone',function(req,res) {
    var produrl = prod.url+'/protected/json/phones/verification/start?api_key='+prod.key
    request.post({url:produrl,json:true,body:qs.stringify(req.body)},function(err,resp,body) {
        if (body.success === true) {
            response.json({result:'success'}).pipe(res)
        } else  {
            response.json({result:'error'}).status(400).pipe(res)
        }
    });
})
app.post('/auth/phone/validate',function(req,res) {
    var obj = {api_key:prod.key,phone_number:req.body.phone_number,country_code:req.body.country_code,verification_code:req.body.token}
    var produrl = prod.url+'/protected/json/phones/verification/check'
    request.get({url:produrl,qs:obj,json:true},function(err,resp,body) {
        if (body.success === true) {
            response.json({result:'success'}).pipe(res)
        } else  {
            response.json({result:'error'}).status(400).pipe(res)
        }
    })
});
server.listen(5150)

