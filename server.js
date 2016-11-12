var express = require('express')
var serveStatic = require('serve-static')
var compression = require('compression')
var port = process.env.PORT || 3000;
var domain =  process.env.DOMAIN;

function ensureDomain(req, res, next){
  if(!domain || req.hostname === domain){
    // OK, continue
    return next();
  };
  res.redirect('http://'+domain+req.url); // handle port numbers if you need non defaults
};


var app = express()
app.all('*', ensureDomain); // at top of routing calls
app.use(compression())
app.use(serveStatic(__dirname + '/public', {'extensions': ['html']}))
app.listen(port, function(){
  console.log('server running ...');
});
