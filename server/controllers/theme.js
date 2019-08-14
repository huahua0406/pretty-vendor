const ThemeModel = require("../models/theme");

class ThemeController {

    static async getAllTheme(ctx){


      const result = await ThemeModel.getAll();

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

    static async getThemeItem(ctx){
        let theme_id = parseInt(ctx.params.id);
        if(theme_id){
          const result = await ThemeModel.getOne(theme_id);

          if(result){
            ctx.body = {
                code: 0,
                msg: '查询成功',
                data: result
            }
          }else{
            ctx.body = {
                code: -1,
                msg: '查询失败'
            }
          }

        }else{
          ctx.body = {
              code: -1,
              msg: '缺少参数product_id'
          }
        }
    }
}

module.exports = ThemeController;
