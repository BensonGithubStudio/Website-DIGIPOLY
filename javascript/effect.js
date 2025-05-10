document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(container => {
    let currentIndex = 0;
    const track = container.querySelector('.carousel-track');
    const leftBtn = container.querySelector('.arrow.left');
    const rightBtn = container.querySelector('.arrow.right');

    const updateSlide = () => {
      const images = track.querySelectorAll('img');
      const imageWidth = images[0].getBoundingClientRect().width;
      const visibleCount = Math.floor(container.offsetWidth / imageWidth);
      const maxIndex = images.length - visibleCount;

      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    };

    leftBtn.addEventListener('click', () => {
      currentIndex--;
      updateSlide();
    });

    rightBtn.addEventListener('click', () => {
      currentIndex++;
      updateSlide();
    });

    window.addEventListener('resize', updateSlide);
    window.addEventListener('load', updateSlide);
  });
});

//h1和p的文字效果
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const group = entry.target.parentElement.querySelectorAll('h1, p');

      if (entry.isIntersecting) {
        group.forEach((el, index) => {
          el.style.transitionDelay = `${index * 0.2}s`;
          el.classList.add('visible');
        });
      } else {
        group.forEach(el => {
          el.style.transitionDelay = '0s';
          el.classList.remove('visible');
        });
      }
    });
  }, {
    threshold: 0.2 // 控制幾成進入畫面時觸發
  });

  document.querySelectorAll("h1").forEach(el => observer.observe(el));
});