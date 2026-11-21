---
title: 在 Hexo + Butterfly 中渲染 Mermaid 图表
tags:
  - Hexo
  - Butterfly
  - 教程
categories:
  - Hexo
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6
abbrlink: 4111567420
date: 2026-11-20 00:00:00
---

Mermaid 是一种用文本描述图表的工具，写流程图、时序图、甘特图都不用拖拽画布，直接在 Markdown 里写代码块就行。Butterfly 主题支持通过插件渲染 Mermaid，配置起来也很简单。

---

### 一、安装插件

在博客根目录执行：

```bash
npm install --save hexo-filter-mermaid-diagrams
```

这个插件负责把文章里的 Mermaid 代码块识别出来并交给前端渲染。

---

### 二、配置主题

打开主题目录下的 `themes/butterfly/_config.yml`(或博客根目录下的`_config.butterfly.yml`)，找到（或添加）`mermaid` 配置：

```yaml
# Mermaid
# https://github.com/mermaid-js/mermaid
mermaid:
  enable: true
  # Write Mermaid diagrams using code blocks
  code_write: true
  # built-in themes: default / forest / dark / neutral
  theme:
    light: default
    dark: dark
  # Enable "Open in New Tab" button to view diagram in a separate window
  open_in_new_tab: true
  # Enable zoom and pan interactions on diagrams
  zoom_pan: true
```

几个关键项：

- `enable`：开启 Mermaid 支持。
- `code_write`：允许用代码块写 Mermaid，**必须为 `true`**，否则代码块不会转成图表。
- `theme.light` / `theme.dark`：分别对应浅色、深色模式下的图表主题。

---

### 三、初始化脚本

打开 `themes/butterfly/layout/includes/footer.pug`，在文件末尾添加下面的初始化脚本：

```pug
if theme.mermaid && theme.mermaid.enable
script(src=`https://unpkg.com/mermaid@11.5.0/dist/mermaid.min.js`)
script.
    if (window.mermaid) {
    mermaid.initialize({
        startOnLoad: true,
        theme: '#{theme.mermaid.theme || 'default'}',
        securityLevel: 'loose',
        flowchart: { useMaxWidth: true, htmlLabels: true }
    });
    }
```

这段脚本负责引入 `mermaid.js` 并完成初始化。其中 `startOnLoad: true` 会让页面加载时自动渲染所有图表，`securityLevel: 'loose'` 则允许 Mermaid 使用 HTML 标签做节点内容。

---

### 四、在文章中使用

在 Markdown 里写一个 `mermaid` 代码块即可：

````markdown
```mermaid
flowchart LR
    A[安装插件] --> B[配置主题]
    B --> C[添加初始化脚本]
    C --> D[文章里写代码块]
    D --> E[重新生成]
    E --> F[图表渲染成功]
```
````
**来看看效果**

```mermaid
flowchart LR
    A[安装插件] --> B[配置主题]
    B --> C[添加初始化脚本]
    C --> D[文章里写代码块]
    D --> E[重新生成]
    E --> F[图表渲染成功]
```

只要语言标注写成 `mermaid`，插件就会把它当成图表来处理。

---

### 五、重新生成

改完配置后，重新生成一次站点：

```bash
hexo clean && hexo g && hexo s
```

本地预览没问题，再推送到线上即可。


