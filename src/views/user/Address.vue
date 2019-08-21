<template>
    <div>
        <van-cell-group>
            <van-field :error-message="error1" label="姓名" placeholder="请输入姓名" required v-model="form.name" />
            <van-field :error-message="error2" label="手机号" placeholder="请输入手机号" required v-model="form.phone" />
            <van-field :error-message="error3" @click="show = true" label="地区" placeholder="请选择地区" readonly required v-model="form.region" />
            <van-field :error-message="error4" autosize label="详细地址" placeholder="请输入详细地址" required rows="2" type="textarea" v-model="form.detail" />
        </van-cell-group>
        <div class="btn-block">
            <van-button @click="onSubmit" round size="large" type="primary">保存</van-button>
        </div>

        <van-popup :style="{ height: '40%' }" position="bottom" v-model="show">
            <van-area :area-list="areaList" :value="form.country" @cancel="onCancel" @confirm="onConfirm" title="请选择省市区" />
        </van-popup>
    </div>
</template>

<script>
import areaList from '@/assets/js/areaList.js';

export default {
    data() {
        return {
            areaList: areaList,
            addressInfo: null,
            form: {
                name: '',
                phone: '',
                region: '',
                province: '',
                city: '',
                country: '',
                detail: ''
            },
            error1: '', // 请输入姓名
            error2: '', // 手机号格式错误
            error3: '', // 请选择地区
            error4: '', // 请输入详细地址
            show: false
        };
    },
    created() {
        this.$api
            .getUserAddress()
            .then(res => {
                if (res.data.code === 0) {
                    const addressInfo = res.data.data;
                    this.addressInfo = addressInfo;
                    this.form.name = addressInfo.name;
                    this.form.phone = addressInfo.mobile;
                    this.form.province = addressInfo.province;
                    this.form.city = addressInfo.city;
                    this.form.country = addressInfo.country;
                    this.form.region = this.getAreaName(addressInfo.province, addressInfo.city, addressInfo.country);
                    this.form.detail = addressInfo.detail;
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        getAreaName(val1, val2, val3) {
            return areaList.province_list[val1] + areaList.city_list[val2] + areaList.country_list[val3];
        },
        onSubmit() {
            if (!this.form.name) {
                this.error1 = '请输入姓名!';
                return;
            } else {
                this.error1 = '';
            }

            if (!/^1[3456789]\d{9}$/.test(this.form.phone)) {
                this.error2 = '手机号格式错误!';
                return;
            } else {
                this.error2 = '';
            }

            if (!this.form.region) {
                this.error3 = '请选择地区!';
                return;
            } else {
                this.error3 = '';
            }

            if (!this.form.detail) {
                this.error4 = '请输入详细地址!';
                return;
            } else {
                this.error4 = '';
            }

            if (this.addressInfo === null) {
                this.$api
                    .addUserAddress({
                        name: this.form.name,
                        mobile: this.form.phone,
                        province: this.form.province,
                        city: this.form.city,
                        country: this.form.country,
                        detail: this.form.detail
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast(res.data.msg);
                            this.$router.go(-1);
                        } else {
                            this.$toast(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$api
                    .updateUserAddress({
                        name: this.form.name,
                        mobile: this.form.phone,
                        province: this.form.province,
                        city: this.form.city,
                        country: this.form.country,
                        detail: this.form.detail
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast(res.data.msg);
                            this.$router.go(-1);
                        } else {
                            this.$toast(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        onConfirm(arr) {
            console.log(arr);
            this.form.province = arr[0].code;
            this.form.city = arr[1].code;
            this.form.country = arr[2].code;
            this.form.region = arr[0].name + arr[1].name + arr[2].name;
            this.show = false;
        },
        onCancel() {
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-block {
    margin: 15px;
}
</style>
