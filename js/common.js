// 检查登录状态
function checkLogin() {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const userMenu = document.querySelector('.user-menu');
    const username = document.querySelector('.username');
    
    if (token && userInfo.id) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userMenu.style.display = 'block';
        username.textContent = userInfo.nickname || userInfo.username;
        return true;
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userMenu.style.display = 'none';
        return false;
    }
}

// 退出登录
document.querySelector('.logout')?.addEventListener('click', async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    try {
        const res = await axios.get(`/users/logout/${userInfo.id}`);
        if (res.data.code === 1) {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            location.reload();
        }
    } catch (err) {
        console.error('退出失败:', err);
    }
}); 