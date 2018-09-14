<template>
    <div class="container">
        <div style="margin-top: 250rpx; width: 100%; padding-left: 20rpx; padding-right: 20rpx;">
            <i-input @change="inputChange" v-model="deskNum" type="number" autofocus  placeholder="请输入桌号" />
            <!-- <input @change="inputChange" style="padding: 20rpx 20rpx; border: 1px solid #19be6b;" autofocus="autofocus" v-model="deskNum" placeholder="请输入桌号" type="number"> -->
        </div>
        <div style="margin-top: 120rpx; width: 100%;">
            <i-button @click="login" type="success">进入点餐</i-button>
        </div>
        <i-toast id="toast" />

    </div>
</template>

<script>
    const { $Toast } = require('../../../static/iview/base/index')

    export default {
        data() {
            return {
                userInfo: {},
                deskNum: null
            }
        },
        methods: {
            login() {
                if (this.deskNum) {
                    this.$store.commit('setDeskNum', this.deskNum)
                    wx.navigateTo({
                        url: '/pages/order/main'
                    })
                } else {
                    $Toast({
                        content: '请输入桌号!',
                        type: 'warning'
                    });
                }
            },
            inputChange(){
                console.log(this.deskNum)
            }
        },
        created() {
            // 调用应用实例的方法获取全局数据
        },
        onHide(){
            this.deskNum = null
        }
    }

</script>

<style scoped>
    .userinfo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .userinfo-avatar {
        width: 128rpx;
        height: 128rpx;
        margin: 20rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }
    .counter {
        display: inline-block;
        margin: 10px auto;
        padding: 5px 10px;
        color: blue;
        border: 1px solid blue;
    }

</style>
