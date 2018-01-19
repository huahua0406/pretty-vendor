<template>
    <div class="products">
        <div class="products-item"
            v-for="(item,index) in products"
            :key="index"
            :data-id="item.id"
            @click="linkToDetail">
            <img :src="item.main_img_url"
                alt="image"
                class="products-image">
            <div class="products-item-bottom">
                <h2 class="name">{{item.name}}</h2>
                <p class="price">¥&nbsp;{{item.price}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'products',
    props: ['products'],
    data() {
        return {}
    },
    created() {},
    methods: {
        linkToDetail(e) {
            let id = e.currentTarget.dataset.id
            this.$router.push({ path: '/page/detail', query: { id: id } })
        }
    }
}
</script>

<style scoped lang="less">
.products {
    margin: 0 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .products-item {
        width: 49%;
        border-radius: 5px;
        margin-right: 0;
        margin-bottom: 5px;
        background-color: #f5f6f5;
        text-align: center;
        .products-image {
            margin: 5px auto 0 auto;
            width: 80%;
            border-radius: 5px;
        }
        .products-item-bottom {
            text-align: center;
            margin-bottom: 10px;
            color: #333;
            .name {
                font-size: 14px;
                font-weight: normal;
            }
            .price {
                font-size: 12px;
            }
        }
    }
}
</style>
