---
title: Hexo Butterfly 配置 KaTex 公式
tags:
  - Hexo
  - Butterfly
  - 博客配置
categories:
  - Hexo
abbrlink: f1f07210
date: 2026-06-15 23:53:29
cover: https://cdn.jsdelivr.net/gh/moqa5212/EiraGallery@main/imgs/20260617231255856.webp
---


对于使用 Hexo 搭建博客的朋友来说，Butterfly 主题内置了对 MathJax 和 KaTeX 的支持。考虑到 KaTeX 具有**渲染速度快、样式轻量**的优势，本文将以 Butterfly 主题为例，详细介绍如何配置并启用 KaTeX 数学公式渲染引擎

## 配置主题文件

首先，我们需要在 Butterfly 主题的配置文件中指定使用 KaTeX

打开主题目录下的 `_config.yml` 文件，找到 `math` 配置项，按照以下方式进行修改：

```yaml
# --------------------------------------
# Math
# --------------------------------------
math:
  # 选择使用的渲染引擎，这里填写 katex
  use: katex
  
  # 全局加载设置
  # 设置为 true 表示在每个页面都加载渲染脚本，无需在文章 Front-matter 中单独声明
  per_page: true
  
  # KaTeX 专属配置
  katex:
    # 启用复制公式功能
    copy_tex: true
    # 隐藏滚动条（可选）
    hide_scrollbal: true
```

## 安装依赖插件

这一步是关键。Butterfly 默认可能使用的是 `marked` 渲染器，我们需要将其替换为兼容性更好的 `markdown-it`，并安装 KaTeX 相关插件

请在博客根目录的终端中依次执行以下命令：

```bash
# 1. 卸载默认的 marked 渲染器
npm un hexo-renderer-marked --save

# 2. 安装 markdown-it 作为基础 Markdown 解析器
npm install hexo-renderer-markdown-it --save

# 3. 安装 KaTeX 核心库及 markdown-it 插件
npm install katex @renbaoshuo/markdown-it-katex --save
```

## 配置站点文件

仅安装插件还不够，还需要告诉 Hexo 去使用它。打开博客**根目录**（而非主题目录）的 `_config.yml` 文件，在末尾添加或修改 `markdown` 配置：

```yaml
markdown:
  plugins:
    - '@renbaoshuo/markdown-it-katex'
```

## 重启服务器

重新启动Hexo服务器，查看公式是否正常渲染：

```bash
hexo clean && hexo s
```

## 编写与测试公式

在撰写文章时，您可以使用以下语法插入公式：

- **行内公式：** 使用 `$...$` 包裹，例如 `$E=mc^2$`。
- **独立公式：** 使用 `$$...$$` 包裹。

### 示例代码：

```latex
$$
S_n = \sum_{i=1}^{n} \frac{1}{i}
$$
```

### 渲染效果：

$$
S_n = \sum_{i=1}^{n} \frac{1}{i}
$$


## 🌟 优势总结

**KaTeX 相比 MathJax 的优势：**

- 渲染速度更快，提升用户体验
- 文件体积更小，减少页面加载时间
- 样式更简洁，视觉效果更佳
- 支持公式复制功能


