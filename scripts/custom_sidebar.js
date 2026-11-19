// 打开任何想自定义隐藏侧边栏的 .md 文件，在头部的 Front-matter 中写入想隐藏卡片的名称，例如：
// hide_cards:
//   - announcement

hexo.extend.filter.register('after_render:html', function(str, data) {
    if (data && data.page && data.page.hide_cards && Array.isArray(data.page.hide_cards)) {
        let cssRules = '';
        data.page.hide_cards.forEach(card => {
            cssRules += `#body-wrap #aside-content .card-${card} { display: none !important; }\n`;
        });
        const styleTag = `<style type="text/css" class="custom-pjax-sidebar">\n${cssRules}</style>`;
        return str.replace(/(<div[^>]*id=["']body-wrap["'][^>]*>)/i, '$1\n' + styleTag);
    }
    return str;
});
