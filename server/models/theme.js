const db = require('../config/db'); // 引入配置文件
const Sequelize = db.sequelize;

const Theme = Sequelize.import('../schema/theme');
const ThemeProduct = Sequelize.import('../schema/theme_product');

const Product = Sequelize.import('../schema/product');
const Image = Sequelize.import('../schema/image');

Theme.sync({ force: false }); // 自动创建表 (加force:true, 会先删掉表后再建表)

// theme关系
Theme.belongsTo(Image, {
    foreignKey: 'head_img_id',
    targetKey: 'id',
    as: 'head_img'
});

Theme.belongsTo(Image, {
    foreignKey: 'topic_img_id',
    targetKey: 'id',
    as: 'topic_img'
});

Theme.belongsToMany(Product, {
    through: ThemeProduct,
    foreignKey: 'theme_id'
});

Product.belongsToMany(Theme, {
    through: ThemeProduct,
    foreignKey: 'product_id'
});

class ThemeModel {
    static async getAll() {
        return await Theme.findAll({
            include: [
                {
                    model: Image,
                    as: 'head_img',
                    attributes: ['url']
                },
                {
                    model: Image,
                    as: 'topic_img',
                    attributes: ['url']
                },
                {
                    model: Product,
                    include: [
                        {
                            model: Image
                        }
                    ],
                    attributes: {
                        exclude: ['img_id']
                    }
                }
            ],
            attributes: {
                exclude: ['topic_img_id', 'head_img_id']
            }
        });
    }

    static async getOne(id) {
        return await Theme.findOne({
            include: [
                {
                    model: Image,
                    as: 'head_img',
                    attributes: ['url']
                },
                {
                    model: Image,
                    as: 'topic_img',
                    attributes: ['url']
                },
                {
                    model: Product,
                    include: [
                        {
                            model: Image
                        }
                    ],
                    attributes: {
                        exclude: ['img_id']
                    }
                }
            ],
            attributes: {
                exclude: ['topic_img_id', 'head_img_id']
            },
            where: {
                id
            }
        });
    }
}

module.exports = ThemeModel;
