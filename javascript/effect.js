document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(container => {
    let currentIndex = 0;
    const track = container.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const leftBtn = container.querySelector('.arrow.left');
    const rightBtn = container.querySelector('.arrow.right');

    let imageWidth = images[0].getBoundingClientRect().width;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let autoSlideInterval;
    let isInView = false;

    const visibleCount = () => Math.floor(container.offsetWidth / imageWidth);
    const maxIndex = () => images.length - visibleCount();

    const updateSlide = () => {
      imageWidth = images[0].getBoundingClientRect().width;
      snapTo(currentIndex);
    };

    const setSliderPosition = () => {
      track.style.transform = `translateX(${currentTranslate}px)`;
    };

    const animation = () => {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    };

    const snapTo = (index) => {
      const max = maxIndex();
      currentIndex = Math.min(Math.max(index, 0), max);
      currentTranslate = prevTranslate = -currentIndex * imageWidth;
      track.style.transition = "transform 0.3s";
      setSliderPosition();
    };

    const nextSlide = () => snapTo(currentIndex + 1);
    const prevSlide = () => snapTo(currentIndex - 1);

    // 手機滑動邏輯
    track.addEventListener("touchstart", touchStart, { passive: true });
    track.addEventListener("touchmove", touchMove, { passive: true });
    track.addEventListener("touchend", touchEnd);

    function touchStart(e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      track.style.transition = "none";
      cancelAnimationFrame(animationID);
      animationID = requestAnimationFrame(animation);
      pauseAutoSlide();
    }

    function touchMove(e) {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const dx = currentX - startX;
      currentTranslate = prevTranslate + dx;
    }

    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -50) currentIndex++;
      else if (movedBy > 50) currentIndex--;

      snapTo(currentIndex);
      resumeAutoSlide();
    }

    // 按鈕
    leftBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    rightBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    // 自動輪播
    const startAutoSlide = () => {
      if (autoSlideInterval || !isInView) return;
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 4000);
    };

    const pauseAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    };

    const resumeAutoSlide = () => {
      pauseAutoSlide();
      startAutoSlide();
    };

    const resetAutoSlide = () => {
      pauseAutoSlide();
      startAutoSlide();
    };

    // IntersectionObserver：偵測進入畫面
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isInView = entry.isIntersecting;
        if (isInView) {
          startAutoSlide();
        } else {
          pauseAutoSlide();
        }
      });
    }, {
      threshold: 0.2, // 至少 20% 出現在畫面中才觸發
    });

    observer.observe(container);

    // 初始化
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