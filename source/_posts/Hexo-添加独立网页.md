---
title: Hexo 添加独立网页
tags:
  - Hexo
  - 博客配置
categories:
  - Hexo
abbrlink: dccdbb56
date: 2026-06-16 20:54:28
cover: https://cdn.jsdelivr.net/gh/moqa5212/EiraGallery@main/imgs/20260617231220302.webp
---

Hexo 默认使用主题渲染页面，但嵌入作品集、特效展示等独立网页时，易引发样式冲突。本文将介绍如何通过配置，让 Hexo 在生成静态文件时直接复制这些文件，跳过主题渲染，从而实现页面的完全独立

## 💡 核心原理：跳过渲染 

Hexo 提供了一个非常实用的配置项 `skip_render`。当我们在配置文件中指定了该路径后，Hexo 在执行 `hexo generate` 命令时，会跳过对这些文件的 Markdown 解析和主题模板渲染，直接将它们原封不动地复制到 `public` 文件夹中

##  🛠️ 详细操作步骤

### 第一步：创建文件夹并放入源码

1. 打开你的 Hexo 博客根目录，进入 `source` 文件夹。
2. 新建一个文件夹用于存放你的独立网页。**强烈建议使用全小写英文命名**（例如 `demo`、`portfolio`），避免在部署到 GitHub Pages 等服务器时因大小写敏感问题导致 404 错误。
3. 将你的独立网页源码放入该文件夹中。通常你需要包含一个 `index.html` 文件，以及配套的 CSS、JS 和 Images 文件夹。

最终的目录结构应该类似这样：

```text
source/
└── demo/
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

### 第二步：配置跳过渲染

1. 回到 Hexo 博客根目录，找到并打开站点配置文件 `_config.yml`。
2. 找到 `skip_render` 配置项（如果没有，可以手动添加）。
3. 根据你的需求配置路径。推荐使用数组格式，方便后续添加多个独立页面：

```yaml
# 跳过渲染配置
skip_render:
  - "demo/**"      # 跳过 demo 文件夹下的所有文件及子文件夹
```

**路径匹配规则说明：**

- `demo/*` ：仅跳过 `demo` 文件夹下的第一层文件，不包含子文件夹内的文件。
- `demo/**` ：跳过 `demo` 文件夹下的所有文件，**包括所有子文件夹及其内部文件**（最常用）。
- `demo/*.html` ：仅跳过 `demo` 文件夹下的 `.html` 文件。

### 第三步：检查并修正资源路径

这是最容易出错的一步！因为跳过了渲染，Hexo 不会帮你处理 CSS 和 JS 的路径。你需要打开 `index.html`，检查资源引用的路径是否为相对路径。

**错误示范（绝对路径）：**

```html
<link rel="stylesheet" href="/css/style.css">
```

**正确示范（相对路径）：**

```html
<link rel="stylesheet" href="css/style.css">
```

### 第四步：本地测试与部署

配置完成后，务必按照以下标准流程进行测试：

```bash
# 1. 清理缓存（非常重要，防止旧缓存导致页面不更新）
hexo clean

# 2. 生成静态文件
hexo generate

# 3. 启动本地服务器预览
hexo server
```

在浏览器中访问 `http://localhost:4000/demo/`，确认页面样式正常、JS 交互无误后，再执行 `hexo deploy` 部署到远程服务器。

## ✨ 进阶：将独立网页添加到导航菜单

如果你希望访客能通过博客的导航栏直接进入这个独立页面，你需要修改**主题配置文件**（例如 Butterfly 主题的 `_config.butterfly.yml`）。

在 `menu` 菜单配置下添加：

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  作品集: /demo/ || fas fa-code  # 添加这一行，路径对应 source 下的文件夹名
```

## 📋 总结

> 通过 `skip_render` 配置，我们可以非常灵活地在 Hexo 博客中嵌入任何自定义的静态网页。这种方法既保留了 Hexo 博客的完整性，又赋予了开发者极大的自由度。下次当你有了炫酷的前端小项目，不妨用这个方法把它挂到博客上吧！

