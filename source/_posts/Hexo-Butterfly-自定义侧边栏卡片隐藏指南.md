---
title: Hexo Butterfly 自定义侧边栏卡片隐藏指南
tags:
  - Hexo
  - Butterfly
  - 博客配置
categories:
  - Hexo
abbrlink: 358601f4
date: 2026-06-16 20:21:13
cover: https://cdn.jsdelivr.net/gh/moqa5212/EiraGallery@main/imgs/20260617231239539.webp

---

Hexo **Butterfly** 主题的侧边栏（Aside）默认会显示博主信息、最新文章、分类等全量卡片。但在“分类”或“标签”等特定页面，继续显示对应卡片会造成信息冗余。本文介绍一种**无痛扩展方案**：无需修改主题源码，利用 Hexo 过滤器脚本在编译时将 CSS 动态注入 HTML，实现通过页面 `Front-matter` 配置自由隐藏指定侧边栏卡片


## 💡 核心原理

Hexo 提供了 `after_render:html` 过滤器，允许在 HTML 渲染完成后、写入文件前对其内容进行修改。本方案通过脚本检测页面 `Front-matter` 中是否包含 `hide_cards` 字段。若存在，则生成 `display: none !important;` 的 CSS 规则，并将其精确注入到页面 `#body-wrap` 容器的起始位置，从而利用样式覆盖实现卡片隐藏


## 🛠️ 操作步骤

### 1. 创建 Hexo 脚本

在你的 Hexo 博客 **根目录**（注意不是 `themes/butterfly` 目录）下，找到或创建 `scripts` 文件夹。在该文件夹内新建一个名为 `custom_sidebar.js` 的文件

文件路径应为：`/scripts/custom_sidebar.js`


### 2. 编写注入逻辑

打开 custom_sidebar.js，将以下代码复制并粘贴到该文件中：

```javascript
/**
 * Hexo 自定义侧边栏卡片隐藏脚本
 * 适用于 Butterfly 主题
 */
hexo.extend.filter.register('after_render:html', function(str, data) {
    // 检查当前页面数据是否存在 hide_cards 字段且为数组
    if (data && data.page && data.page.hide_cards && Array.isArray(data.page.hide_cards)) {
        let cssRules = '';

        // 遍历需要隐藏的卡片列表
        data.page.hide_cards.forEach(card => {
            // 构建 CSS 选择器规则，强制隐藏对应 ID 的元素
            cssRules += `#body-wrap #aside-content .card-${card} { display: none !important; }\n`;
        });

        // 将 CSS 规则包裹在 style 标签中
        const styleTag = `<style type="text/css" class="custom-pjax-sidebar">\n${cssRules}</style>`;

        // 将生成的样式注入到 body-wrap div 之后
        return str.replace(/(<div[^>]*id=["']body-wrap["'][^>]*>)/i, '$1\n' + styleTag);
    }
    // 如果不需要隐藏，返回原始字符串
    return str;
});

```

### 3. 在页面中应用配置

现在，你可以在任意想要自定义侧边栏的 Markdown 文件（`.md`）的 **Front-matter**（头部元数据区域）中使用 `hide_cards` 字段，并在下方列出你想隐藏的卡片类型名称

**示例代码：**

```yaml
---
title: 我的工具箱
date: 2026-06-16 15:00:00
type: "tool"
# 在此处添加隐藏配置
hide_cards:
  - announcement      # 隐藏公告
  - recent-post       # 隐藏最新文章
  - categories        # 隐藏分类
  - tags              # 隐藏标签
  - webinfo           # 隐藏网站资讯
---
这里是正文内容...
```

## 📋 参数配置速查表

在页面顶部的 `Front-matter` 中，通过 `hide_cards` 数组填入以下对应的参数，即可隐藏指定的侧边栏卡片：

| 参数名称 | 隐藏卡片类型 | 对应的 CSS 选择器 |
| :--- | :---: | :--- |
| `author` | 博主信息 | `#body-wrap #aside-content .card-author` |
| `announcement` | 网站公告 | `#body-wrap #aside-content .card-announcement` |
| `recent-post` | 最新文章 | `#body-wrap #aside-content .card-recent-post` |
| `categories` | 文章分类 | `#body-wrap #aside-content .card-categories` |
| `tags` | 文章标签 | `#body-wrap #aside-content .card-tags` |
| `archives` | 文章归档 | `#body-wrap #aside-content .card-archives` |
| `webinfo` | 网站资讯 | `#body-wrap #aside-content .card-webinfo` |


## ✨ 效果验证与部署

完成上述脚本创建和页面配置后，你需要在 Hexo 博客根目录下执行以下命令，清理旧的缓存并重新编译生成静态文件：

```bash
# 清理缓存并重新生成、启动本地服务
hexo clean && hexo g && hexo s
```