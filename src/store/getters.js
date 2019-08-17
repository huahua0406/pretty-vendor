const getters = {
    userInfo: state => state.user.userInfo,
    cartList: state => state.cart.cartList,
    checkedGoodsList: state => {
        let tempArr = [];
        state.cart.cartList.forEach(item => {
            if (item.isChecked) {
                tempArr.push(item);
            }
        });
        return tempArr;
    },
    totalCount: state => {
        let num = 0;
        state.cart.cartList.forEach(item => {
            num += item.count;
        });
        return num;
    },
    tolalPrice: state => {
        // 避免 0.05 + 0.01 = 0.060 000 000 000 000 005 的问题，=> 0.05x100 * 0.01 x100 / 100 * 100
        const multiple = 100;
        let amount = 0;
        state.cart.cartList.forEach(item => {
            if (item.isChecked) {
                amount += item.price * multiple * item.count * multiple;
            }
        });
        return (amount = amount / (multiple * multiple));
    }
};

export default getters;
