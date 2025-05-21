document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const serviceItems = document.querySelectorAll('.service-item');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const modal = document.getElementById('fullscreen-modal');
    const modalImage = document.querySelector('.modal-image');
    const closeModal = document.querySelector('.close-modal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Анимация для сервисов при прокрутке
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                serviceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (sections.length > 0) {
        servicesObserver.observe(sections[0]);
    }
    
    // Функция для открытия модального окна
    function openModal(imgSrc) {
        modal.style.display = 'block';
        modalImage.src = imgSrc;
        document.body.style.overflow = 'hidden'; // Запрещаем скролл на фоне
    }
    
    // Функция для закрытия модального окна
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Восстанавливаем скролл
    }
    
    // Добавляем обработчики событий для миниатюр
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imgSrc = this.src;
            openModal(imgSrc);
        });
    });
    
    // Закрытие модального окна при клике на крестик
    closeModal.addEventListener('click', closeModalFunc);
    
    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });
    
    // Закрытие модального окна при нажатии на ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModalFunc();
        }
    });
    
    // Добавляем стили для анимации сервисов
    const style = document.createElement('style');
    style.textContent = `
        .service-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});