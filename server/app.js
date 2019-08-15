const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

// 配置文件
const config = require('./config/config')

// routes
const index = require('./routes/index')
const user = require('./routes/user')
const user_address = require('./routes/user_address')
const banner = require('./routes/banner')
const product = require('./routes/product')
const category = require('./routes/category')
const theme = require('./routes/theme')
const wechat = require('./routes/wechat')
const public = require('./routes/public')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//cors
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true);
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            // 未授权，访问被拒绝
            ctx.body = {
                code: 401,
                msg: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err;
        }
    });
});

/* 路由权限控制 */
app.use(jwt({
    secret: config.jwt.secret
}).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [
        /\/api\/v1\/user\/register/,
        /\/api\/v1\/user\/login/,
        /\/api\/v1\/public\/getCaptcha/,
        /\/api\/v1\/public\/upload/,
        /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
}));

/*自定义中间件*/
// const test = require('./middlewares/test')
// app.use(test())
/**************/

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(user_address.routes(), user_address.allowedMethods())
app.use(banner.routes(), banner.allowedMethods())
app.use(product.routes(), product.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(theme.routes(), theme.allowedMethods())
app.use(wechat.routes(), wechat.allowedMethods())
app.use(public.routes(), public.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
