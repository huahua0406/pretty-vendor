<template>
    <div class="home">
        <van-swipe :autoplay="4000" :duration="800" class="swiper" indicator-color="#000">
            <van-swipe-item :key="index" @click="linkToDetail(item.key_word)" v-for="(item, index) in bannerList">
                <img :alt="item.key_word" :src="item.img.url" />
            </van-swipe-item>
        </van-swipe>
        <div class="topic">
            <h2 class="topic-title">精选主题</h2>
            <div class="topic-list">
                <div :key="index" @click="linkToTheme(item.id)" class="topic-item" v-for="(item,index) in topicList">
                    <img :alt="item.description" :src="item.topic_img.url" :title="item.name" />
                </div>
            </div>
        </div>
        <div class="recent">
            <h2 class="recent-title">最近新品</h2>
            <product-list :products="recentList"></product-list>
        </div>
        <!-- <van-divider>已经到底了</van-divider> -->
        <tabbar></tabbar>
    </div>
</template>

<script>
// @ is an alias to /src
import Tabbar from '@/components/Tabbar.vue';
import ProductList from '@/components/ProductList.vue';

export default {
    name: 'home',
    components: {
        Tabbar,
        ProductList
    },
    data() {
        return {
            bannerList: [],
            topicList: [],
            recentList: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        linkToTheme(id) {
            this.$router.push({ path: '/theme', query: { id } });
        },
        linkToDetail(id) {
            this.$router.push({ path: '/detail', query: { id } });
        },
        getData() {
            this.$api
                .getBannerList()
                .then(res => {
                    this.bannerList = res.data.data.banner_items;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$api
                .getTopicList()
                .then(res => {
                    this.topicList = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$api
                .getRecentList()
                .then(res => {
                    this.recentList = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    padding-bottom: 50px;
    .swiper {
        height: 200px;
        img {
            display: block;
            box-sizing: border-box;
            width: 100%;
            background-color: #fff;
            pointer-events: none;
        }
    }
    .topic-title,
    .recent-title {
        padding: 10px 0;
        font-size: 16px;
        color: #ab956d;
        text-align: center;
    }

    .topic-list {
        overflow: hidden;
        .topic-item {
            width: 50%;
            float: left;
            box-sizing: border-box;
            img {
                width: 100%;
            }
            &:nth-child(1) {
                border-right: 1px solid #fff;
                border-bottom: 1px solid #fff;
            }
            &:nth-child(2) {
                border-left: 1px solid #fff;
                border-bottom: 1px solid #fff;
            }
            &:last-child {
                width: 100%;
            }
        }
    }
}
</style>
