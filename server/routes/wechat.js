const router = require('koa-router')()
const getRawBody = require('raw-body')
var https = require('https')

router.prefix('/wechat')

const wechat = require('../config/wechat') 
const util = require('../utils/util') 

// 配置get路由
router.get('/', async (ctx, next) => {
    console.log(ctx.query);
    const { signature, timestamp, nonce, echostr } = ctx.query
    const TOKEN = wechat.token
    if (signature === util.getSignature(timestamp, nonce, TOKEN)) {
        return ctx.body = echostr
    }else{
        ctx.body = 'Invalid signature'
    }
})

// 配置post路由
router.post('/', async (ctx, next) => {
    try{
        // TODO
        // 取原始数据
        var xml = await getRawBody(ctx.req,{
            length: ctx.request.length,
            limit: "1mb",
            encoding: ctx.request.charset
        });
        var content = await util.parseXMLAsync(xml);
        var message= util.formatMessage(content.xml);
        console.log(message);
        if(message.MsgType==='event'){
            if(message.Event==='subscribe'){//关注
                var createTime = Date.parse(new Date())/1000;
                ctx.type='application/xml';
                var reply=`<xml> 
                            <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                            <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                            <CreateTime>${createTime}</CreateTime>
                            <MsgType><![CDATA[text]]></MsgType>
                            <Content><![CDATA[终于等到你，还好我没放弃，欢迎关注huahua测试公众号！]]></Content>
                        </xml>`;
                ctx.body=reply;
            }
        }else{ //其他情况
            var createTime = Date.parse(new Date())/1000;
            ctx.type='application/xml';
            var reply = `<xml>
                            <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                            <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                            <CreateTime>${createTime}</CreateTime>
                            <MsgType><![CDATA[text]]></MsgType>
                            <Content><![CDATA[啊~啊~啊~你在发什么消息？]]></Content>
                        </xml>`
            ctx.body = reply;
        }
    }catch(err){
        console.log(err);
    }
})

// TODO https://www.jb51.net/article/140296.htm
// https://www.jianshu.com/p/cd3aa64cef23
// https://blog.csdn.net/m0_37805167/article/details/84327354

// 创建微信公众号菜单
router.post('/createMenu', async (ctx, next) => {
    try{
        const appID = wechat.appID
        const appSecret = wechat.appSecret
        const retToken = await getAccessToken(appID, appSecret)
        const { access_token } = retToken
        console.log(access_token);//
        result = await makeMenu(access_token)

        ctx.body = {
            result
        }
    }catch(err){
        console.log(err);
    }
});

// https://blog.csdn.net/qq_28832135/article/details/53503863
// https://www.jianshu.com/p/104b63e95653

function getAccessToken(appid, appsecret) {
    return new Promise((resolve, reject) => {
        const get_token_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
        https
            .get(get_token_url, res => {
                res.setEncoding('utf8') // 设置编码为 utf8
                let rawData = '' // 原始数据
                res.on('data', chunk => {
                    rawData += chunk
                })
                res.on('end', () => {
                    let jsonData = JSON.parse(rawData)
                    resolve(jsonData)
                })
            })
            .on('error', err => {
                reject(err)
            })
    })
}


function makeMenu(access_token){

    return new Promise((resolve, reject) => {
        var postData = JSON.stringify({
            button:[{
                "type":"view",
                "name":"搜索",
                "url":"http://www.soso.com/"
            }]
        })
        var options = {
            hostname: 'api.weixin.qq.com',
            path: `/cgi-bin/menu/create?access_token=${access_token}`,
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Content-Length':Buffer.byteLength(postData)
            }
        };
        const req = https.request(options, (res) => {
            let rawData = '' // 原始数据
            res.on('data', (chunk) => {
                rawData += chunk
            });
            res.on('end', () => {
                let jsonData = JSON.parse(rawData)
                resolve(jsonData)
            })
        });
        req.on('error', (err) => {
            console.error(err);
            reject(err)
        });

        req.write(postData);
        req.end();
    })
}

module.exports = router