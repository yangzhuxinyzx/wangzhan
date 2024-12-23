document.addEventListener('DOMContentLoaded', () => {
    // 初始化背景效果
    createParticles();
    
    // 添加项目卡片进入动画
    const projects = document.querySelectorAll('.design-project');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2
    });

    projects.forEach(project => {
        observer.observe(project);
    });
    
    // 添加鼠标跟随效果
    document.addEventListener('mousemove', (e) => {
        const glows = document.querySelectorAll('.glow');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        glows.forEach(glow => {
            const rect = glow.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            glow.style.setProperty('--float-x', `${mouseX * 50}px`);
            glow.style.setProperty('--float-y', `${mouseY * 50}px`);
        });
    });

    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 原有的鼠标移动视差效果
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.design-project');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = (rect.left + rect.width / 2) / window.innerWidth - 0.5;
            const cardY = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
            
            // 增强3D效果
            const intensity = 15;
            const rotateX = (mouseY - cardY) * intensity;
            const rotateY = (mouseX - cardX) * intensity;
            const translateZ = Math.abs(mouseX - cardX) * 10 + Math.abs(mouseY - cardY) * 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(${translateZ}px)
                scale(1.02)
            `;
        });
    });
}); 