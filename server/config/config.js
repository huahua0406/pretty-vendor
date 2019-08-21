module.exports = {
    db: {
        host: 'localhost',
        database: 'vendor',
        user: 'root',
        password: ''
    },
    jwt: {
        secret: 'secret',
        expiresIn: '1h'
    },
    wechat: {
        appID: 'wx6ba8da52cc23c927', //填写你自己的appID
        appSecret: 'c11fd7eca16a1c690fb8f436093182c1', //填写你自己的appSecret
        token: 'wechat' //填写你自己的token
    }
};
