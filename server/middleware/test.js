module.exports=function(){
    return async function(ctx,next){
        test(ctx);
        await next();//运行完毕，交给下一个中间件
    }
}

function test(ctx){
    global.console.log('test middleware')
}


// 参考地址：

// https://blog.csdn.net/qq_32685139/article/details/82975607
// https://www.jianshu.com/p/858eb70d220f