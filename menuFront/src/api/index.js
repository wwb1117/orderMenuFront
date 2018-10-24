import WXHTTP from 'utils/httpServer';

export default {
    login(data){
        return WXHTTP.get('/order/list', data);
    },
    getGood(data){
        return WXHTTP.get('/order/good', data);
    },
    getMenu(data){
        return WXHTTP.get('/order/menu', data);
    },
    addGoodToOrder(data){
        return WXHTTP.post('/order/addgoodToOrder', data);
    },
    getShopOrderList(data){
        return WXHTTP.get('/order/shopList', data);
    },
    shopListChange(data){
        return WXHTTP.put('/order/shopList/change', data);
    },
    searchGoodList(data){
        return WXHTTP.get('/order/search/good', data);
    }
}
