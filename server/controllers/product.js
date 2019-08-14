const ProductModel = require("../models/product");

class ProductController {

    static async getAllProduct(ctx){

        const result = await ProductModel.getAll();

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
    }

    static async getRecentProduct(ctx){

      const result = await ProductModel.getRecent();

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

    }

    static async getProductDetail(ctx){
        let product_id = parseInt(ctx.params.id);
        if(product_id){
          const result = await ProductModel.getProductDetail(product_id);

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

module.exports = ProductController;
