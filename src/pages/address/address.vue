<template>
    <div class="address">
        <group>
            <x-input title="联系人"
                     placeholder="名字"
                     v-model="form.name"></x-input>
            <x-input title="手机号码"
                     placeholder="11位手机号"
                     v-model="form.mobile"></x-input>
            <x-address title="地区信息"
                       class="border"
                       v-model="form.cityArr"
                       :list="addressData"
                       placeholder="请选择地址"></x-address>
            <x-textarea :max="20"
                        name="detail"
                        placeholder="请输入详细地址、如街道、楼牌号等"
                        v-model="form.detail"></x-textarea>
        </group>
        <div style="margin:40px 10px;">
            <x-button @click.native="submitAddress">保存</x-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
    XTextarea,
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Value2nameFilter as value2name,
    Cell
} from 'vux'
export default {
    name: 'address',
    data() {
        return {
            form: {
                name: '',
                mobile: '',
                cityArr: [],
                detail: ''
            },
            addressData: ChinaAddressV4Data
        }
    },
    created() {
        if (this.userInfo.addressInfo) {
            this.form = {
                name: this.userInfo.addressInfo.name,
                mobile: this.userInfo.addressInfo.mobile,
                cityArr: this.userInfo.addressInfo.cityArr,
                detail: this.userInfo.addressInfo.detail
            }
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        ...mapMutations(['UPDATE_ADDRESS']),
        submitAddress() {
            const { name, mobile, cityArr, detail } = this.form
            if (!name) {
                this.$vux.toast.text('请输入名字~', 'middle')
                return
            }
            if (!mobile) {
                this.$vux.toast.text('请输入手机号~', 'middle')
                return
            }
            if (!cityArr) {
                this.$vux.toast.text('请选择地区~', 'middle')
                return
            }
            if (!detail) {
                this.$vux.toast.text('请输入详情地址~', 'middle')
                return
            }
            let cityVal = value2name(cityArr, ChinaAddressV4Data)
            this.UPDATE_ADDRESS({
                name: name,
                mobile: mobile,
                cityArr: cityArr,
                cityVal: cityVal,
                detail: detail
            })
            this.$router.go(-1)
        }
    },
    components: {
        XTextarea,
        Group,
        XInput,
        XAddress,
        XButton,
        Cell
    }
}
</script>

<style scoped lang="less">
.border {
    position: relative;
    &::before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #d9d9d9;
        color: #d9d9d9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;
    }
}
</style>
