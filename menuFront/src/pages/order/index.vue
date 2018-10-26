<template>
    <div style="width: 100%; height: 100%; position: relative;">
        <div class="deskHeader">
            {{deskNo}}
            <span style="margin-left: 5rpx">桌</span>
            <div class="moneyHesder color_red">
                {{orderInfo.orderMoney}} 元
            </div>
        </div>
        <div style="padding: 0 30rpx">
            <div class="weui-form-preview">
                <div class="weui-form-preview__hd center">
                    订单待支付
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <div class="weui-form-preview__label">合计: 4项</div>
                    </div>
                    <div class="weui-form-preview__item font_24">
                        <div class="weui-form-preview__label">消费金额</div>
                        <div class="weui-form-preview__value">¥224.00</div>
                    </div>
                    <div class="weui-form-preview__item font_24">
                        <div class="weui-form-preview__label">优惠金额</div>
                        <div class="weui-form-preview__value color_green">¥0.00</div>
                    </div>
                </div>
                <div class="weui-form-preview__hd order_bottom">
                    <div class="weui-form-preview__item">
                        <div class="weui-form-preview__label">付款金额</div>
                        <div class="weui-form-preview__value_in-hd right color_red">¥2400.00</div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 30rpx" class="weui-cells__title pay_title">支付方式</div>
        <div style="padding: 0 30rpx">
            <div class="weui-cells weui-cells_after-title">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <i class="iconfont icon-check-square color_red floatLeft"></i>
                        <i style="margin: 0 10rpx;" class="iconfont icon-weixin color_green floatLeft"></i>
                        <span class="font_24">微信支付</span>
                    </div>
                </div>
            </div>
        </div>

        <div style="width: 100%;" class="footer">
            <div @click="orderGo" style="width: 30%; background: #000;">
                继续点餐
            </div>
            <div style="width: 70%; background: #eb2104">
                立即支付
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                deskNo: this.$store.state.deskNo,
                orderInfo: {}
            }
        },
        methods: {
            orderGo(){


            }
        },
        onShow(){
            this.deskNo = this.$store.state.deskNo
            this.orderInfo = this.$store.state.orderInfo
            console.log(this)

        }
    }
</script>
<style scoped>
    .deskHeader{
        width: 100%;
        text-align: center;
        padding: 10rpx 0;
    }
    .moneyHesder{
        font-size: 40rpx;
    }
    .weui-form-preview__hd{
        padding: 0;
        text-align: center;
        font-size: 30rpx;
    }
    .font_24{
        font-size: 24rpx !important;
    }
    .weui-form-preview__label {
        font-size: 30rpx;
    }
    .order_bottom{
        padding: 0 30rpx;
    }
    .pay_title{
        text-align: center;
        font-size: 30rpx;
        color: #333;
    }
    .footer{
        position: absolute;
        bottom: 0;
        height: 80rpx;
    }
    .footer>div{
        display: inline-block;
        font-size: 30rpx;
        text-align: center;
        color: #fff;
        height: 80rpx;
        line-height: 80rpx;
    }

</style>


