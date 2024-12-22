// 检查登录状态并更新用户信息显示
function updateUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const token = localStorage.getItem('token');
    const userInfoEl = document.querySelector('.user-info');
    const usernameEl = userInfoEl.querySelector('.username');
    const navLink = userInfoEl.querySelector('.nav-link');
    const logoutBtn = userInfoEl.querySelector('.logout-btn');
    
    if (token && userInfo.id) {
        // 已登录状态
        usernameEl.textContent = userInfo.nickname || userInfo.username;
        usernameEl.style.display = 'inline';
        navLink.style.display = 'inline';
        logoutBtn.style.display = 'inline';
    } else {
        // 未登录状态
        userInfoEl.innerHTML = `
            <span>您好！</span>
            <a href="login.html" class="login-btn">请登录</a>
        `;
    }
}

// 退出登录
document.querySelector('.logout-btn')?.addEventListener('click', async () => {
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

// 初始化轮播图
const swiper = new Swiper('.swiper', {
    // 循环
    loop: true,
    
    // 自动播放
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    
    // 分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    
    // 前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 切换效果
    effect: 'slide', // 使用默认的slide滑动效果
    
    // 切换速度
    speed: 500,
});

// 获取商品列表
async function getGoodsList() {
    try {
        const res = await axios.get('/goods/list', {
            params: {
                current: 1,
                pagesize: 8
            }
        });
        
        if (res.data.code === 1) {
            renderGoodsList(res.data.list);
        }
    } catch (err) {
        console.error('获取商品列表失败:', err);
    }
}

// 渲染商品列表
function renderGoodsList(goods) {
    const goodsListEl = document.querySelector('.goods-list');
    goodsListEl.innerHTML = goods.map(item => `
        <div class="goods-item">
            <a href="goods-detail.html?id=${item.goods_id}">
                <img src="${item.img_big_logo}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p class="price">
                    <span class="current">￥${item.current_price}</span>
                    ${item.is_sale ? `<span class="original">￥${item.price}</span>` : ''}
                </p>
            </a>
        </div>
    `).join('');
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', () => {
    updateUserInfo();
    getGoodsList();
}); 