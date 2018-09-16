<template>
    <div class="home">
        <swiper :aspect-ratio="400/750"
            loop
            auto
            dots-position="center"
            :duration="800">
            <swiper-item class="swiper-item"
                v-for="(item, index) in imgList"
                :key="index"
                @click.native="linkToDetail(item.key_word)">
                <img :src="item.img.url"
                    alt="image">
            </swiper-item>
        </swiper>
        <div class="selected-themes">
            <div class="title">
                <h5>精选主题</h5>
            </div>
            <div class="selectd-box">
                <div class="selectd-item big"
                    v-if="index===2"
                    v-for="(item,index) in themeList"
                    :key="index"
                    @click="linkToTheme(item.id)"
                    :data-name="item.name">
                    <img :src="item.topic_img.url"
                        alt="">
                </div>
                <div class="selectd-item"
                    :data-id="item.id"
                    :data-name="item.name"
                    @click="linkToTheme(item.id)"
                    v-else>
                    <img :src="item.topic_img.url"
                        alt="">
                </div>
            </div>
        </div>
        <div class="recent-products">
            <div class="title">
                <h5>最近新品</h5>
            </div>
            <products :products="recentList"></products>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import products from '@/components/Products'

const bannerId = 1
const themeIds = '1,2,3'

export default {
    name: 'Home',
    data() {
        return {
            imgList: [],
            themeList: [],
            recentList: []
        }
    },
    created() {
        this.getBanner()
        this.getTheme()
        this.getRecent()
    },
    methods: {
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: { id: id } })
        },
        linkToTheme(id) {
            this.$router.push({
                path: '/page/theme',
                query: { id: id }
            })
        },
        getBanner() {
            this.$http
                .get(
                    `/banner/${bannerId}`
                )
                .then(res => {
                    this.imgList = res.data.data.items
                })
        },
        getTheme() {
            this.$http
                .get(
                    `/theme?ids=${themeIds}`
                )
                .then(res => {
                    this.themeList = res.data.data
                })
        },
        getRecent() {
            this.$http
                .get(
                    '/product/recent'
                )
                .then(res => {
                    this.recentList = res.data.data
                })
        }
    },

    components: {
        Swiper,
        SwiperItem,
        products
    }
}
</script>

<style scoped lang="less">
.home {
    .swiper-item img {
        width: 100%;
    }
    .selected-themes {
        overflow: hidden;
        .title {
            padding: 10px 0;
            font-size: 18px;
            color: #ab956d;
            text-align: center;
            h5 {
                font-weight: normal;
            }
        }
        .selectd-box {
            font-size: 0;
            overflow: hidden;
            .selectd-item {
                display: inline-block;
                width: 50%;
                border-bottom: 2px solid #fff;
                box-sizing: border-box;
                img {
                    width: 100%;
                }
                &:nth-child(1){
                    border-right:1px solid #fff;
                }
                &:nth-child(2) {
                    border-left:1px solid #fff;
                }
                &.big {
                    width: 100%;
                }
            }
        }
    }
    .recent-products {
        .title {
            padding: 10px 0;
            font-size: 18px;
            color: #ab956d;
            text-align: center;
            h5 {
                font-weight: normal;
            }
        }
    }
}
</style>
