<template>
    <div style="position: relative;" class="counter-warp">
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
                <div class="weui-form-preview__value">{{shopInfo.orderMony + '.00'}}</div>
                <div style="position: absolute; right: 30rpx; color:#999;">
                    <i style="font-size: 40rpx;" class="iconfont icon-shanchu"><span style="font-size: 30rpx;">清空</span></i>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in shopInfo.goodList" :key="index" style="padding: 20rpx; overflow: hidden;">
            <div v-text="item.categoryName" style="line-height: 2.0; text-align: center; border-bottom: 1px solid #d9d9d9" class="header">
            </div>
            <div>
                <div style="float: left; width: 20%">
                    <img style="width: 100rpx; height: 100rpx; border-radius: 50rpx; margin-top: 20rpx" :src="item.avatarUrl" :alt="item.nickName">
                    <div style="font-size: 28rpx" v-text="item.nickName"></div>
                </div>
                <div style="float: right; width: 70%; position: relative; border-bottom: 1px dashed #d9d9d9; height: 180rpx">
                    <div style="position: absolute; left: 0; top: 50rpx; font-size: 28rpx; width: 40%;">
                        <p style="font-size: 32rpx; overflow: hidden; white-space: nowrap;text-overflow: ellipsis;" v-text="item.goodName"></p>
                        <p style="color: #eb2104">{{item.goodTotalPrice + '.00'}}</p>
                    </div>
                    <div style="position: absolute; right: 0; top: 60rpx; width: 60%;">
                        <button @click="countReduce(index)" size="mini" type="warn">-</button>
                        <button style="margin: 0 20rpx;" size="mini" type="defalut">{{item.goodCount}}</button>
                        <button @click="countAdd(index)" size="mini" type="warn">+</button>
                    </div>
                </div>
                <div class="center" style="width: 70%; float:  right; line-height: 2.8; font-size: 32rpx">
                    <span v-if="item.cookSkuName" style="display: inline-block; margin: 0 30rpx" v-text="item.cookSkuName"></span>
                    <span v-if="item.sizeSkuName" v-text="item.sizeSkuName"></span>
                </div>
            </div>
        </div>

        <div class="shop_footer" style="">
            <div @click="goOnEvent">
                <i class="iconfont icon-book"></i>
                <p style="font-size: 28rpx; margin-top: -25rpx">继续点菜</p>
            </div>
            <div style="background: rgba(255,0,0,0.8); color: #fff;">
                <i class="iconfont icon-duihao"></i>
                <p style="font-size: 28rpx; margin-top: -25rpx">下单</p>
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
            countReduce(index){
                this.shopInfo.goodList[index].goodCount--
                if (this.shopInfo.goodList[index].goodCount <= 0) {
                    this.shopInfo.goodList[index].goodCount = 0
                }

                let param = {
                    deskNo: this.shopInfo.deskNo,
                    index: index,
                    goodId: this.shopInfo.goodList[index].goodId,
                    goodCount: this.shopInfo.goodList[index].goodCount
                }

                api.shopListChange(param).then((response) => {
                    this.getShopList()
                })

            },
            countAdd(index){
                this.shopInfo.goodList[index].goodCount++
                let param = {
                    deskNo: this.shopInfo.deskNo,
                    index: index,
                    goodId: this.shopInfo.goodList[index].goodId,
                    goodCount: this.shopInfo.goodList[index].goodCount
                }

                api.shopListChange(param).then((response) => {
                    this.getShopList()
                })
            },
            getShopList(){
                api.getShopOrderList({deskNo: this.$store.state.deskNo}).then((response) => {
                    this.shopInfo = response.data
                    this.shopCount = this.shopInfo.goodCount
                })
            },
            goOnEvent(){
                wx.navigateBack({
                    delta: 1
                })
            },
            makeOrder(){
                wx.navigateTo({
                    url: '/pages/menu/main'
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
.shop_footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-around;
}
.shop_footer>div{
    width: 130rpx;
    height: 130rpx;
    border-radius: 50%;
    background: rgba(255,255,255,0.7);
    box-shadow: 0px 5rpx 10rpx #d9d9d9;
    text-align: center;
}
.shop_footer>div>i{
    font-size: 56rpx;
}
</style>
