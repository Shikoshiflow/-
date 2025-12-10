// --- SHIKO STUDIO MAIN JS ---

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Система запущена...');
    
    // 1. Инициализация всех систем
    initializeNavigation();
    initializeScrollEffects();
    initializeCursorGlow();
    initialize3DParallax(); // Новая фишка для "Реактора"
    initializeTypewriter(); // Новая фишка для текста
    
    // 2. Загрузка проектов
    loadPortfolioData();
    initializeFilters();
    
    // 3. Форма
    initializeContactForm();
    
    // 4. Убираем прелоадер плавно
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
        }
    }, 1500);
});

// --- ДАННЫЕ ПОРТФОЛИО (Если сервер отключен, берем отсюда) ---
const DEMO_PROJECTS = [
    {
        title: "Neon Cyberpunk Art",
        category: "image",
        description: "Серия генеративных изображений в стиле киберпанк.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Future E-Commerce",
        category: "web",
        description: "Редизайн интернет-магазина техники.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Abstract Motion",
        category: "video",
        description: "Анимация для музыкального клипа.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Finance App UI",
        category: "app",
        description: "Интерфейс мобильного банка.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
        link: "#"
    }
];

// --- 1. ЗАГРУЗКА ПОРТФОЛИО ---
async function loadPortfolioData() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Очистка
    
    // Имитация загрузки (можно заменить на реальный fetch)
    const projects = DEMO_PROJECTS;

    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'portfolio-item reveal';
        item.setAttribute('data-category', project.category);
        // Задержка анимации для каждого элемента
        item.style.transitionDelay = `${index * 100}ms`;
        
        item.innerHTML = `
            <div class="portfolio-card">
                <div class="portfolio-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="portfolio-info">
                    <h3 class="portfolio-title">${project.title}</h3>
                    <p class="portfolio-description">${project.description}</p>
                </div>
                <div class="portfolio-hover">
                    <button class="btn btn-primary btn-small js-open-modal">Посмотреть</button>
                </div>
            </div>
        `;
        
        // Клик по кнопке
        const btn = item.querySelector('.js-open-modal');
        btn.addEventListener('click', () => openModal(project));
        
        grid.appendChild(item);
    });
    
    // Запускаем анимацию появления
    initializeScrollReveal();
}

// --- 2. ФИЛЬТРЫ ---
function initializeFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Активный класс
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            const items = document.querySelectorAll('.portfolio-item');
            
            items.forEach(item => {
                const cat = item.getAttribute('data-category');
                
                if (filter === 'all' || cat === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// --- 3. НАВИГАЦИЯ ---
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    
    // Бургер меню
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Плавный скролл и закрытие меню
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Закрываем меню на мобильном
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Плавный скролл
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}

// --- 4. ЭФФЕКТЫ ---

// Скролл хедера
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Анимация появления при скролле
function initializeScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); 

    reveals.forEach(el => observer.observe(el));
}

// Курсор-свечение
function initializeCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    });
}

// NEW: Параллакс для "Реактора" (Круг справа движется за мышкой)
function initialize3DParallax() {
    const container = document.querySelector('.hero-visual-container');
    const card = document.querySelector('.hero-image-placeholder');
    
    if (!container || !card) return;

    container.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        // Легкий наклон
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Сброс при уходе мышки
    container.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        card.style.transition = 'all 0.5s ease';
    });
    
    container.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Убираем задержку при входе
    });
}

// NEW: Печатная машинка для описания
function initializeTypewriter() {
    const textElement = document.querySelector('.hero-description');
    if (!textElement) return;
    
    const text = textElement.innerText;
    textElement.innerText = '';
    
    let i = 0;
    const speed = 20; // Скорость печати
    
    function typeWriter() {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Запускаем через секунду после загрузки
    setTimeout(typeWriter, 1000);
}

// --- 5. МОДАЛЬНОЕ ОКНО ---
function openModal(project) {
    // Удаляем старое если есть
    const oldModal = document.querySelector('.project-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-image-container">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="modal-details">
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-description" style="margin-bottom: 20px;">${project.description}</p>
                    <p style="color: #ccc; margin-bottom: 30px;">
                        Здесь может быть подробное описание кейса, стек технологий и процесс разработки.
                        Этот текст можно подгружать из базы данных или JSON.
                    </p>
                    <div class="modal-actions">
                        <a href="${project.link}" target="_blank" class="btn btn-primary">Открыть проект</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Блок скролла
    
    // Анимация входа
    requestAnimationFrame(() => modal.classList.add('active'));
    
    // Закрытие
    const close = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-close').onclick = close;
    modal.querySelector('.modal-overlay').onclick = close;
}

// --- 6. ФОРМА КОНТАКТОВ ---
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        // Анимация загрузки
        btn.textContent = 'Отправка...';
        btn.style.opacity = '0.7';
        
        // Имитация отправки
        setTimeout(() => {
            btn.textContent = 'Успешно! ✅';
            btn.style.background = '#10b981'; // Зеленый цвет
            btn.style.borderColor = '#10b981';
            btn.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';
            
            form.reset();
            
            // Возврат кнопки
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}
