// 加入购物车中的商品
export const cartData = state => state.cartData
// 计算总数量
export const totalCount = (state, getters) => {
    let num = 0
    getters.cartData.forEach(item => {
        num += item.count
    })
    return num
}
// 计算购物车选中的总数量
export const selectedArr = (state, getters) => {
    let selectArr = []
    getters.cartData.forEach(item => {
        if (item.isChecked) {
            selectArr.push(item)
        }
    })
    return selectArr
}
// 计算总价
export const tolalPrice = (state, getters) => {
    // 避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，乘以 100 *100
    const multiple = 100
    let total = 0
    getters.cartData.forEach(item => {
        if (item.isChecked) {
            total += item.price * multiple * item.count * multiple
        }
    })
    return (total = total / (multiple * multiple))
}

export const userInfo = state => state.userInfo