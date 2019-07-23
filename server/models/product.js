const db = require('../config/db')         // 引入配置文件
const Sequelize = db.sequelize;
const Product = Sequelize.import("../schema/product");
const Image = Sequelize.import("../schema/image");
const ProductImage = Sequelize.import("../schema/product_image");
const ProductProperty = Sequelize.import("../schema/product_property");

Product.sync({ force: false });    // 自动创建表 (加force:true, 会先删掉表后再建表)

// Product-Image关联关系
Product.belongsTo(Image, {
    foreignKey: 'img_id',
    targetKey: 'id',
})
ProductImage.belongsTo(Image,{
    foreignKey:'img_id',
    targetKey:'id'
})
// Product-ProductImage关联关系
Product.hasMany(ProductImage,{
    foreignKey:'product_id',
    sourceKey:'id'
})

Product.hasMany(ProductProperty,{
    foreignKey:'product_id',
    sourceKey:'id'
})

class ProductModel {

    static async getAll(){
        return await Product.findAll({
            //过滤不需要的数据
            attributes:{
                exclude:['img_id','delete_time','update_time']
            }
        })
    }

    static async getRecent(){
        return await Product.findAll({
            //过滤不需要的数据
            attributes:{
                exclude:['img_id','delete_time','update_time']
            },
            limit:15
        })
    }

    static async getProductDetail(id){
        return await Product.findOne({
            include:[{
                model:Image,
                attributes:{
                    exclude:['id']
                }
            },{
                model:ProductImage,
                include:[{
                    model:Image
                }]
            },{
                model:ProductProperty,
                attributes:{
                    exclude:['id']
                }
            }],
            attributes:{
                exclude:['category_id','img_id']
            },
            where:{
                id
            }
        });
    }

}

module.exports = ProductModel;