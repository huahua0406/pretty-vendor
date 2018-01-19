const state = {
    userInfo: localStorage['userInfo']
        ? JSON.parse(localStorage['userInfo'])
        : null,
    cartData: localStorage['cartData']
        ? JSON.parse(localStorage['cartData'])
        : [],
    title: '零食商贩',
    isLoading: false,
    direction: 'forward'
}

export default state
