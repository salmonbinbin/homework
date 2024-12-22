# 仿站电商平台项目

## 项目介绍
这是一个基于原生JavaScript开发的电商平台前端项目，实现了用户注册、登录、商品展示、个人中心等基础功能。

## 技术栈
- HTML5
- CSS3 
- JavaScript
- Axios (HTTP请求)
- Swiper (轮播图组件)

## 项目结构
```
项目目录/
  ├── css/              # 样式文件
  │   ├── common.css    # 公共样式
  │   ├── index.css     # 首页样式
  │   └── login.css     # 登录/注册相关页面样式
  │
  ├── js/               # JavaScript文件
  │   ├── config.js     # 配置文件
  │   ├── common.js     # 公共函数
  │   ├── index.js      # 首页逻辑
  │   ├── login.js      # 登录逻辑
  │   ├── register.js   # 注册逻辑
  │   └── personal.js   # 个人中心逻辑
  │
  ├── lib/              # 第三方库
  │   ├── swiper/       # 轮播图组件
  │   └── axios.min.js  # HTTP请求库
  │
  ├── img/              # 图片资源
  │
  ├── index.html        # 首页
  ├── login.html        # 登录页
  ├── register.html     # 注册页
  ├── personal.html     # 个人中心
  └── change-password.html  # 修改密码页
```

## 功能列表
1. 用户模块
   - 用户注册
   - 用户登录
   - 退出登录
   - 个人信息修改
   - 密码修改

2. 首页模块
   - 轮播图展示
   - 导航菜单
   - 登录状态展示

3. 商品模块
   - 商品列表展示
   - 商品详情页
   - 分页功能

## 运行说明
1. 启动本地服务器
   - 解压 server.rar 压缩包
   - 运行 "win点我启动.bat" 文件
   - 服务器默认运行在 http://localhost:8888

2. 访问页面
   - 首页：http://localhost:8888/index.html
   - 登录页：http://localhost:8888/login.html
   - 注册页：http://localhost:8888/register.html
   - 个人中心：http://localhost:8888/personal.html
   - 修改密码：http://localhost:8888/change-password.html

## 接口说明
1. 基础信息
   - 基准地址：http://localhost:8888
   - 数据格式：JSON
   - 请求方式：GET/POST

2. 状态码说明
   - 1: 请求成功
   - 0: 请求失败
   - 5: 参数格式错误
   - 401: token验证失败

3. 主要接口
   - 用户登录：POST /users/login
   - 用户注册：POST /users/register
   - 注销登录：GET /users/logout/:id
   - 获取商品列表：GET /goods/list
   - 获取商品详情：GET /goods/item/:id

## 注意事项
1. 用户名和密码规则：
   - 用户名：4-12位字母数字
   - 密码：6-12位字母数字

2. 登录说明：
   - 登录状态默认保持1小时
   - 需要登录的接口需要在请求头携带 authorization 字段


## 作者
黄浩彬

## 版本
v1.0.0 