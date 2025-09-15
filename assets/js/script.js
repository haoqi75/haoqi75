// 获取 URL 参数中的 md 值，如果没有则使用默认地址
const urlParams = new URLSearchParams(window.location.search);
const mdUrl = urlParams.get('md') || 'https://cpb.qtdt.dpdns.org/api/raw/index';

// 大纲功能
function generateTOC() {
  const headings = document.querySelectorAll('#content h1, #content h2, #content h3, #content h4');
  const tocContent = document.getElementById('toc-content');
  
  if (headings.length === 0) {
    tocContent.innerHTML = '<p style="color: #999; text-align: center;">暂无大纲内容</p>';
    return;
  }
  
  let tocHTML = '';
  
  headings.forEach((heading, index) => {
    const level = heading.tagName.substring(1);
    const text = heading.textContent;
    const id = heading.id || `heading-${index}`;
    
    if (!heading.id) {
      heading.id = id;
    }
    
    tocHTML += `
      <div class="toc-item toc-h${level}" onclick="scrollToHeading('${id}')">
        ${text}
      </div>
    `;
  });
  
  tocContent.innerHTML = tocHTML;
}

// 滚动到指定标题
function scrollToHeading(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    // 在移动设备上自动关闭大纲
    if (window.innerWidth < 768) {
      toggleTOC();
    }
  }
}

// 切换大纲显示
function toggleTOC() {
  const tocSidebar = document.getElementById('toc-sidebar');
  const overlay = document.getElementById('toc-overlay');
  
  if (tocSidebar.classList.contains('active')) {
    tocSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  } else {
    tocSidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
  }
}

// 点击遮罩层关闭大纲
function closeTOCOnOverlayClick(e) {
  if (e.target.classList.contains('toc-overlay')) {
    toggleTOC();
  }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  fetch(mdUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(markdown => {
      document.getElementById('content').innerHTML = marked.parse(markdown);
      
      // 代码高亮
      Prism.highlightAll();
      
      // 生成大纲
      generateTOC();
      
      // 绑定大纲切换按钮
      document.getElementById('toc-toggle').addEventListener('click', toggleTOC);
      
      // 添加遮罩层
      const overlay = document.createElement('div');
      overlay.id = 'toc-overlay';
      overlay.className = 'toc-overlay';
      overlay.addEventListener('click', closeTOCOnOverlayClick);
      document.body.appendChild(overlay);
    })
    .catch(error => {
      console.error('加载Markdown失败:', error);
      document.getElementById('content').innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
          <h3>⚠️ 加载失败</h3>
          <p>无法加载Markdown文档: ${error.message}</p>
          <p>请检查URL是否正确或网络连接是否正常</p>
        </div>
      `;
    });
});