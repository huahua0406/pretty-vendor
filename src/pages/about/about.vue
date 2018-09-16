<template>
    <div class="about">
        <p>github地址：<a :href="url">点这里 </a></p>
        <p>喜欢就给我个star吧 ^_^ </p>
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
    a{
        color:red;
    }
}
</style>
