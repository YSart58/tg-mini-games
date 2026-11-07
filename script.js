// --- ПЕРЕКЛЮЧЕНИЕ ИГР ---
function switchGame(gameName) {
    // Скрываем все игры
    document.querySelectorAll('.game-container').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(el => el.classList.remove('active'));

    // Показываем нужную
    document.getElementById(`game-${gameName}`).classList.add('active');
    document.getElementById(`btn-${gameName}`).classList.add('active');
}

// --- ЛОГИКА КАЗИНО ---
function spinCasino() {
    const reels = document.querySelectorAll('.reel');
    const items = ['7', '🍒', '🔔', '🍋', '💎']; // Набор символов
    
    // Добавляем класс анимации
    reels.forEach(reel => reel.classList.add('spinning'));

    // Останавливаем катушки с разной задержкой
    reels.forEach((reel, index) => {
        setTimeout(() => {
            reel.classList.remove('spinning');
            // Выбираем случайный символ
            const randomItem = items[Math.floor(Math.random() * items.length)];
            reel.innerText = randomItem;
        }, 1000 + (index * 500)); // 1-я остановится через 1с, 2-я через 1.5с и т.д.
    });
}

// --- ЛОГИКА КУБИКА ---
let currentX = 0;
let currentY = 0;

function rollDice() {
    const dice = document.getElementById('dice');
    
    // Генерируем случайное число от 1 до 6
    const randomNum = Math.floor(Math.random() * 6) + 1;
    
    // Добавляем случайные обороты, чтобы кубик "катился"
    currentX += 360 * 3 + Math.floor(Math.random() * 360);
    currentY += 360 * 3 + Math.floor(Math.random() * 360);

    // Значения поворотов для выпадения нужной стороны
    let targetX = 0;
    let targetY = 0;

    switch(randomNum) {
        case 1: targetX = 0;   targetY = 0;   break; // front
        case 2: targetX = -90; targetY = 0;   break; // top
        case 3: targetX = 0;   targetY = -90; break; // right
        case 4: targetX = 0;   targetY = 90;  break; // left
        case 5: targetX = 90;  targetY = 0;   break; // bottom
        case 6: targetX = 0;   targetY = 180; break; // back
    }

    // Применяем стили (с добавлением накопленных оборотов)
    dice.style.transform = `translateZ(-50px) rotateX(${targetX + currentX}deg) rotateY(${targetY + currentY}deg)`;
    
    // Сбрасываем накопленные обороты, чтобы они не росли бесконечно
    currentX = targetX;
    currentY = targetY;
}