const Koa = require('koa');
const cors = require('@koa/cors');
var bodyParser = require('koa-bodyparser');
var jwtr = require('koa-jwt');
const authRouters = require('./auth-routers.js');
const publicRouters = require('./public-routers.js');

const app = new Koa();
app.use(bodyParser());
app.use(cors());

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function *(next){
    try {
      yield next;
    } catch (err) {
      if (401 == err.status) {
        this.status = 401;
        this.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        throw err;
      }
    }
  });

// Unprotected middleware
app.use(publicRouters.routes());

// Middleware below this line is only reached if JWT token is valid
app.use(jwtr({ secret: 'secret' }));

// Protected middleware
app.use(authRouters.routes());


app.listen(5000);