const UserModel = require("../models/user");
const jwt = require('jsonwebtoken')

class UserController {
    /**
     * 注册
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async register(ctx){
        //接收客户端参数
        let req = ctx.request.body;
        if(req.username && req.password){
            try{
                const result = await UserModel.checkUser({
                    username:req.username,
                    password:req.password
                })
                if(result !== null){
                    return ctx.body = {
                        code: -1,
                        msg: '该用户名已存在',
                        checkUser
                    }
                }

                const user = await UserModel.createUser(req);

                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '注册成功',
                    data:{
                        user_id: user.id
                    }
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '注册失败',
                    err
                }
            }
        }else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                msg: '参数不全'
            }
        }
    }

    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx){
        //接收客户端
        let req = ctx.request.body;
        if(req.username && req.password){
            try{
                const result = await UserModel.findUser(req);
                //查询空时为null https://blog.csdn.net/flytam/article/details/78755367
                if(result===null){
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 0,
                        msg: '用户名或密码错误❌',
                        data: result
                    }
                }else{
                    const payload = {
                        user_id: result.id,
                        username: result.username
                    }
                    // const secret = 'secret'
                    // const token = jwt.sign(payload, secret, { expiresIn: 60*60 }); // 60 * 60 or '1h'

                    const token = getToken(payload)

                    ctx.response.status = 200;
                    ctx.body = {
                        code: 0,
                        msg: '登录成功',
                        token
                    }
                }

            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '登录失败',
                    err
                }
            }
        }else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                msg: '参数不合法'
            }
        }
    }

    /**
     * 获取用户信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getUserInfo(ctx){
        // 1.可以直接用过ctx.state.user获取payload
        const data = ctx.state.user;
        // 2.前端访问时会附带token在请求头
        // const payload = getJWTPayload(ctx.headers.authorization)
        if(data.user_id){
            try{
                let result = await UserModel.userInfo(data.user_id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    result
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    err
                }
            }
        }else {
            ctx.response.status = 200;
            ctx.body = {
                code: -1,
                msg: '缺少user_id'
            }
        }
    }
}


/* 获取一个期限为1小时的token */
function getToken(payload = {}) {
    return jwt.sign(payload, 'secret', { expiresIn: '1h' });
}

/* 通过token获取JWT的payload部分 */
function getJWTPayload(token) {
    // 验证并解析JWT
    return jwt.verify(token.split(' ')[1], 'secret');
}


module.exports = UserController;