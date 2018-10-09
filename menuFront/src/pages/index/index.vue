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
                        <navigator class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>eeeeee</div>
                            </div>
                        </navigator>
                        <navigator class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本</div>
                            </div>
                        </navigator>
                        <navigator class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本</div>
                            </div>
                        </navigator>
                        <navigator class="weui-cell" hover-class="weui-cell_active">
                            <div class="weui-cell__bd">
                                <div>实时搜索文本</div>
                            </div>
                        </navigator>
                    </div>
                </div>
            </div>
        </div>

        <div class="width100 goodsWrap weui-flex">
            <scroll-view class="left_menu_scroll" scroll-with-animation="true" scroll-y :scroll-into-view="navId">
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
            <scroll-view class="right_menu_scroll"
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
                                    <img style="width: 100%;height: 100%" src="../../../static/img/food.jpg" alt="food">
                                    <div class="goods_wrapper_item">
                                        <span v-text="item.goodsName"></span><br>
                                        <span>¥</span>
                                        <span v-text="item.lowPrice"></span>
                                        <span>起</span>
                                        <button class="weui-btn" size="mini" type="warn">选规格</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </scroll-view>
        </div>

        <div class="footer">

        </div>

    </div>
</template>

<script>
    import menuData from '../../data/menu'
    import api from 'api/index'
    export default {
        data() {
            return {
                inputShowed: false,
                inputVal: "",
                userInfo: {},

                contentId: '',
                navId: '', // 导航模块对应的id，用来联动内容区域
                currentIndex: 0,
                navulHeight: 0, // 左边导航里ul高度
                navItemHeight: 0, // 每个导航高度
                contentHeight: 0, // 右边内容区域scroll-view高度
                listHeight: [], // foods内部块的高度
                left_menu_top: 0, //左边导航补偿

                menus: menuData,
                deskNum: null
            }
        },
        watch: {
            currentIndex() {
                if (this.contentHeight <= this.navulHeight) {
                    let h = this.currentIndex * this.navItemHeight

                    if (h > this.contentHeight) {
                        // 导航滑动
                        this.navId = `nav_${this.currentIndex - 3}` //特殊处理,待修改
                    } else {
                        this.navId = 'nav_0'
                    }
                }
            }
        },
        methods: {
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

                query.selectAll('.right_item_li').boundingClientRect(function(rects){
                    rects.forEach(function(rect){
                        height += rect.height
                        that.listHeight.push(height)
                    })
                })
                query.select('.right_menu_scroll').boundingClientRect((rect) => {
                    this.contentHeight = rect.height
                })
                query.select('.left_menu_scroll').boundingClientRect((rect) => {
                    this.navulHeight = rect.height
                })
                query.select('.left_menu_item').boundingClientRect((rect) => {
                    this.navItemHeight = rect.height
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
            },
            getMenuData(){
                api.getMenu().then((response) => {
                    this.menus = response.data
                    console.log(this.menus)
                })
            }

        },
        mounted(){
            this.$nextTick(() => {
                this._calculateHeight()
            })
        },
        onLoad(options) {
            if (options.scene){
                var scene = decodeURIComponent(options.scene)

                this.$store.commit('setDeskNo', scene)
                this.getMenuData()

            }
        },
        activated(){

        },
        onHide() {
            this.deskNum = null
        }
    }

</script>

<style scoped>
.footer{
    height: 130rpx;
    border: 1rpx solid #ebebeb;
    width: 100%;
}
.container{
    overflow: hidden;
}
.goodsWrap{
    height: 950rpx;
    overflow: auto;
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
</style>
