var http = require('http');
var path = require('path')
var url = require('url')
var ecstatic = require('ecstatic')({defaultExt:'html',root:path.join(__dirname,'/web'),autoIndex:true,handleError:false})
var server = http.createServer(ecstatic)
server.listen(5150)

