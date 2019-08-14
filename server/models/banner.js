const db = require('../config/db')         // 引入配置文件
const Sequelize = db.sequelize;
const BannerItem = Sequelize.import("../schema/banner_item");
const Banner = Sequelize.import("../schema/banner");
const Image = Sequelize.import("../schema/image");

BannerItem.sync({ force: false });    // 自动创建表 (加force:true, 会先删掉表后再建表)

/**********/
// 注意点：
// 1. type 如果不存在则直接用字符串表示 如：’TIMESTAMP’;
// 2. 如果需要在更新表字段时记录更新时间，可应使用 updateAt，并设置默认值和对应的字段名。
// 3. 如果默认值不是具体的数值，可以用 literal 函数去表示。
// 4. tableName 表名，u 为别名。
// 5. 建立关联关系时，如果外键关联的是主键则不用写 targetKey，否则需要。
/****************/

// https://blog.csdn.net/lvyuan1234/article/details/87010463



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
