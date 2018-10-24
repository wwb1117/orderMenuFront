<template>
    <div>
        <div v-show="!isShowAhturoizeWarning" class="btn_wrap">
            <button class="weui-btn" open-type="getUserInfo" type="primary" @getuserinfo="getUserInfo"> 登录 </button>
            <!-- <button class="weui-btn" type="primary">登录</button> -->
        </div>

        <div style="text-align: center;" class="authorize-warning" v-show="isShowAhturoizeWarning">
            <div class="box">
                <div class="title">警告</div>
                <div style="padding: 0 20rpx;" class="content">授权不会泄露你的个人隐私<br>点击“确定”再次尝试授权？</div>
                <div class="footer" style="padding: 0 150rpx; margin-top: 100rpx;">
                    <button style="width: 150rpx; float: left;" @click="cancelAuthroize">取消</button>
                    <button type="primary" style="width: 150rpx; float: right;" open-type="getUserInfo" @getuserinfo="getUserInfo">确定</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                isShowAhturoizeWarning: false,
                logs: []
            }
        },
        methods: {
            getUserInfo(){ //同意授权，获取用户信息，encryptedData是加密字符串，里面包含unionid和openid信息
                wx.getUserInfo({
                    withCredentials: true, //此处设为true，才会返回encryptedData等敏感信息
                    success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.isShowAhturoizeWarning = false
                        this.$store.commit('setUserInfo', res)
                        wx.navigateTo({
                            url: '/pages/menu/main'
                        })
                    },
                    fail: res => { //用户拒绝授权
                        this.isShowAhturoizeWarning = true
                    }
                })
            },
            cancelAuthroize(){
                this.isShowAhturoizeWarning = false
            }
        },
        onLoad(options) {
            if (options.scene){
                var scene = decodeURIComponent(options.scene)

                this.$store.commit('setDeskNo', scene)
            }
            console.log(this.$store.state.deskNo)
            wx.login({
                success(code){
                    console.log(code)
                }
            })
        },
        created() {

        }
    }

</script>

<style scoped>
.btn_wrap{
    position: absolute;
    top: 50%;
    width: 100%;
    padding: 0 50rpx;
}

</style>
