const ProductModel = require("../models/product");

class ProductController {

    static async getAllProduct(ctx){
        try{
            let data = await ProductModel.getAll();
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

    static async getRecentProduct(ctx){
        try{
            let data = await ProductModel.getRecent();
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

    static async getProductDetail(ctx){
        let id = ctx.params.id;
        try{
            let data = await ProductModel.getProductDetail(id);
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
                data: err
            }
        }
    }
}

module.exports = ProductController;