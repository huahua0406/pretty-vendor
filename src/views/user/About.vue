<template>
    <div class="about">
        github:地址
    </div>
</template>

<script>
export default {
    name: 'Profile',
    methods: {
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            let formData = new FormData();
            formData.append('file', file.file);
            this.$api
                .uploadImage(formData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>