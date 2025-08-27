document.addEventListener('DOMContentLoaded', () => {
  const appGrid = document.getElementById('app-grid');
  const searchInput = document.getElementById('search-input');

  // 从 JSON 加载应用
  fetch('app-list.json')
    .then(response => response.json())
    .then(apps => {
      renderApps(apps);

      // 搜索功能
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredApps = apps.filter(app => 
          app.name.toLowerCase().includes(searchTerm) ||
          app.description.toLowerCase().includes(searchTerm) ||
          app.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        renderApps(filteredApps);
      });
    });

  // 渲染应用卡片
  function renderApps(apps) {
    appGrid.innerHTML = '';
    apps.forEach(app => {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.innerHTML = `
        <h2>${app.name}</h2>
        <p>${app.description}</p>
        <div class="tags">
          ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${app.url}" target="_blank">
          View on GitHub <i class="fas fa-external-link-alt"></i>
        </a>
      `;
      appGrid.appendChild(card);
    });
  }
});