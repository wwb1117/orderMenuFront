<template>
    <div class="counter-warp">
        <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item center">
                    购物车
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">备注:</div>
                    <div v-if="shopInfo.remark == ''" class="weui-form-preview__value">无</div>
                    <div v-else class="weui-form-preview__value" v-text="shopInfo.remark"></div>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <div class="weui-form-preview__value">合计</div>
                <div style="margin: 0 10rpx" class="weui-form-preview__value"> : </div>
                <div class="weui-form-preview__value"> ¥ </div>
                <div class="weui-form-preview__value">20400</div>
                <div style="position: absolute; right: 30rpx; color:#999;">
                    <i style="font-size: 40rpx;" class="iconfont icon-shanchu"><span style="font-size: 30rpx;">清空</span></i>
                </div>
            </div>
        </div>
        <div style="padding: 20rpx; overflow: hidden;">
            <div style="line-height: 2.0; text-align: center; border-bottom: 1px solid #d9d9d9" class="header">
                类目1
            </div>
            <div>
                <div style="float: left; width: 20%">
                    <img style="width: 100rpx; height: 100rpx; border-radius: 50rpx; margin-top: 20rpx" src="https://wx.qlogo.cn/mmopen/vi_32/cUGtjeKYUsy9Pm3sCks1mWKKpL20MT6bpD8sqH2GTu1Dd8iaicDZsXLU6bhqhMicnicUOd5FzN6ukmf4Xs4jOQSykw/132" alt="">
                    <div style="font-size: 28rpx">贝武吉</div>
                </div>
                <div style="float: right; width: 70%; position: relative; border-bottom: 1px dashed #d9d9d9; height: 180rpx">
                    <div style="position: absolute; left: 0; top: 50rpx; font-size: 28rpx;">
                        <p style="font-size: 32rpx">小鸡炖蘑菇</p>
                        <p style="color: #eb2104">240.00</p>
                    </div>
                    <div style="position: absolute; right: 0; top: 60rpx">
                        <button @click="countReduce" size="mini" type="warn">-</button>
                        <button style="margin: 0 20rpx;" size="mini" type="defalut">1</button>
                        <button @click="countAdd" size="mini" type="warn">+</button>
                    </div>
                </div>
                <div class="center" style="width: 70%; float:  right; line-height: 2.8; font-size: 32rpx">
                    <span style="display: inline-block; margin: 0 30rpx">经典麻辣味</span>
                    <span>大份</span>
                </div>
            </div>
        </div>
        <div style="padding: 20rpx; overflow: hidden;">
            <div style="line-height: 2.0; text-align: center; border-bottom: 1px solid #d9d9d9" class="header">
                类目1
            </div>
            <div>
                <div style="float: left; width: 20%">
                    <img style="width: 100rpx; height: 100rpx; border-radius: 50rpx; margin-top: 20rpx" src="https://wx.qlogo.cn/mmopen/vi_32/cUGtjeKYUsy9Pm3sCks1mWKKpL20MT6bpD8sqH2GTu1Dd8iaicDZsXLU6bhqhMicnicUOd5FzN6ukmf4Xs4jOQSykw/132" alt="">
                    <div style="font-size: 28rpx">贝武吉</div>
                </div>
                <div style="float: right; width: 70%; position: relative; border-bottom: 1px dashed #d9d9d9; height: 180rpx">
                    <div style="position: absolute; left: 0; top: 50rpx; font-size: 28rpx;">
                        <p style="font-size: 32rpx">小鸡炖蘑菇</p>
                        <p style="color: #eb2104">240.00</p>
                    </div>
                    <div style="position: absolute; right: 0; top: 60rpx">
                        <button @click="countReduce" size="mini" type="warn">-</button>
                        <button style="margin: 0 20rpx;" size="mini" type="defalut">1</button>
                        <button @click="countAdd" size="mini" type="warn">+</button>
                    </div>
                </div>
                <div class="center" style="width: 70%; float:  right; line-height: 2.8; font-size: 32rpx">
                    <span style="display: inline-block; margin: 0 30rpx">经典麻辣味</span>
                    <span>大份</span>
                </div>
            </div>
        </div>
        <div style="padding: 20rpx; overflow: hidden;">
            <div style="line-height: 2.0; text-align: center; border-bottom: 1px solid #d9d9d9" class="header">
                类目1
            </div>
            <div>
                <div style="float: left; width: 20%">
                    <img style="width: 100rpx; height: 100rpx; border-radius: 50rpx; margin-top: 20rpx" src="https://wx.qlogo.cn/mmopen/vi_32/cUGtjeKYUsy9Pm3sCks1mWKKpL20MT6bpD8sqH2GTu1Dd8iaicDZsXLU6bhqhMicnicUOd5FzN6ukmf4Xs4jOQSykw/132" alt="">
                    <div style="font-size: 28rpx">贝武吉</div>
                </div>
                <div style="float: right; width: 70%; position: relative; border-bottom: 1px dashed #d9d9d9; height: 180rpx">
                    <div style="position: absolute; left: 0; top: 50rpx; font-size: 28rpx;">
                        <p style="font-size: 32rpx">小鸡炖蘑菇</p>
                        <p style="color: #eb2104">240.00</p>
                    </div>
                    <div style="position: absolute; right: 0; top: 60rpx">
                        <button @click="countReduce" size="mini" type="warn">-</button>
                        <button style="margin: 0 20rpx;" size="mini" type="defalut">1</button>
                        <button @click="countAdd" size="mini" type="warn">+</button>
                    </div>
                </div>
                <div class="center" style="width: 70%; float:  right; line-height: 2.8; font-size: 32rpx">
                    <span style="display: inline-block; margin: 0 30rpx">经典麻辣味</span>
                    <span>大份</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api/index'
    export default {
        data(){
            return {
                shopInfo: {},
                shopCount: 0
            }
        },
        methods: {
            getShopList(){
                api.getShopOrderList({deskNo: this.$store.state.deskNo}).then((response) => {
                    this.shopInfo = response.data
                    this.shopCount = this.shopInfo.goodCount
                })
            }
        },
        onShow(){
            this.getShopList()
        }
    };
</script>

<style scoped>
.weui-form-preview__hd{
    padding: 0 30rpx;
    line-height: 2.0;
}
.weui-form-preview__bd{
    padding: 0 30rpx;
}
.weui-form-preview__ft{
    padding: 0 30rpx;
    color: #eb2104;
}
</style>
