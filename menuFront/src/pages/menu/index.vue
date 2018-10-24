<template>
    <div style="height: 100%;" class="container">
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
                        <navigator v-for="item in chooseGoodList" :key="item._id" class="weui-cell" hover-class="weui-cell_active">
                            <div @click="chooseGoodClick(item)" class="weui-cell__bd">
                                <div>
                                    <img style="float: left; width: 50rpx; height: 50rpx; margin-right: 20rpx;" :src="item.img" alt="">
                                    {{item.goodName}}<br>
                                    ¥
                                    {{item.lowPrice}}
                                    起
                                </div>
                            </div>
                        </navigator>
                    </div>
                </div>
            </div>
        </div>

        <div class="width100 goodsWrap weui-flex">
            <scroll-view style="position: relative;" class="left_menu_scroll" scroll-with-animation="true" scroll-y :scroll-into-view="navId">
                <ul>
                    <li class="left_menu_item"
                        :id="'nav_'+index"
                        v-for="(menu, index) in menus" :key="index"
                        :class="index===currentIndex ? 'current' : ''"
                        @click="selectMenu(index, $event)"
                    >
                       <p class="text">{{menu.categoryName}}</p>
                    </li>
                </ul>
            </scroll-view>
            <scroll-view style="position: relative;" class="right_menu_scroll"
                scroll-y
                :scroll-into-view="contentId"
                @scroll="onScroll"
                scroll-with-animation="true">
                <ul>
                    <li class="right_item_li" v-for="(menu, i) in menus" :key="i" :id="'con_'+i">
                        <div class="title">{{menu.categoryName}}</div>
                        <ul>
                            <li v-for="(item, j) in menu.goodsList" :key="j">
                                <div class="goods_wrapper">
                                    <img style="width: 100%;height: 100%" :src="item.img" alt="food">
                                    <div class="goods_wrapper_item">
                                        <span v-text="item.goodName"></span><br>
                                        <span>¥</span>
                                        <span v-text="item.lowPrice"></span>
                                        <span>起</span>
                                        <button class="weui-btn" @click="goodSkuBtnClick(item)" size="mini" type="warn">选规格</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </scroll-view>
        </div>

        <div v-show="goodSkuDialog" class="goodSkuDialogWrap">
            <div class="goodSkuDialog">
                <div class="dialogImgHeader">
                    <div class="dialogClose">
                        <icon type="cancel" @click="dialogCloseEvent" class="weui-flex__item" :size="25" />
                    </div>
                    <img :src="currentGood.img" style="width: 100%" alt="">
                </div>
                <div class="countWrap" style="padding: 0 20rpx 0rpx 20rpx;">
                    <div class="floatLeft">选择数量</div>
                    <div class="floatRight">
                        <button @click="countReduce" size="mini" type="warn">-</button>
                        <button style="margin: 0 20rpx;" size="mini" type="defalut">{{currentCount}}</button>
                        <button @click="countAdd" size="mini" type="warn">+</button>
                    </div>
                </div>
                <div v-show="currentGood.sizeSkuList.length > 0" class="sizeSkuWrap">
                    <div style="padding: 0 20rpx 20rpx 20rpx;">
                        选择规格
                    </div>
                    <div>
                        <button v-for="(item, index) in currentGood.sizeSkuList" :key="index" :type="index == currentSizeIndex ? 'warn' : 'defalut'" @click="skuSizeChooseEvent(index)" style="margin: 0 20rpx;" size="mini" >{{item.skuName}}</button>
                    </div>
                </div>
                <div v-show="currentGood.cookSkuList.length > 0" class="cookSkuWrap">
                    <div style="padding: 0 20rpx 20rpx 20rpx;">
                        选择口味
                    </div>
                    <div>
                        <button v-for="(item, index) in currentGood.cookSkuList" :key="index" :type="index == currentCookIndex ? 'warn' : 'defalut'" @click="skuCookChooseEvent(index)" style="margin: 0 20rpx;" size="mini" >{{item.skuName}}</button>
                    </div>
                </div>

                <div class="goodSkuDialogFooter">
                    <div v-if="currentPrice" style="float: left">
                        <span>单价: </span>
                        {{currentPrice}}
                        <span>元</span>
                    </div>
                    <div style="float: right">
                        <button type="warn" @click="chooseGoodAddEvent" size="mini">加入订单</button>
                    </div>
                </div>

            </div>
        </div>

        <div style="padding: 30rpx 20rpx 0; display: flex; justify-content: space-between;" class="footer">
            <div>
                <img @click="openShopEvent" style="width: 35px; height: 35px; vertical-align:middle; margin-right: 20rpx;" src="http://192.168.1.101:3000/images/shop.png" alt="">
                <span v-if="goodCount != 0">你已点了<span >{{goodCount}}</span>个菜</span>
                <span v-if="goodCount == 0">客官点点什么吧</span>
            </div>
            <div style="text-align: right;">
                <button size="mini" style="border-radius: 50rpx; line-height:2.55555556;" type="warn">选好了</button>
            </div>
        </div>
        <!-- <toast className="warnMsg" :iconClass="fa fa-exclamation-circle" :message="msgText" :visible="msgvisible"></toast> -->
        <toast :className="toastClassName" :iconClass="toastIconClass" :message="msgText" :visible="msgvisible"></toast>
    </div>
</template>

<script>

    import toast from 'mpvue-toast'

    import api from 'api/index'
    export default {
        components: {
            toast
        },
        data() {
            return {
                toastClassName: 'warnMsg',
                toastIconClass: 'iconfont icon-jinggao',
                inputShowed: false,
                goodSkuDialog: false,
                inputVal: "",
                userInfo: {},

                chooseGoodList: [],
                shopInfo: {},

                currentCount: 1,
                currentSizeIndex: null,
                currentCookIndex: null,
                currentPrice: null,

                goodCount: 0,

                currentGood: {
                    img: '',
                    sizeSkuList: [],
                    cookSkuList: []
                },


                msgText: '请选择规格!',
                msgvisible: false,
                contentId: '',


                navId: '', // 导航模块对应的id，用来联动内容区域
                currentIndex: 0,
                navulHeight: 0, // 左边导航里ul高度
                navItemHeight: 0, // 每个导航高度
                contentHeight: 0, // 右边内容区域scroll-view高度
                listHeight: [], // foods内部块的高度
                left_menu_top: 0, //左边导航补偿

                menus: [],
                deskNum: null
            }
        },
        watch: {
            currentIndex() {
                if (this.contentHeight <= this.navulHeight) {
                    let h = this.currentIndex * this.navItemHeight

                    if (h > this.contentHeight) {
                        // 导航滑动
                        this.navId = `nav_${this.currentIndex}` //特殊处理,待修改
                    } else {
                        this.navId = 'nav_0'
                    }
                }
            }
        },
        methods: {
            openShopEvent(){
                wx.navigateTo({
                    url: '/pages/shop/main'
                })
            },
            getShopList(){
                api.getShopOrderList({deskNo: this.$store.state.deskNo}).then((response) => {
                    this.shopInfo = response.data

                    this.goodCount = this.shopInfo.goodCount
                })
            },
            chooseGoodAddEvent(){
                if (this.currentGood.sizeSkuList.length > 0 && this.currentSizeIndex === null) {
                    this.msgText = '请选择规格!'
                    this.msgvisible = true
                    this.toastClassName = 'warnMsg'
                    this.toastIconClass = 'iconfont icon-jinggao'

                    setTimeout(() => {
                        this.msgvisible = false
                    }, 2000)
                    return
                }
                if (this.currentGood.cookSkuList.length > 0 && this.currentCookIndex === null) {
                    this.msgText = '请选择口味!'
                    this.msgvisible = true
                    this.toastClassName = 'warnMsg'
                    this.toastIconClass = 'iconfont icon-jinggao'

                    setTimeout(() => {
                        this.msgvisible = false
                    }, 2000)
                    return
                }
                let param = {
                    deskNo: this.$store.state.deskNo,
                    categoryId: this.currentGood.categoryId,
                    categoryName: this.currentGood.categoryName,
                    avatarUrl: this.$store.state.userInfo.userInfo.avatarUrl,
                    nickName: this.$store.state.userInfo.userInfo.nickName,
                    goodId: this.currentGood._id,
                    goodName: this.currentGood.goodName,
                    goodCount: this.currentCount,
                    goodUnitPrice: this.currentPrice,
                    goodTotalPrice: this.currentPrice * this.currentCount
                }

                if (this.currentGood.sizeSkuList.length == 0) {
                    param.sizeSkuId = ''
                    param.sizeSkuName = '标准规格'
                } else {
                    param.sizeSkuId = this.currentGood.sizeSkuList[this.currentSizeIndex].sizeSkuId
                    param.sizeSkuName = this.currentGood.sizeSkuList[this.currentSizeIndex].skuName
                }

                if (this.currentGood.cookSkuList.length == 0) {
                    param.cookSkuId = ''
                    param.cookSkuName = ''
                } else {
                    param.cookSkuId = this.currentGood.cookSkuList[this.currentCookIndex].cookSkuId
                    param.cookSkuName = this.currentGood.cookSkuList[this.currentCookIndex].skuName
                }

                api.addGoodToOrder(param).then((response) => {
                    this.msgText = '商品已加入订单!'
                    this.goodSkuDialog = false
                    this.toastClassName = 'successMsg'
                    this.toastIconClass = 'iconfont icon-chenggong'
                    this.msgvisible = true

                    this.dialogCloseEvent()

                    this.getShopList()

                    setTimeout(() => {
                        this.msgvisible = false
                    }, 2000)
                })
            },
            skuSizeChooseEvent(index){
                this.currentSizeIndex = index
                this.currentPrice = this.currentGood.sizeSkuList[index].price
            },
            skuCookChooseEvent(index){
                this.currentCookIndex = index
            },
            countReduce(){
                this.currentCount = this.currentCount  - 1
                if (this.currentCount <= 1) {
                    this.currentCount = 1
                }
            },
            countAdd(){
                this.currentCount = this.currentCount  + 1
            },
            dialogCloseEvent(){
                this.goodSkuDialog = false
                this.currentCount = 1
                this.currentSizeIndex = null
                this.currentCookIndex = null
                this.currentPrice = null
            },
            goodSkuBtnClick(goodinfo){
                this.goodSkuDialog = true
                var param = {
                    goodId: goodinfo._id
                }

                this.currentPrice = goodinfo.lowPrice
                api.getGood(param).then((response) => {
                    this.currentGood = response.data
                })
            },
            selectMenu(index) {
                this.contentId = `con_${index}`
                this.currentIndex = index
            },
            onScroll(e) {
                this.contentId = ''
                let scrollTop = e.target.scrollTop
                let length = this.listHeight.length

                if (scrollTop >= this.listHeight[length - 1] - this.contentHeight) {
                    return
                } else if (scrollTop > 0 && scrollTop < this.listHeight[0]) {
                    this.currentIndex = 0
                }
                for (let i = 0; i < length; i++) {
                    if (scrollTop >= this.listHeight[i - 1] && scrollTop < this.listHeight[i]) {
                        this.currentIndex = i
                    }
                }
            },
            _calculateHeight() {
                let height = 0
                var that = this
                var query = wx.createSelectorQuery()

                that.listHeight = []

                query.selectAll('.right_item_li').boundingClientRect(function(rects){
                    if (rects.length > 0) {
                        rects.forEach(function(rect){
                            height += rect.height
                            that.listHeight.push(height)
                        })
                    } else {
                        setTimeout(() => {
                            that._calculateHeight()
                        }, 500)
                    }
                })
                query.select('.right_menu_scroll').boundingClientRect((rect) => {
                    if (rect) {
                        this.contentHeight = rect.height
                    }
                })
                query.select('.left_menu_scroll').boundingClientRect((rect) => {
                    if (rect) {
                        this.navulHeight = rect.height
                    }
                })
                query.select('.left_menu_item').boundingClientRect((rect) => {
                    if (rect) {
                        this.navItemHeight = rect.height
                    }
                }).exec()

            },
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
                this.inputVal = e.mp.detail.value

                api.searchGoodList({goodName: this.inputVal}).then((response) => {
                    this.chooseGoodList = response.data.list
                })
            },
            chooseGoodClick(goodinfo){
                this.goodSkuBtnClick(goodinfo)
            },
            getMenuData(){
                api.getMenu().then((response) => {
                    this.menus = response.data
                })
            }

        },
        created(){
            this.getMenuData()
        },
        mounted(){
            setTimeout(() => {
                this._calculateHeight()
            }, 0)
        },
        onShow() {
            this.getShopList()
        },
        onHide() {
            this.deskNum = null
        }
    }

</script>

<style scoped>
.footer{
    width: 100%;
    position: absolute;
    bottom: 0rpx;
    height: 130rpx;
}
.container{
    overflow: hidden;
    position: relative;
}
.goodsWrap{
    overflow: auto;
    position: absolute;
    top: 120rpx;
    z-index: 9;
    bottom: 130rpx;
}
.left_menu_scroll{
    width: 270rpx;
    text-align: center;
    background: #efefef;
}
.current{
    border-left: 10rpx solid #e83724;
    background: #fff;
    color: #d44022;
}
.left_menu_item{
    height: 150rpx;
    line-height: 150rpx;
    border-bottom: 1rpx solid #e6e6e6;
}

.right_item_li .title{
    height: 150rpx;
    line-height: 150rpx;
    text-align: center;
    color: #d44022;
}
.searchBar{
    height: 120rpx;
    position: absolute;
    top: 0;
    z-index: 99;
}
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
    top: 30rpx;
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
.goods_wrapper{
    position: relative;
    height: 380rpx;
}
.goods_wrapper_item{
    position: absolute;
    bottom: 0rpx;
    width: 100%;
    height: 100rpx;
    padding: 10rpx 20rpx;
    color: #fff;
    background: rgba(0, 0, 0, 0.3)
}
.goods_wrapper_item button{
    position: absolute;
    right: 20rpx;
    top: 0;
    width: 170rpx;

    margin-top: 10rpx;
    font-size: 28rpx;
}
.goodSkuDialogWrap{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    z-index: 199;
}
.goodSkuDialog{
    width: 90%;
    height: 80%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    border-radius: 10rpx;
}
.dialogClose{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 199;
}
.countWrap{
    overflow: hidden;
}
.goodSkuDialogFooter{
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 20rpx;
    box-shadow: 0px -1rpx 10rpx 0rpx #ebeef5;
}
</style>
