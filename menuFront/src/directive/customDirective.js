const customDirective = {}

customDirective.install = Vue => {

    //自定义指令 路由后退一步
    Vue.directive('numText', function(el, binding){
        console.log(el)
        console.log(binding)
    })
}

export default customDirective
