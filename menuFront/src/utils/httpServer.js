import qs from 'qs'
var baseUrl = '/api'

function requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/${url}`,
            data: data,
            header: header,
            method: method,
            success: res => {
                if (res.statusCode === 200) {
                    //200: 服务端业务处理正常结束
                    resolve(res)
                } else {
                    reject(res)
                }
            },
            fail: res => {
                reject(res)
            }
        })
    })
}
export default {
    post(url, data) {
        return requestAll(url, qs.stringify(data), {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, 'POST')
    },
    postJson(url, data) {
        return requestAll(url, JSON.stringify(data), {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8'
        }, 'POST')
    },
    put(url, data) {
        return requestAll(url, qs.stringify(data), {
            'X-Requested-With': 'XMLHttpRequest'
        }, 'PUT')
    },
    get(url, data) {
        return requestAll(url, qs.stringify(data), {
            'X-Requested-With': 'XMLHttpRequest'
        }, 'GET')
    },
    delete(url, data) {
        return requestAll(url, qs.stringify(data), {
            'X-Requested-With': 'XMLHttpRequest'
        }, 'DELETE')
    }
}
