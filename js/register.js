document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const rpassword = formData.get('rpassword');
    const nickname = formData.get('nickname');
    
    // 表单验证
    if (!username || !password || !rpassword || !nickname) {
        alert('所有字段都不能为空');
        return;
    }
    
    // 用户名和密码的正则验证
    const usernameReg = /^[a-z0-9]\w{3,11}$/;
    const passwordReg = /\w{6,12}/;
    
    if (!usernameReg.test(username)) {
        alert('用户名格式不正确(4-12位字母数字下划线，必须以字母或数字开头)');
        return;
    }
    
    if (!passwordReg.test(password)) {
        alert('密码格式不正确(6-12位字母数字下划线)');
        return;
    }
    
    if (password !== rpassword) {
        alert('两次密码输入不一致');
        return;
    }
    
    try {
        // 使用 application/x-www-form-urlencoded 格式
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('rpassword', rpassword);
        formData.append('nickname', nickname);
        
        const res = await axios.post('/users/register', formData);
        
        if (res.data.code === 1) {
            alert('注册成功');
            location.href = 'login.html';
        } else {
            alert(res.data.message);
        }
    } catch (err) {
        console.error('注册失败:', err);
        alert('注册失败,请重试');
    }
}); 