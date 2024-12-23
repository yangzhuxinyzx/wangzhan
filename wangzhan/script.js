// 滚动动画
let ticking = false;
let lastScrollY = 0;

function handleScroll() {
    lastScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });

        ticking = true;
    }
}

function updateParallax() {
    const elements = document.querySelectorAll('.parallax-element');
    const scrolled = window.pageYOffset;
    
    elements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    // 添加渐入效果
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });

    // 更新进度指示器
    updateProgressIndicator();
}

// 监听滚动事件
window.addEventListener('scroll', handleScroll, { passive: true });

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    updateParallax();
    updateProgressIndicator();
    createStars();
    createShootingStars();
    createParticles();
    
    // 监听鼠标移动创建波纹
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) { // 降低波纹生成频率
            createRipple(e);
        }
    });
    
    // 为区块添加3D悬浮效果
    document.querySelectorAll('.section-block').forEach(block => {
        block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            block.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 技能条动画（如果在当前页面）
if (document.querySelector('.skill-bar')) {
    function animateSkillBars() {
        document.querySelectorAll('.progress').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // 页面加载时触发技能条动画
    window.addEventListener('load', animateSkillBars);
}

// 进度指示器逻辑
function updateProgressIndicator() {
    const sections = ['home', 'about', 'media', 'contact'];
    const dots = document.querySelectorAll('.dot');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        const dot = dots[index];
        
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + (sectionHeight / 2);
            
            // 清除之前的状态
            dot.classList.remove('active', 'passed');
            
            if (scrollPosition >= sectionTop - windowHeight/2) {
                // 如果已经过了这个部分
                if (scrollPosition > sectionTop + sectionHeight - windowHeight/2) {
                    dot.classList.add('passed');
                } else {
                    // 如果正在这个部分
                    dot.classList.add('active');
                }
            }
        }
    });
}

// 生成星星和流星
function createStars() {
    const stars = document.querySelector('.stars');
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机大小
        const size = Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机动画延迟和持续时间
        star.style.setProperty('--delay', `${Math.random() * 5}s`);
        star.style.setProperty('--duration', `${Math.random() * 2 + 1}s`);
        
        stars.appendChild(star);
    }
}

function createShootingStars() {
    const container = document.querySelector('.shooting-stars');
    const numShootingStars = 5;

    for (let i = 0; i < numShootingStars; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // 随机位置
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟和持续时间
        shootingStar.style.setProperty('--delay', `${Math.random() * 10}s`);
        shootingStar.style.setProperty('--duration', `${Math.random() * 2 + 1}s`);
        
        container.appendChild(shootingStar);
    }
}

// 生成粒子
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置和动画参数
        particle.style.setProperty('--duration', `${Math.random() * 10 + 5}s`);
        particle.style.setProperty('--opacity', Math.random() * 0.5 + 0.2);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 随机运动路径
        particle.style.setProperty('--x1', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--y1', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--x2', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--y2', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--x3', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--y3', `${Math.random() * 200 - 100}px`);
        
        container.appendChild(particle);
    }
}

// 创建鼠标交互波纹效果
function createRipple(e) {
    const container = document.getElementById('rippleContainer');
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    container.appendChild(ripple);
    
    // 动画结束后移除元素
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}