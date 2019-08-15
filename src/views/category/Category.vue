<template>
    <div class="category-wrapper">
        <div class="menu-wrapper van-hairline--right" ref="menuWrapper">
            <ul>
                <li
                    :class="{'active':currentIndex===index}"
                    :key="index"
                    @click="selectMenu(index,$event)"
                    class="menu-item"
                    v-for="(item,index) in category"
                >{{item.name}}</li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
            <ul>
                <li :key="index" class="goods-list" ref="itemList" v-for="(item,index) in category">
                    <div class="item-header">
                        <div class="item-banner-wrap">
                            <img :alt="item.name" :src="item.img.url" class="item-banner" />
                        </div>
                        <div class="item-title-wrap">
                            <h2 class="item-title">{{item.name}}</h2>
                        </div>
                    </div>
                    <ul class="item-list">
                        <li :key="index" class="goods-item" v-for="(good,index) in item.products">
                            <img :alt="good.name" :src="good.main_img_url" @click="linkToDetail(good.id)" class="goods-image" />
                            <div class="goods-name">{{good.name}}</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
import BScroll from 'better-scroll';

export default {
    name: 'Category',
    components: {
        Tabbar
    },
    data() {
        return {
            category: [],
            listHeight: [],
            scrollY: 0
        };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        }
    },
    created() {
        this.getAllCategory();
    },
    methods: {
        linkToDetail(id) {
            this.$router.push({ path: '/detail', query: { id } });
        },
        getAllCategory() {
            this.$api.getAllCategory().then(res => {
                this.category = res.data.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            });
        },
        selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let itemList = this.$refs.itemList;
            let el = itemList[index];
            this.goodsScroll.scrollToElement(el, 300);
        },
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });

            this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
                click: true,
                probeType: 3
            });

            this.goodsScroll.on('scroll', pos => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight() {
            // v-for 配合 ref 拿到的 ref 是个数组，按索引能取到对应索引的项的 dom。
            let itemList = this.$refs.itemList;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < itemList.length; i++) {
                let item = itemList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.category-wrapper {
    position: absolute;
    top: 0;
    bottom: 50px;
    display: flex;
    overflow: hidden;
    width: 100%;
    .menu-wrapper {
        flex: 0 0 75px;
        width: 75px;
        .menu-item {
            line-height: 25px;
            padding: 10px 0;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &.active {
                color: #ab956d;
                font-size: 16px;
                transition: all linear 0.15s;
                &::before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 3px;
                    height: 100%;
                    background-color: #ab956d;
                }
            }
        }
    }
    .goods-wrapper {
        flex: 1;
        .goods-list {
            padding: 20px;
            box-sizing: border-box;
            height: calc(100vh - 50px);
            .item-header {
                .item-banner-wrap {
                    .item-banner {
                        width: 100%;
                        border-radius: 2px;
                    }
                }
                .item-title-wrap {
                    margin: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .item-title {
                        font-size: 12px;
                        color: #ab956d;
                        font-weight: normal;
                        &::before,
                        &::after {
                            content: '';
                            display: inline-block;
                            position: relative;
                            top: -3px;
                            width: 35px;
                            height: 1px;
                            margin: 0 10px;
                            background-color: #ab956d;
                            transform: scaleY(0.5);
                        }
                    }
                }
            }
            .item-list {
                display: flex;
                flex-wrap: wrap;
                .goods-item {
                    width: 30%;
                    margin-right: 5%;
                    margin-bottom: 10px;
                    text-align: center;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    .goods-image {
                        // width: 80%;
                        border-radius: 50%;
                    }
                    .goods-name {
                        color: #444452;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>
