<div align="center">

# 📋 JSON 动态表单生成器

[![Demo](https://img.shields.io/badge/Demo-在线预览-brightgreen?style=flat-square)](http://demo.xiaowiba.com/demo/form/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](#)
[![Angular](https://img.shields.io/badge/Angular-AngularJS-red?style=flat-square&logo=angular)](https://angularjs.org/)
[![MUI](https://img.shields.io/badge/UI-MUI-blue?style=flat-square)](https://dev.dcloud.net.cn/mui/)

*一个基于 JSON 配置自动生成表单的前端解决方案*

[在线预览](http://demo.xiaowiba.com/demo/form/) | [快速开始](#-快速开始) | [功能特性](#-功能特性)

</div>

---

<!-- ## 📸 项目预览

<img src="http://tva1.sinaimg.cn/large/007X8olVly1g8fb5hbrqej308c08c742.jpg" alt="项目预览" width="300" /> -->

## ✨ 功能特性

- 🎯 **JSON 驱动** - 通过 JSON 配置自动生成复杂表单
- 📱 **移动优先** - 基于 MUI 框架，完美适配移动端
- 🔄 **动态交互** - 支持表单联动、自动计算、条件显示
- 📝 **丰富组件** - 支持多种表单控件类型
- 💾 **数据持久化** - 自动保存表单数据
- 🎨 **可定制化** - 灵活的样式和布局配置

## 🎨 支持的表单控件

| 控件类型 | 说明 | 图标 |
|---------|------|------|
| 单行文本框 | 基础文本输入 | 📝 |
| 多行文本框 | 长文本输入 | 📄 |
| 数字文本框 | 数字输入（支持单位） | 🔢 |
| 单选框 | 单项选择 | ⭕ |
| 多选框 | 多项选择 | ☑️ |
| 日期选择器 | 日期选择 | 📅 |
| 时间选择器 | 时间选择 | ⏰ |
| 图片上传 | 文件上传 | 📷 |
| 标签 | 静态文本展示 | 🏷️ |

## 🚀 快速开始

### 环境要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 ES5+ 的 JavaScript 环境

### 安装使用

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd form
   ```

2. **直接运行**
   
   使用任意 HTTP 服务器打开 `index.html` 即可：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx serve
   ```

3. **访问应用**
   
   在浏览器中打开 `http://localhost:8000`

## 📦 技术栈

- **前端框架**: AngularJS + Ionic
- **UI 组件**: MUI (Mobile UI)
- **工具库**: 
  - jQuery 2.2.4
  - ECharts (图表)
  - EXIF.js (图片处理)
  - Clipboard.js (剪贴板)

## 📂 项目结构

```
form/
├── index.html              # 主入口文件
├── resources/              # 资源文件夹
│   ├── css/               # 样式文件
│   ├── js/                # JavaScript 文件
│   │   ├── app.js        # Angular 应用主文件
│   │   ├── common.js     # 公共函数
│   │   └── index.js      # 页面逻辑
│   ├── json/              # JSON 配置文件
│   │   ├── shouzhen/     # 首诊表单配置
│   │   └── shuizhen/     # 随诊表单配置
│   ├── img/               # 图片资源
│   └── plugin/            # 第三方插件
└── README.md              # 项目说明
```

## 🔧 JSON 配置说明

表单通过 JSON 配置文件定义，主要结构：

```json
{
  "Pages": [
    {
      "PageNo": "页面编号",
      "DisplayName": "页面名称",
      "Sections": [
        {
          "SectionNo": "区块编号",
          "Items": [
            {
              "ItemNo": "字段编号",
              "DisplayName": "字段名称",
              "UIType": {
                "Code": "控件类型代码"
              },
              "Valueset": {
                "Concepts": []
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### 控件类型代码

- `10000001` - 单行文本框
- `10000002` - 标签
- `10000003` / `10000005` - 单选框
- `10000004` / `10001196` - 多选框
- `10000007` - 时间选择器
- `10000008` - 日期选择器
- `10000009` - 多行文本框
- `10006719` - 数字文本框

## 🎯 核心功能

### 1. 表单联动
支持根据选项自动显示/隐藏相关字段

### 2. 自动计算
支持字段间的自动计算功能（如 BMI 计算）

### 3. 数据验证
内置数据验证机制，确保数据完整性

### 4. 分页导航
支持多页表单，顶部滚动导航

### 5. 图片上传
支持图片上传、预览、EXIF 信息读取

## 🌐 浏览器兼容性

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| IE | ⚠️ IE 10+ |

## 📝 开发说明

### 添加新的表单控件

1. 在 JSON 配置中定义新字段
2. 在 `index.html` 中添加对应的 Angular 模板
3. 在 `app.js` 中实现相关逻辑

### 自定义样式

修改 `resources/css/index.css` 文件来自定义表单样式

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

<div align="center">

**[⬆ 回到顶部](#-json-动态表单生成器)**

Made with ❤️ by Form Team

</div>
