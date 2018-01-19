<template>
    <div class="theme">
        <div class="banner">
            <img :src="banner"
                alt="">
        </div>
        <products :products="themeList"></products>
    </div>
</template>

<script>
import products from '@/components/Products'
export default {
    name: 'theme',
    data() {
        return {
            banner: '',
            themeList: []
        }
    },
    activated() {
        console.log(this.$route.query.id)
        this.getAllTheme()
    },
    methods: {
        getAllTheme() {
            this.$http
                .get(
                    'https://www.easy-mock.com/mock/5a4896ba62de717d44f2406e/api/v1/theme/all'
                )
                .then(res => {
                    let themeData = res.data.data.filter(item => {
                        return item.id === +this.$route.query.id
                    })
                    this.banner = themeData[0].head_img.url
                    this.themeList = themeData[0].products
                })
        }
    },
    components: {
        products
    }
}
</script>

<style scoped lang="less">
.theme {
    .banner{
        margin-bottom: 15px;
        img{
            width: 100%;
            vertical-align: top;
        }
    }
}
</style>
