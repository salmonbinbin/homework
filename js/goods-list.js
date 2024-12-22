// 定义分页相关变量
let currentPage = 1;    // 当前页码
let pageSize = 8;       // 每页显示数量
let totalPages = 1;     // 总页数

// 获取商品列表数据
async function getGoodsList() {
    try {
        // 发送获取商品列表请求
        const res = await axios.get('/goods/list', {
            params: {
                current: currentPage,
                pagesize: pageSize
            }
        });
        
        if (res.data.code === 1) {
            // 渲染商品列表
            renderGoodsList(res.data.list);
            // 计算总页数
            totalPages = Math.ceil(res.data.total / pageSize);
            // 更新分页器显示
            updatePagination();
        } else {
            alert('获取商品列表失败：' + res.data.message);
        }
    } catch (err) {
        console.error('获取商品列表失败:', err);
        alert('获取商品列表失败，请重试');
    }
}

// 渲染商品列表
function renderGoodsList(goods) {
    const goodsListEl = document.querySelector('.goods-list');
    // 使用map生成商品列表HTML
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

// 更新分页器状态
function updatePagination() {
    // 更新页码显示
    document.querySelector('.current-page').textContent = currentPage;
    document.querySelector('.total-pages').textContent = totalPages;
    
    // 更新按钮禁用状态
    document.querySelector('.first-page').disabled = currentPage === 1;
    document.querySelector('.prev-page').disabled = currentPage === 1;
    document.querySelector('.next-page').disabled = currentPage === totalPages;
    document.querySelector('.last-page').disabled = currentPage === totalPages;
}

// 绑定分页按钮事件
// 首页按钮
document.querySelector('.first-page').addEventListener('click', () => {
    if (currentPage !== 1) {
        currentPage = 1;
        getGoodsList();
    }
});

// 上一页按钮
document.querySelector('.prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getGoodsList();
    }
});

// 下一页按钮
document.querySelector('.next-page').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        getGoodsList();
    }
});

// 尾页按钮
document.querySelector('.last-page').addEventListener('click', () => {
    if (currentPage !== totalPages) {
        currentPage = totalPages;
        getGoodsList();
    }
});

// 监听每页显示数量变化
document.querySelector('.page-size-select').addEventListener('change', (e) => {
    pageSize = Number(e.target.value);
    currentPage = 1; // 切换显示数量时重置为第一页
    getGoodsList();
});

// 页面加载时获取商品列表
getGoodsList(); 