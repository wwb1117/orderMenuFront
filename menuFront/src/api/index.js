import WXHTTP from 'utils/httpServer';

export default {
    login(data){
        return WXHTTP.get('/order/list', data);
    },
    getMenu(data){
        return WXHTTP.get('/order/menu', data);
    }
}
