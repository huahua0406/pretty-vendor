const BannerModel = require("../models/banner");

class BannerController {

    static async getBannerItems(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                let items = await BannerModel.getBannerItemsByID(id);
                let info = await BannerModel.getBannerItemInfo(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '查询成功',
                    data:{
                        items,
                        info
                    }
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
                msg: 'banner_id 必须传'
            }
        }
    }
}

module.exports = BannerController;