fetch('https://cpb.qtdt.dpdns.org/api/raw/index')
      .then(response => response.text())
      .then(markdown => {
        document.getElementById('content').innerHTML = marked.parse(markdown);
        // 代码高亮
        Prism.highlightAll();
      });