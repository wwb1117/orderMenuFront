<template>
    <div class="container">
        <div style="width: 100%" class="searchBar">
            <div class="page">
                <div class="page__bd">
                    <div class="weui-search-bar">
                        <div class="weui-search-bar__form">
                            <div class="weui-search-bar__box">
                                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                                <input type="text" class="weui-search-bar__input" placeholder="搜一搜" v-model="inputVal"
                                    :focus="inputShowed" @input="inputTyping" />
                                <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
                                    <icon type="clear" size="14"></icon>
                                </div>
                            </div>
                            <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
                                <icon class="weui-icon-search" type="search" size="14"></icon>
                                <div class="weui-search-bar__text">想吃什么,搜一搜</div>
                            </label>
                        </div>
                        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
                    </div>
                    <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
                        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本1122</div>
                            </div>
                        </navigator>
                        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本</div>
                            </div>
                        </navigator>
                        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本</div>
                            </div>
                        </navigator>
                        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本</div>
                            </div>
                        </navigator>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputShowed: false,
                inputVal: "",
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

                }
            },
            showInput() {
                this.inputShowed = true;
            },
            hideInput() {
                this.inputVal = '';
                this.inputShowed = false
            },
            clearInput() {
                this.inputVal = '';
                this.inputShowed = false
            },
            inputTyping(e) {
                console.log(e);
                this.inputVal = e.mp.detail.value
            }
        },
        created() {
            // 调用应用实例的方法获取全局数据
        },
        onLoad(options) {
            if (options.scene){
                var scene = decodeURIComponent(options.scene)

                console.log(scene)
                this.$store.commit('setDeskNo', scene)
            }
        },
        onHide() {
            this.deskNum = null
        }
    }

</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14rpx;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12rpx 15rpx 12rpx 35rpx;
}
.weui-search-bar__input{
    height: 80rpx;
    line-height: 80rpx;
}
.weui-search-bar__label{
    line-height: 80rpx;
}
.weui-icon-search_in-box{
    top: 24rpx;
}
.weui-icon-clear{
    top: 10rpx
}
.weui-search-bar__cancel-btn{
    line-height: 80rpx;
}
.weui-search-bar__form{
    border-radius: 40rpx;
}
.weui-search-bar__label{
    border-radius: 40rpx;
}
.weui-search-bar{
    background: none;
    border: none;
    box-shadow:0rpx 1rpx 15rpx 1rpx #efeff4;
}
</style>
