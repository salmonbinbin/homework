// 监听登录表单提交事件
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    // 阻止表单默认提交行为
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // 表单验证 - 非空检查
    if (!username || !password) {
        alert('用户名和密码不能为空');
        return;
    }
    
    // 正则表达式验证
    const usernameReg = /^[a-z0-9]\w{3,11}$/; // 用户名：4-12位字母数字下划线，必须以字母或数字开头
    const passwordReg = /\w{6,12}/;           // 密码：6-12位字母数字下划线
    
    // 验证用户名格式
    if (!usernameReg.test(username)) {
        alert('用户名格式不正确(4-12位字母数字下划线)');
        return;
    }
    
    // 验证密码格式
    if (!passwordReg.test(password)) {
        alert('密码格式不正确(6-12位字母数字下划线)');
        return;
    }
    
    try {
        // 创建表单数据对象，用于发送请求
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        
        // 发送登录请求
        const res = await axios.post('/users/login', formData);
        
        // 处理响应结果
        if (res.data.code === 1) {
            // 登录成功，保存token和用户信息
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userInfo', JSON.stringify(res.data.user));
            // 跳转到首页
            location.href = 'index.html';
        } else {
            // 登录失败，显示错误信息
            alert(res.data.message);
        }
    } catch (err) {
        // 捕获并处理请求错误
        console.error('登录失败:', err);
        alert('登录失败,请重试');
    }
}); 