// --- ЛОГИКА КОНСТРУКТОРА ТОРТА ---

// Начинаем работать только после того, как вся HTML-страница загрузилась
document.addEventListener('DOMContentLoaded', () => {
    
    // Находим все нужные элементы на странице
    const constructorSteps = document.querySelectorAll('.constructor-step .options-grid');
    const totalPriceElement = document.getElementById('total-price');

    // Создаем объект для хранения выбранных цен
    const state = {
        base: 0,
        filling: 0,
        cream: 0,
        decoration: 0
    };

    // Проходим по каждому шагу конструктора (основы, начинки, кремы, декор)
    constructorSteps.forEach(step => {
        const options = step.querySelectorAll('.option');
        const stepId = step.id; // Получаем id шага: 'bases', 'fillings' или 'creams'

        // Для каждой опции в шаге добавляем обработчик клика
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Сначала убираем класс 'selected' у всех опций в этом шаге
                options.forEach(o => o.classList.remove('selected'));
                
                // Затем добавляем класс 'selected' только к той, на которую кликнули
                option.classList.add('selected');

                // Обрабатываем новый шаг decorations
                let stateKey = stepId;
                if (stepId === 'bases') stateKey = 'base';
                else if (stepId === 'fillings') stateKey = 'filling';
                else if (stepId === 'creams') stateKey = 'cream';
                else if (stepId === 'decorations') stateKey = 'decoration';
                
                state[stateKey] = parseInt(option.dataset.price);
                
                // Вызываем функцию для пересчета общей стоимости
                updateTotalPrice();
            });
        });
    });

    // Функция, которая считает и отображает итоговую цену
    function updateTotalPrice() {
        const total = state.base + state.filling + state.cream + state.decoration;
        totalPriceElement.textContent = `${total} ₽`;
    }
});

// --- Обработка отправки формы (предупреждение) ---
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Отменяем стандартную отправку формы, чтобы страница не перезагружалась
    
    // Создаем стильное уведомление
    showNotification('✨ Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время!');
    
    form.reset(); // Очищаем поля формы после "отправки"
});

// Функция для показа стильного уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Добавляем стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #FF69B4, #FF1493, #DC143C);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 20, 147, 0.4);
        font-family: 'Jost', sans-serif;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    // Добавляем стили анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        document.body.removeChild(notification);
        document.head.removeChild(style);
    }, 3000);
}

// База данных десертов
const dessertsData = {
    tiramisu: {
        emoji: '🍰',
        title: 'Тирамису',
        price: '850 ₽',
        description: 'Классический итальянский десерт с нежными бисквитными коржами, пропитанными кофе и ликером, с воздушным кремом маскарпоне.',
        ingredients: [
            'Бисквитные савоярди',
            'Крем маскарпоне',
            'Эспрессо',
            'Ликер Амаретто',
            'Какао-порошок',
            'Куриные желтки',
            'Сахар'
        ]
    },
    cheesecake: {
        emoji: '🍰',
        title: 'Чизкейк',
        price: '750 ₽',
        description: 'Нежный сырный торт на песочной основе с ванильным ароматом и ягодным топпингом.',
        ingredients: [
            'Творожный сыр',
            'Песочное печенье',
            'Сливочное масло',
            'Ванильный экстракт',
            'Свежие ягоды',
            'Сахар',
            'Яйца'
        ]
    },
    napoleon: {
        emoji: '🥧',
        title: 'Наполеон',
        price: '680 ₽',
        description: 'Традиционный русский торт с хрустящими слоеными коржами и нежным заварным кремом.',
        ingredients: [
            'Слоеное тесто',
            'Заварной крем',
            'Молоко',
            'Яйца',
            'Сахар',
            'Мука',
            'Ванилин'
        ]
    },
    medovik: {
        emoji: '🍯',
        title: 'Медовик',
        price: '720 ₽',
        description: 'Ароматный медовый торт с тонкими коржами и сметанным кремом, который становится только вкуснее со временем.',
        ingredients: [
            'Натуральный мед',
            'Сметанный крем',
            'Мука',
            'Сода',
            'Яйца',
            'Сахар',
            'Сметана'
        ]
    },
    redvelvet: {
        emoji: '❤️',
        title: 'Красный бархат',
        price: '920 ₽',
        description: 'Изысканный торт с ярко-красными бисквитными коржами и кремом на основе сливочного сыра.',
        ingredients: [
            'Красный пищевой краситель',
            'Крем-чиз',
            'Какао-порошок',
            'Пахта',
            'Ванильный экстракт',
            'Сахар',
            'Яйца'
        ]
    },
    chocolate: {
        emoji: '🍫',
        title: 'Шоколадный торт',
        price: '800 ₽',
        description: 'Богатый шоколадный торт с тремя видами шоколада и ганашем.',
        ingredients: [
            'Темный шоколад',
            'Молочный шоколад',
            'Белый шоколад',
            'Шоколадный ганаш',
            'Сливки',
            'Какао-порошок',
            'Яйца'
        ]
    },
    strawberry: {
        emoji: '🍓',
        title: 'Клубничный мусс',
        price: '780 ₽',
        description: 'Легкий воздушный мусс с натуральной клубникой и ванильным бисквитом.',
        ingredients: [
            'Свежая клубника',
            'Ванильный бисквит',
            'Желатин',
            'Сливки',
            'Сахар',
            'Лимонный сок',
            'Мята'
        ]
    },
    lemon: {
        emoji: '🍋',
        title: 'Лимонный тарт',
        price: '650 ₽',
        description: 'Освежающий тарт с лимонным курдом на песочной основе, украшенный меренгой.',
        ingredients: [
            'Лимонный курд',
            'Песочное тесто',
            'Лимонная цедра',
            'Меренга',
            'Сливочное масло',
            'Яйца',
            'Сахар'
        ]
    },
    eclair: {
        emoji: '🥐',
        title: 'Эклеры',
        price: '450 ₽',
        description: 'Классические французские пирожные из заварного теста с ванильным кремом и шоколадной глазурью.',
        ingredients: [
            'Заварное тесто',
            'Ванильный крем',
            'Шоколадная глазурь',
            'Молоко',
            'Яйца',
            'Сливочное масло',
            'Мука'
        ]
    },
    macarons: {
        emoji: '🌸',
        title: 'Макаруны',
        price: '380 ₽',
        description: 'Нежные французские миндальные пирожные с различными вкусами начинок.',
        ingredients: [
            'Миндальная мука',
            'Яичные белки',
            'Сахарная пудра',
            'Ганаш разных вкусов',
            'Пищевые красители',
            'Ванильный экстракт'
        ]
    }
};

// Функциональность модальных окон
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    const dessertCards = document.querySelectorAll('.dessert-card');
    
    // Открытие модального окна
    dessertCards.forEach(card => {
        card.addEventListener('click', () => {
            const dessertId = card.getAttribute('data-dessert');
            const dessertInfo = dessertsData[dessertId];
            
            if (dessertInfo) {
                // Заполняем модальное окно данными
                document.getElementById('modal-emoji').textContent = dessertInfo.emoji;
                document.getElementById('modal-title').textContent = dessertInfo.title;
                document.getElementById('modal-price').textContent = dessertInfo.price;
                document.getElementById('modal-description').textContent = dessertInfo.description;
                
                // Заполняем список ингредиентов
                const ingredientsList = document.getElementById('ingredients-list');
                ingredientsList.innerHTML = '';
                dessertInfo.ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    ingredientsList.appendChild(li);
                });
                
                // Показываем модальное окно
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Обработчик кнопки заказа
    document.querySelector('.order-button').addEventListener('click', () => {
        const dessertTitle = document.getElementById('modal-title').textContent;
        showNotification(`✨ ${dessertTitle} добавлен в корзину!`);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// GSAP анимация сборки торта
function createCakeAnimation() {
    if (typeof gsap === 'undefined') {
        console.error('GSAP не загружен');
        return;
    }

    // Устанавливаем начальное состояние только для заголовка
    gsap.set(['.intro-simple-title'], {
        opacity: 0
    });

    // Создаем timeline для последовательной анимации
    const tl = gsap.timeline();

    // 1. Появление платформы
    tl.fromTo('.cake-plate', 
        {
            opacity: 0,
            scale: 0.3,
            rotationX: -90
        },
        {
            duration: 1,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            ease: "back.out(1.7)"
        }
    )

    // 2. Появление первого слоя (снизу)
    .fromTo('.layer-1', 
        {
            opacity: 0,
            y: 100,
            scale: 0.5,
            rotationX: -45
        },
        {
            duration: 1.2,
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            ease: "bounce.out"
        }, 
        "-=0.3"
    )

    // 3. Появление второго слоя
    .fromTo('.layer-2', 
        {
            opacity: 0,
            y: -50,
            scale: 0.3,
            rotation: 10
        },
        {
            duration: 1.2,
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            ease: "elastic.out(1, 0.5)"
        }, 
        "-=0.4"
    )

    // 4. Появление третьего слоя
    .fromTo('.layer-3', 
        {
            opacity: 0,
            y: -80,
            scale: 0.2,
            rotation: -15
        },
        {
            duration: 1,
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            ease: "back.out(2)"
        }, 
        "-=0.6"
    )

    // 5. Появление основы крема
    .fromTo('.cream-main', 
        {
            opacity: 0,
            scale: 0,
            y: -30
        },
        {
            duration: 0.8,
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "bounce.out"
        }, 
        "-=0.2"
    )

    // 6. Появление капель крема (по очереди)
    .fromTo('.cream-drop', 
        {
            opacity: 0,
            scale: 0,
            y: -50
        },
        {
            duration: 0.6,
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "bounce.out",
            stagger: 0.1
        }, 
        "-=0.4"
    )

    // 7. Посыпание посыпки
    .fromTo('.sprinkle', 
        {
            opacity: 0,
            scale: 0,
            y: -100,
            rotation: 0
        },
        {
            duration: 1.2,
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 360,
            ease: "bounce.out",
            stagger: {
                each: 0.08,
                from: "random"
            }
        }, 
        "-=0.3"
    )

    // 8. Появление заголовка одновременно с кремом
    .fromTo('.intro-simple-title', 
        {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        {
            duration: 3,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.7)"
        }, 
        "-=3"
    )

    // 10. Пауза для чтения (7 секунд)
    .set({}, {}, "+=7")

    // 11. Скрытие всей анимации
    .to('#cake-intro', 
        {
            duration: 0.5,
            opacity: 0,
            scale: 1.05,
            ease: "power2.inOut"
        }
    )
    .set('#cake-intro', { display: 'none' });

    return tl;
}

// Добавляем плавные анимации при загрузке и обрабатываем интро
document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('cake-intro');
    const container = document.querySelector('.container');
    
    // Проверяем размер экрана для показа анимации
    function shouldShowIntro() {
        return true; // Показываем анимацию на всех устройствах
    }
    
    if (shouldShowIntro() && introOverlay) {
        // Скрываем контейнер во время интро
        gsap.set(container, { opacity: 0, y: 30 });
        
        // Запускаем GSAP анимацию торта
        const cakeAnimation = createCakeAnimation();
        
        // Показываем контейнер после окончания анимации
        cakeAnimation.eventCallback("onComplete", () => {
            gsap.to(container, {
                duration: 0.3,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            });
            
            // Анимация появления элементов по очереди
            const elements = document.querySelectorAll('#about-us, #gallery, .constructor-step, .total-price-section, #contact');
            gsap.fromTo(elements, 
                {
                    opacity: 0,
                    y: 10
                },
                {
                    duration: 0.3,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    stagger: 0.05,
                    delay: 0.05
                }
            );
        });
        
    } else {
        // Убираем интро для маленьких экранов
        if (introOverlay) {
            introOverlay.style.display = 'none';
        }
        
        // Обычная анимация загрузки для маленьких экранов
        gsap.fromTo(container, 
            { opacity: 0, y: 10 },
            { duration: 0.3, opacity: 1, y: 0, ease: "power2.out", delay: 0.05 }
        );
        
        const elements = document.querySelectorAll('#about-us, #gallery, .constructor-step, .total-price-section, #contact');
        gsap.fromTo(elements, 
            { opacity: 0, y: 10 },
            {
                duration: 0.3,
                opacity: 1,
                y: 0,
                ease: "power2.out",
                stagger: 0.05,
                delay: 0.1
            }
        );
    }
    
    // Обрабатываем изменение размера окна (теперь не нужно, анимация на всех устройствах)
    // window.addEventListener('resize', () => {
    //     if (!shouldShowIntro() && introOverlay) {
    //         introOverlay.style.display = 'none';
    //     }
    // });
});