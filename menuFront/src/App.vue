<template>
    <div></div>
</template>

<script>
    export default {
        created() {
            // 调用API从本地缓存中获取数据
            const logs = wx.getStorageSync('logs') || []

            logs.unshift(Date.now())
            wx.setStorageSync('logs', logs)

            console.log('app created and cache logs by setStorageSync')
        }
    }

</script>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0rpx;
        box-sizing: border-box;
        font-size: 28rpx;
    }

    div {
        box-sizing: border-box;
    }
    .padd20{
        padding: 20rpx;
    }
    .floatLeft{
        float: left;
    }
    .floatRight{
        float: right;
    }

    /* this rule will be remove */
    * {
        transition: width 2s;
        -moz-transition: width 2s;
        -webkit-transition: width 2s;
        -o-transition: width 2s;
    }

</style>
