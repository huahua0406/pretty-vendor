/**
 * 生成随机字符串(可指定长度)
 * @param len
 * @return {string}
 */
export function randomString(len) {
    len = len || 8
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    /**  默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1**/
    var maxPos = $chars.length
    var str = ''
    for (var i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
}
