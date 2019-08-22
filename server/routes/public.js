const router = require('koa-router')()
const svgCaptcha = require('svg-captcha')
const multer=require('koa-multer')

router.prefix('/api/v1')

router.get('/public/getCaptcha',async (ctx) => {
    var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size:4,    //验证码长度
        fontSize:50,   //字体大小
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        width:100,
        height:40,
        background:'#eee'
    });
    console.log(captcha.text);
    // ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
});


//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });

router.post('/public/upload',upload.single('file'),async(ctx,next)=>{
    const prefix = 'http://118.31.77.247:3000/uploads/'
    ctx.body = {
      filename: prefix + ctx.req.file.filename//返回文件名
    }
})

module.exports = router
