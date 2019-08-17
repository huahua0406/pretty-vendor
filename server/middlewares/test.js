module.exports = function() {
    return async function(ctx, next) {
        test(ctx);
        await next(); //运行完毕，交给下一个中间件
    };
};

function test(ctx) {
    global.console.log('test middleware');
}
