const CategoryModel = require("../models/category");

class CategotyController {

    static async getAllCategory(ctx){
        try{
            let data = await CategoryModel.getAll();
            ctx.response.status = 200;
            ctx.body = {
                code: 0,
                msg: '查询成功',
                data
            }
        }catch(err){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查询失败',
                err
            }
        }
    }
}

module.exports = CategotyController;