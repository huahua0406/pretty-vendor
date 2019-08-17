const db = require('../config/db'); // 引入配置文件
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/user');
User.sync({ force: false }); // 自动创建表 (加force:true, 会先删掉表后再建表)

class UserModel {
    /**
     * 注册
     * @param data
     * @returns {Promise<*>}
     */
    static async createUser(data) {
        return await User.create({
            username: data.username,
            password: data.password
        });
    }

    /**
     * 检查用户名称是否存在
     * @param data
     * @returns {Promise<*>}
     */
    static async checkUser(data) {
        return await User.findOne({
            where: {
                username: data.username
            }
        });
    }

    /**
     * 查询用户
     * @param data
     * @returns {Promise<*>}
     */
    static async findUser(data) {
        return await User.findOne({
            where: {
                username: data.username,
                password: data.password
            }
        });
    }

    /**
     * 获取用户信息
     * @param id  用户id
     * @returns {Promise<Model>}
     */
    static async userInfo(id) {
        return await User.findByPk(id);
    }
}

module.exports = UserModel;
