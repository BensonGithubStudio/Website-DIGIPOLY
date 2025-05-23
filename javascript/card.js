document.addEventListener("DOMContentLoaded", () => {
    function getRandomColor() {
      const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#ADFF2F', '#FF4500'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function createParticles(originElement) {
        const rect = originElement.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // 建立黑幕元素
        const blackout = document.createElement('div');
        blackout.classList.add('screen-blackout');
        document.body.appendChild(blackout);

        // 強制觸發 reflow，再加上 show 類別讓它淡入
        requestAnimationFrame(() => {
            blackout.classList.add('show');
        });

        let longestDuration = 0;

        for (let i = 0; i < 200; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = getRandomColor();
            particle.style.left = `${originX}px`;
            particle.style.top = `${originY}px`;

            const dx = (Math.random() - 0.5) * 1000;
            const dy = (Math.random() - 0.5) * 1000;
            const duration = 500 + Math.random() * 800;

            if (duration > longestDuration) longestDuration = duration;

            particle.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms`;
            document.body.appendChild(particle);

            requestAnimationFrame(() => {
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            particle.style.opacity = 0;
            });

            setTimeout(() => {
            particle.remove();
            }, duration);
        }

        // 粒子完成後淡出黑幕再移除
        setTimeout(() => {
            blackout.classList.remove('show'); // 淡出
            setTimeout(() => blackout.remove(), 300); // 等淡出結束後移除
        }, longestDuration + 100);
    }


    document.querySelectorAll('.clickable-particle').forEach(img => {
      img.addEventListener('click', () => {
        createParticles(img);
      });
    });
});
