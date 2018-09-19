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
                                <div>实时搜索文本1122</div>
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
           <div class="left_menu_wrap" ref="cascadMenu">
                <div class="left_menu left-menu">
                    <div class="left-menu-container">
                        <ul>
                            <li class="left-item leftItem" ref="leftItem" :class="{'current': currentIndex === index}" @click="selectLeft(index, $event)"
                                v-for="(menu, index) in menus" :key="index">
                                <p class="text">{{menu.name}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="weui-flex__item ">
                <div class="right_menu_wrap right-menu">
                    <div class="right-menu-container">
                        <ul>
                            <li class="right-item rightItem" ref="rightItem" v-for="(menu, i) in menus" :key="i">
                                <div class="title">{{menu.name}}</div>
                                <ul>
                                    <li v-for="(item, j) in menu.data" :key="j">
                                        <div class="data-wrapper">
                                            <div class="data">{{item.name}}</div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">

        </div>

    </div>
</template>

<script>
    import menuData from '../../data/menu'
    // import BScroll from 'better-scroll'
    // import Cscard from '../../components/cscardMenu'
    export default {
        data() {
            return {
                inputShowed: false,
                inputVal: "",
                userInfo: {},
                menus: menuData,
                rightTops: [],
                scrollY: 0,
                leftScrollY: 0,
                deskNum: null
            }
        },
        computed: {
            currentIndex() {
                const {
                    scrollY,
                    rightTops
                } = this

                let index = rightTops.findIndex((height, i) => {
                    return scrollY >= rightTops[i] && scrollY < rightTops[i + 1]
                })

                if (scrollY > rightTops[index] + 50) {
                    index++;
                }
                return index
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
            },

            selectLeft(index, event) {
                console.log(index);
                if (!event._constructed) {
                    return
                }
                let rightItem = this.$refs.rightItem
                let el = rightItem[index]

                this.$refs.rightMenu.scrollToElement(el, 300)
            },
            scrollHeight(pos) {
                console.log(pos);
                this.scrollY = Math.abs(Math.round(pos.y))
            },
            _calculateHeight() {
                let height = 0
                var that = this

                this.rightTops.push(height)

                wx.createSelectorQuery().selectAll('.rightItem').boundingClientRect(function(rects){
                    rects.forEach(function(rect){
                        console.log(rect.height)  // 节点的高度
                        height += rect.height
                        that.rightTops.push(height)
                    })
                }).exec()

                console.log(that.rightTops)
            }
        },
        created() {
            // 调用应用实例的方法获取全局数据

        },
        mounted(){
            this.$nextTick(() => {
                this._calculateHeight()
            })
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
.left_menu_wrap{
    height: 100%;
    overflow: hidden;
}
.right_menu_wrap{
    height: 100%;
    overflow: hidden;
}
.left_menu{
    width: 200rpx;
    height: 100%;
    overflow: auto;
    border: 1rpx solid #ebebeb;
}
.right_menu{
    height: 100%;
    overflow: auto;
    border: 1rpx solid #ebebeb;
}
.left_menu_item{
    height: 150rpx;
    line-height: 150rpx;
    border: 1rpx solid #ebebeb;
    text-align: center;
}
.right_menu_item{
    height: 150rpx;
    line-height: 150rpx;
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

</style>
