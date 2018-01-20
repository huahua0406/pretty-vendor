<template>
    <div class="about">
        <p>github地址：<br><a :href="url">https://github.com/huahua0406/pretty-vendor</a></p>
        <p>本项目为开源项目，如有类同，纯属巧合。</p>
    </div>
</template>

<script>
export default {
    name: 'about',
    data() {
        return {
            url: 'https://github.com/huahua0406/pretty-vendor'
        }
    }
}
</script>

<style scoped lang="less">
.about{
    padding: 10px;
}
</style>
