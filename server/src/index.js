const Koa = require('koa');
const cors = require('@koa/cors');
var bodyParser = require('koa-bodyparser');
const routers = require('./routers.js');

const app = new Koa();
app.use(bodyParser());
app.use(cors());
app.use(routers.routes());



app.listen(5000);