<template>
    <div style="width: 100%; height: 100%">
        <div class="deskHeader">
            {{deskNo}}
            <span style="margin-left: 5rpx">桌</span>
            <div class="moneyHesder color_red">
                {{orderInfo.orderMoney}} 元
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

        },
        onShow(){
            this.deskNo = this.$store.state.deskNo
            this.orderInfo = this.$store.state.orderInfo
            console.log(this.orderInfo)
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

</style>


