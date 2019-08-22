<template>
    <div>
        <div class="upload-wrapper">
            上传头像：
            <img :src="headimgurl" class="avatar" v-show="headimgurl" />
            <van-uploader :after-read="afterRead" />
        </div>
        <div class="btn-block">
            <van-button @click="onSubmit" round size="large" type="primary">保存头像</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            headimgurl: ''
        };
    },
    methods: {
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            // console.log(file);
            let formData = new FormData();
            formData.append('file', file.file);
            this.$api
                .uploadImage(formData)
                .then(res => {
                    this.headimgurl = res.data.filename;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onSubmit() {
            this.$api
                .updateUserAvatar({
                    headimgurl: this.headimgurl
                })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$toast(res.data.msg);
                        this.$api
                            .getUserInfo()
                            .then(res => {
                                this.updateUserInfo(res.data.data);
                                this.$router.go(-1);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        this.$toast(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.upload-wrapper {
    background: #fff;
    padding: 15px;
}

.avatar {
    width: 80px;
    height: 80px;
    margin: 0 10px 10px 0;
    display: inline-block;
    vertical-align: middle;
}

.btn-block {
    margin: 15px;
}
</style>

