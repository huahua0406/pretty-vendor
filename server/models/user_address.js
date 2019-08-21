const db = require('../config/db'); // 引入配置文件
const Sequelize = db.sequelize;
const UserAddress = Sequelize.import('../schema/user_address');
UserAddress.sync({ force: false }); // 自动创建表 (加force:true, 会先删掉表后再建表)

class UserAddressModel {
    static async addAddressById(data, user_id) {
        try {
            return await UserAddress.create({
                name: data.name,
                mobile: data.mobile,
                province: data.province,
                city: data.city,
                country: data.country,
                detail: data.detail,
                user_id: user_id
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async updateAddressById(data, user_id) {
        try {
            return await UserAddress.update(
                {
                    name: data.name,
                    mobile: data.mobile,
                    province: data.province,
                    city: data.city,
                    country: data.country,
                    detail: data.detail
                },
                {
                    where: {
                        user_id
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    static async getAddressById(user_id) {
        try {
            return await UserAddress.findOne({
                where: {
                    user_id
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserAddressModel;
