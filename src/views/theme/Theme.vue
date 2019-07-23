<template>
  <div class="theme">
    <div class="banner">
      <img v-if="item.head_img" :src="item.head_img.url" :alt="item.description">
    </div>
    <product-list :products="item.products"></product-list>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'Theme',
  components: {
    ProductList
  },
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.getThemeItem()
  },
  methods: {
    getThemeItem () {
      this.$api.getTopicItem(this.$route.query.id).then(res => {
        this.item = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  width:100%;
  margin-bottom: 10px;
}
</style>
