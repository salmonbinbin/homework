// 从localStorage获取登录状态和用户信息
const token = localStorage.getItem('token');
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

// 检查登录状态，未登录则跳转到登录页
if (!token || !userInfo.id) {
    alert('请先登录');
    location.href = 'login.html';
}

// 获取用户信息并填充表单
async function getUserInfo() {
    try {
        // 发送获取用户信息请求
        const res = await axios.get(`/users/info/${userInfo.id}`);
        
        if (res.data.code === 1) {
            const info = res.data.info;
            // 填充表单数据
            const form = document.getElementById('personalForm');
            form.username.value = info.username;
            form.nickname.value = info.nickname || '';
            form.gender.value = info.gender || '男';
            form.age.value = info.age || '';
        } else {
            alert('获取用户信息失败：' + res.data.message);
            // 如果是token过期，跳转到登录页
            if (res.data.code === 401) {
                location.href = 'login.html';
            }
        }
    } catch (err) {
        console.error('获取用户信息失败:', err);
        // 处理401未授权错误
        if (err.response && err.response.status === 401) {
            alert('登录已过期，请重新登录');
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            location.href = 'login.html';
        } else {
            alert('获取用户信息失败，请重试');
        }
    }
}

// 页面加载时获取用户信息
getUserInfo();

// 处理表单提交 - 更新用户信息
document.getElementById('personalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(e.target);
    const age = formData.get('age');
    
    // 验证年龄是否为数字
    if (age && isNaN(age)) {
        alert('年龄必须是数字');
        return;
    }
    
    try {
        // 创建表单数据对象
        const params = new URLSearchParams();
        params.append('id', userInfo.id);
        params.append('nickname', formData.get('nickname'));
        params.append('gender', formData.get('gender'));
        params.append('age', age); // 添加年龄数据
        
        // 发送更新请求
        const res = await axios.post('/users/update', params);
        
        if (res.data.code === 1) {
            alert('修改成功');
            // 重新获取用户信息以更新显示
            getUserInfo();
        } else {
            alert(res.data.message);
        }
    } catch (err) {
        console.error('修改失败:', err);
        alert('修改失败,请重试');
    }
}); 