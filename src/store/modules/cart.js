import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        cartList: JSON.parse(localStorage.getItem('cartList')) || []
    },

    mutations: {
        ADD_TO_CART(state, product) {
            let { id, count } = product;
            // 判断当前添加的商品是否存在购物车数组中
            let record = state.cartList.find(n => n.id === id);
            if (!record) {
                state.cartList.push(product);
            } else {
                record.count += count;
            }
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
        },
        ADD_PRODUCT(state, index) {
            state.cartList[index].count++;
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
        },
        CUT_PRODUCT(state, index) {
            if (state.cartList[index].count === 1) return;
            state.cartList[index].count--;
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
        },
        DELETE_PRODUCT(state, index) {
            state.cartList.splice(index, 1);
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
        },
        TOGGLE_SINGLE_CHECKED(state, index) {
            let item = state.cartList[index];
            if (typeof item.isChecked === 'undefined') {
                let newItem = Object.assign({}, item, { isChecked: true });
                state.cartList.splice(index, 1, newItem);
            } else {
                state.cartList[index].isChecked = !state.cartList[index].isChecked;
            }
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
        },
        TOGGLE_ALL_CHECKED(state, flag) {
            let data = state.cartList;
            let len = state.cartList.length;
            for (let i = 0; i < len; i++) {
                Vue.set(data[i], 'isChecked', !flag)
            }
            state.cartList = data;
            localStorage.setItem('cartList', JSON.stringify(state.cartList));
        }
    },

    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        addProduct({ commit }, index) {
            commit('ADD_PRODUCT', index);
        },
        cutProduct({ commit }, index) {
            commit('CUT_PRODUCT', index);
        },
        delProduct({ commit }, index) {
            commit('DELETE_PRODUCT', index);
        },
        toggleSingleChecked({ commit }, id) {
            commit('TOGGLE_SINGLE_CHECKED', id);
        },
        toggleAllChecked({ commit }, flag) {
            commit('TOGGLE_ALL_CHECKED', flag);
        }
    }
};
