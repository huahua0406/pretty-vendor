const UserAddressModel = require("../models/user_address");

class UserAddressController {
    
    static async addUserAddress(ctx){
        let req = ctx.request.body;
        let user_id = ctx.state.user.user_id
        if(req.name && req.mobile && req.province && req.city&&req.country&&req.detail){
            try{
                const result = await UserAddressModel.addAddressById(req,user_id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '用户地址保存成功',
                    data: {
                        address_id: result.id
                    }
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '用户地址保存失败',
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

    static async updateUserAddress(ctx){
        let req = ctx.request.body;
        let user_id = ctx.state.user.user_id
        if(req.name && req.mobile && req.province && req.city&&req.country&&req.detail){
            try{
                const result = await UserAddressModel.updateAddressById(req,user_id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '用户地址修改成功',
                    data: {
                        result
                    }
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '用户地址修改失败',
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

    static async getUserAddress(ctx){
        let user_id = ctx.state.user.user_id;
        if(user_id){
            try{
                let result = await UserAddressModel.getAddressById(user_id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '查询成功',
                    data:result
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
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                msg: 'user_id必须传'
            }
        }
    }

}

module.exports = UserAddressController;