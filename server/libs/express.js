import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';
import methodOverride from 'method-override';
import session from 'express-session';
import multer from 'multer';
import bodyParser from 'body-parser';
import compress from 'compression';
import path from 'path';
import fs from 'fs';
import cors from "cors";

import routes from '../server/routes';
import config from './env';

import errorHandler from 'errorhandler';
import https from 'https';
import http from 'http';
import passport from 'passport';
import db from './db';

const app = express();
app.use('/api', routes);
app.use(compress());
app.set('view engine', 'html');

app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, secret: 'secretpasswordforsessions' }));

// require('./config/passport')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// development only
if ('development' == app.get('env')) {
  app.use(logger('dev'));  
  app.use(errorHandler());
  app.set('views', path.join(__dirname, '/public/www'));
  app.use(favicon(__dirname + '/public/www/favicon.png'));
  app.use(express.static(path.join(__dirname, '/public')));
  console.log("dirname", __dirname);
} else if('staging' == app.get('env')) {
  app.use(errorHandler());
  app.set('views', path.join(__dirname, '/public/redstg/www'));
  app.use(favicon(__dirname + '/public/redstg/www/favicon.png'));
  app.use(express.static(path.join(__dirname, '/public/redstg')));
}else if('production' == app.get('env')) {
  app.use(errorHandler());
  app.set('views', path.join(__dirname, '/public/redprod/www'));
  app.use(favicon(__dirname + '/public/redprod/www/favicon.png'));
  app.use(express.static(path.join(__dirname, '/public/redprod')));
  app.use((req, res, next) => {
    if(req.headers['x-forwarded-proto']==='http') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  });
} else {
  console.log("ENV VAR ERROR");
}


app.use('/',APIuserWeb);
//app.use('/admin',APIadmin);
app.use('/mob',APIuserMobile);
app.use('/auth', auth);
app.all('/mob/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
  // If someone calls with method OPTIONS, let's display the allowed methods on our API
  if (req.method == 'OPTIONS') {
    res.status(200);
    res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
    res.end();
  } else {
    next();
  }
});
app.set('port', process.env.PORT || 3301);
app.set('sslport', process.env.SSLPORT || 4301);

db.open(function() {
  console.log("db is initialize...");
  APIuserMobile.inilocalmemusers(function(rta){
    console.log("ini mem local",rta);
  });
});
http.createServer(app).listen(app.get('port'));
if ('development' == app.get('env')) {
  https.createServer(options, app).listen(app.get('sslport'));
} else{
  https.createServer(app).listen(app.get('sslport'));
}
console.log("server http Representados Users is running at host: " + app.get('host') + " - port: " + app.get('port') +"- environment: "+ app.get('env'));
console.log("server https Representados Users is running at host: " + app.get('host') + " - port: " + app.get('sslport') +"- environment: "+ app.get('env'));