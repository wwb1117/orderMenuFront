// 首个路由为首页
module.exports = [{
    path: 'pages/index/index',
    name: 'Index',
    config: {
        navigationBarTitleText: '文章详情',
        //引入UI组件，后面会讲到
        usingComponents: {
            "zan-button": "../../dist/btn/index",
            "i-button": "../../iview/button/index"
        }
    }
}]
