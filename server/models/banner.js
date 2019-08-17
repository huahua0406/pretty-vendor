const db = require('../config/db')         // 引入配置文件
const Sequelize = db.sequelize;
const BannerItem = Sequelize.import("../schema/banner_item");
const Banner = Sequelize.import("../schema/banner");
const Image = Sequelize.import("../schema/image");

BannerItem.sync({ force: false });    // 自动创建表 (加force:true, 会先删掉表后再建表)

// 定义BannerItem-Image关联关系
BannerItem.belongsTo(Image, {
    foreignKey: 'img_id',
    targetKey: 'id',
    as: 'img'
})


class BannerModel {

    static async getBannerInfo(id){
        return await Banner.findOne({
            where:{
                id
            },
            attributes:['name','description', ['id', 'banner_id']] //将id属性重命名为banenr_id
        });
    }

    static async getBannerItems(banner_id){
        return await BannerItem.findAll({
            where:{
                banner_id
            },
            //声明要包含的模型，之前声明的关系将在这里发挥作用
            include:[{
                model:Image,
                as: 'img',
                attributes: ['url']
            }],
            //过滤不需要的数据
            attributes:{
                include:['key_word'],
                exclude:['img_id','id','delete_time','update_time']
            }
        });
    }
}

module.exports = BannerModel;
