const Koa = require('koa');
var cors = require('koa-cors');
const routers = require('./routers.js');

const app = new Koa();

app.use(cors());
app.use(routers.routes());


app.listen(5000);