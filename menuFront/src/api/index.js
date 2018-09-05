import HttpClient from 'utils/httpServer';

export default {
    login(data){
        return HttpClient.get('/order/list', data);
    }
}
