<template>
    <div id="app">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'app',
    directives: {
        TransferDom
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    components: {
        Loading,
        TransferDom
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
#app {
    height: 100%;
}
.vux-slider .vux-icon-dot {
    width: 8px !important;
    height: 8px !important;
    border-radius: 4px !important;
}
.detail .vux-cell-value {
    color: #fff !important;
}
.detail .vux-cell-box::before {
    display: none;
}
.detail .vux-cell-box .weui-cell__ft::after {
    display: none;
}
</style>
