// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        goodCount: 0,
        userInfo: {},
        deskNo: null
    },
    mutations: {
        setDeskNo(state, value){
            state.deskNo = value
        },
        setUserInfo(state, value){
            state.userInfo = value
        },
        setGoodCount(state, value){
            state.goodCount = value
        }
    }
})

export default store
