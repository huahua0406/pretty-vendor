const CategoryModel = require("../models/category");

class CategotyController {

    static async getAllCategory(ctx){

      const result = await CategoryModel.getAll();

      if(result){
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: result
        }
      }else{
        ctx.body = {
            code: -1,
            msg: '查询失败',
        }
      }
    }
}

module.exports = CategotyController;
