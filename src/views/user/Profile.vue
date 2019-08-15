<template>
    <div>
        <van-uploader :after-read="afterRead" />
    </div>
</template>

<script>
export default {
    name: 'Profile',
    methods: {
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
