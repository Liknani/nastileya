document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modal-image');

    // Анимация при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
            }
        }), { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Открытие модального окна при клике на миниатюре
    portfolioImages.forEach(img) {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalContent.src = this.getAttribute('data-src');
        });

        // Закрытие модального окна при клике на крестике или вне окна
        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target === modalContent) {
                modal.style.display = 'none';
            }
        });

        // Закрытие модального окна при нажатии клавиши ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    }
}