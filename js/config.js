const BASE_URL = 'http://localhost:8888';

// axios全局配置
axios.defaults.baseURL = BASE_URL;

// 添加请求拦截器
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = token;
    }
    return config;
});

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            location.href = 'login.html';
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
); 