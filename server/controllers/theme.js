const ThemeModel = require("../models/theme");

class ThemeController {

    static async getAllTheme(ctx){
        try{
            let data = await ThemeModel.getAll();
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

    static async getThemeItem(ctx){
        let id = ctx.params.id;
        try{
            let data = await ThemeModel.getOne(id);
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

module.exports = ThemeController;