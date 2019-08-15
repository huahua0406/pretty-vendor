<template>
    <div>
        <van-address-edit :area-list="areaList" @save="onSave" ref="address" />
    </div>
</template>

<script>
import areaList from '@/assets/js/areaList.js';

export default {
    data() {
        return {
            areaList: areaList,
            addressInfo: null
        };
    },
    created() {
        this.$api
            .getUserAddress()
            .then(res => {
                const addressInfo = res.data.data;
                this.addressInfo = addressInfo;
                this.$refs.address.addressInfo.name = addressInfo.name;
                this.$refs.address.addressInfo.tel = addressInfo.mobile;
                //   this.$refs.address.addressInfo.addressDetail = addressInfo.detail
                this.$refs.address.addressInfo.addressDetail = addressInfo.detail;
                // this.$refs.address.setAddressDetail(addressInfo.detail)
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        onSave(addressInfo) {
            if (this.addressInfo == null) {
                this.$api
                    .addUserAddress({
                        name: addressInfo.name,
                        mobile: addressInfo.tel,
                        province: addressInfo.province,
                        city: addressInfo.city,
                        country: addressInfo.county,
                        detail: addressInfo.addressDetail
                    })
                    .then(res => {
                        this.$toast(res.data.msg);
                        this.$router.go(-1);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$api
                    .updateUserAddress({
                        name: addressInfo.name,
                        mobile: addressInfo.tel,
                        province: addressInfo.province,
                        city: addressInfo.city,
                        country: addressInfo.county,
                        detail: addressInfo.addressDetail
                    })
                    .then(res => {
                        this.$toast(res.data.msg);
                        this.$router.go(-1);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
