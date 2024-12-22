// 从URL获取商品ID
const urlParams = new URLSearchParams(location.search);
const goodsId = urlParams.get('id');

// 如果没有商品ID则返回列表页
if (!goodsId) {
    location.href = 'goods-list.html';
}

// 获取商品详情
async function getGoodsDetail() {
    try {
        // 使用 restful 风格的请求
        const res = await axios.get(`/goods/item/${goodsId}`);
        
        if (res.data.code === 1) {
            renderGoodsDetail(res.data.info);
        } else {
            alert('获取商品详情失败：' + res.data.message);
            location.href = 'goods-list.html';
        }
    } catch (err) {
        console.error('获取商品详情失败:', err);
        alert('获取商品详情失败，请重试');
        location.href = 'goods-list.html';
    }
}

// 渲染商品详情
function renderGoodsDetail(goods) {
    // 设置页面标题
    document.title = goods.title;
    
    // 设置商品图片
    const goodsImage = document.querySelector('.goods-image img');
    goodsImage.src = goods.img_big_logo;
    goodsImage.alt = goods.title;
    
    // 设置商品标题
    document.querySelector('.goods-title').textContent = goods.title;
    
    // 设置商品价格
    document.querySelector('.current-price').textContent = `￥${goods.current_price}`;
    
    // 如果是特价商品，显示原价和折扣信息
    if (goods.is_sale) {
        document.querySelector('.original-price').textContent = `￥${goods.price}`;
        document.querySelector('.sale-type').textContent = goods.sale_type;
    } else {
        // 如果不是特价商品，隐藏原价和折扣信息
        document.querySelector('.original-price').style.display = 'none';
        document.querySelector('.sale-type').style.display = 'none';
    }
    
    // 设置基本信息
    document.querySelector('.category').textContent = goods.category;
    document.querySelector('.number').textContent = goods.goods_number;
    
    // 设置商品详情(HTML内容)
    const introduceContent = document.querySelector('.introduce-content');
    if (goods.goods_introduce) {
        introduceContent.innerHTML = goods.goods_introduce;
    } else {
        introduceContent.innerHTML = '<p>暂无详细介绍</p>';
    }
}

// 页面加载时获取商品详情
getGoodsDetail(); 