        // 返回上一页
        function goBack() {
            if (history.length > 1) {
                history.back();
            } else {
                window.location.href = '/';
            }
        }

        // 创建粒子效果
        function createParticles() {
            const particles = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 2 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                particles.appendChild(particle);
            }
        }

        // 搜索功能
        document.getElementById('searchBox').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.trim();
                if (searchTerm) {
                    // 这里可以重定向到搜索页面或应用中心
                    window.location.href = `/apps.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });

        // 鼠标移动效果
        document.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.0003;
                const x = e.clientX * speed;
                const y = e.clientY * speed;
                shape.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });

        // 动态调整首页链接
        const currentPath = window.location.pathname;
        const homeBtn = document.getElementById('homeBtn');
        
        // 如果当前在子目录，调整首页链接
        if (currentPath.includes('/')) {
            const pathParts = currentPath.split('/');
            if (pathParts.length > 2) {
                homeBtn.href = '../apps.html';
            } else {
                homeBtn.href = 'apps.html';
            }
        }

        // 初始化
        createParticles();

        // 添加一些趣味互动
        let clickCount = 0;
        document.querySelector('.astronaut').addEventListener('click', function() {
            clickCount++;
            const messages = ['🛸', '🌟', '🌙', '⭐', '🚀', '👨‍🚀'];
            this.textContent = messages[clickCount % messages.length];
            
            // 添加一个小动画
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });

        // konami code 彩蛋
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.length === konamiSequence.length) {
                if (konamiCode.every((code, index) => code === konamiSequence[index])) {
                    // 彩蛋效果
                    document.body.style.animation = 'gradient 0.5s ease infinite';
                    setTimeout(() => {
                        document.body.style.animation = '';
                        alert('🎉 恭喜发现隐藏彩蛋！你真是个探索者！');
                    }, 2000);
                    konamiCode = [];
                }
            }
        });