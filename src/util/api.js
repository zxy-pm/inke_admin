import axios from "axios";
import router from "../router";
import ElementUI from 'element-ui'

const api = axios.create({
    timeout: 40000,
    withCredentials: true,
    baseURL:window.location.port==8080?'http://127.0.0.1:8000':''
})
function err(msg, type) {
    ElementUI.Message({
        showClose: false,
        message: msg,
        duration: type ? 1000 : 3000,
        type: type ? 'success' : 'error'
    });
}

var loadingShow = null;
api.do = function (url, data, suc) {
    loadingShow = ElementUI.Loading.service()
    api.post(url, data).then((res) => {
        let data = res.data;
        if (data.code == -1) {
            //去登录
            router.replace('/login')
            err(data.msg + ' 错误码:' + data.code);
        } else if (data.code != 0) {
            err(data.msg + ' 错误码:' + data.code);
        } else {
            if (suc) {
                try {//用户自己的处理逻辑阐释的错误只打印错误日志,不提示错误
                    suc(data);
                } catch (e) {
                    console.error(e.toLocaleString())
                }

            }
            err(data.msg, 1);
        }
        loadingShow.close();
    }).catch((error) => {
        err('网络错误');
        loadingShow.close();
    })
}
export default api