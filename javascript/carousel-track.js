document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(container => {
        let currentIndex = 0;
        let autoSlideInterval = null;
        let isTouching = false;
        let startX = 0;
        let scrollX = 0;
        let isInView = false;

        const track = container.querySelector('.carousel-track');
        const leftBtn = container.querySelector('.arrow.left');
        const rightBtn = container.querySelector('.arrow.right');

        const images = track.querySelectorAll('img');
        const imageWidth = images[0].getBoundingClientRect().width;

        const updateSlide = () => {
        const visibleCount = Math.floor(container.offsetWidth / imageWidth);
        const maxIndex = images.length - visibleCount;

        // 循環輪播（回到頭）
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;

        track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        };

        const startAutoSlide = () => {
        if (autoSlideInterval) return;
        autoSlideInterval = setInterval(() => {
            if (!isTouching && isInView) {
            currentIndex++;
            updateSlide();
            }
        }, 2000);
        };

        const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        };

        leftBtn.addEventListener('click', () => {
        currentIndex--;
        updateSlide();
        stopAutoSlide(); // 點擊後暫停輪播
        });

        rightBtn.addEventListener('click', () => {
        currentIndex++;
        updateSlide();
        stopAutoSlide(); // 點擊後暫停輪播
        });

        // 手動滑動
        track.addEventListener('touchstart', e => {
        isTouching = true;
        startX = e.touches[0].clientX;
        scrollX = track.style.transform
            ? parseFloat(track.style.transform.match(/-?[\d.]+/)[0])
            : 0;
        stopAutoSlide();
        });

        track.addEventListener('touchmove', e => {
        const deltaX = e.touches[0].clientX - startX;
        track.style.transform = `translateX(${scrollX + deltaX}px)`;
        });

        track.addEventListener('touchend', e => {
            const deltaX = e.changedTouches[0].clientX - startX;
            const threshold = imageWidth / 4;

            if (deltaX < -threshold) {
                const offset = Math.abs(parseFloat(track.style.transform.match(/-?[\d.]+/)[0]));
                currentIndex = Math.round(offset / imageWidth);
            } else if (deltaX > threshold) {
                const offset = Math.abs(parseFloat(track.style.transform.match(/-?[\d.]+/)[0]));
                currentIndex = Math.round(offset / imageWidth);
            }

            // 限制 currentIndex 在合法範圍內
            const visibleCount = Math.floor(container.offsetWidth / imageWidth);
            const maxIndex = images.length - visibleCount;
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > maxIndex) currentIndex = maxIndex;

            isTouching = false;
            updateSlide();
            if (isInView) startAutoSlide();
        });

        // 偵測是否在畫面中
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            isInView = entry.isIntersecting;
            if (isInView) {
            startAutoSlide();
            } else {
            stopAutoSlide();
            }
        });
        }, { threshold: 0.5 });

        observer.observe(container);

        window.addEventListener('resize', updateSlide);
        window.addEventListener('load', updateSlide);
    });
});
