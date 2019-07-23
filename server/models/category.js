const db = require('../config/db')         // 引入配置文件
const Sequelize = db.sequelize;
const Category = Sequelize.import("../schema/category");
const Image = Sequelize.import("../schema/image");
const Product = Sequelize.import("../schema/product");

Category.sync({ force: false });    // 自动创建表 (加force:true, 会先删掉表后再建表)

Category.belongsTo(Image, {
    foreignKey: 'topic_img_id',
    targetKey: 'id',
    as: 'img'
})

Category.hasMany(Product,{
    foreignKey:'category_id',
    sourceKey:'id'
})

class CategoryModel {
    static async getAll(id){
        return await Category.findAll({
            include:[{
                model:Image,
                as: 'img',
                attributes: ['url']
            },{
                model:Product,
                include:[{
                    model:Image
                }],
                attributes:{
                    exclude:['img_id','category_id']
                }
            }],
            attributes:{
                exclude:['topic_img_id','update_time','delete_time']
            }
        });
    }
}

module.exports = CategoryModel;