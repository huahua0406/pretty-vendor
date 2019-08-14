const BannerModel = require("../models/banner");

class BannerController {

    static async getBannerById(ctx){
        const banner_id = parseInt(ctx.params.id);
        if(banner_id){
            try{
                let banner_items = await BannerModel.getBannerItems(banner_id);
                let banner_info = await BannerModel.getBannerInfo(banner_id);
                ctx.body = {
                    code: 0,
                    msg: '查询成功',
                    data:{
                        banner_items,
                        banner_info
                    }
                }
            }catch(err){
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    err
                }
            }
        }else {
            ctx.body = {
                code: -1,
                msg: '缺少banner_id参数'
            }
        }
    }
}

module.exports = BannerController;
