// 检查登录状态
const token = localStorage.getItem('token');
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

if (!token || !userInfo.id) {
    location.href = 'login.html';
}

// 处理修改密码
document.getElementById('changePwdForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');
    const rNewPassword = formData.get('rNewPassword');
    
    // 表单验证
    if (!oldPassword || !newPassword || !rNewPassword) {
        alert('所有字段都不能为空');
        return;
    }
    
    // 密码正则验证
    const passwordReg = /\w{6,12}/;
    if (!passwordReg.test(newPassword)) {
        alert('新密码格式不正确(6-12位字母数字下划线)');
        return;
    }
    
    if (newPassword !== rNewPassword) {
        alert('两次新密码输入不一致');
        return;
    }
    
    try {
        const formData = new URLSearchParams();
        formData.append('id', userInfo.id);
        formData.append('oldPassword', oldPassword);
        formData.append('newPassword', newPassword);
        formData.append('rNewPassword', rNewPassword);
        
        const res = await axios.post('/users/rpwd', formData);
        
        if (res.data.code === 1) {
            alert('修改密码成功,请重新登录');
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            location.href = 'login.html';
        } else {
            alert(res.data.message);
        }
    } catch (err) {
        console.error('修改密码失败:', err);
        alert('修改密码失败,请重试');
    }
}); 