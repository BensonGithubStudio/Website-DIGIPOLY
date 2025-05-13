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

    // Mouse / touch events
    track.addEventListener("touchstart", touchStart);
    track.addEventListener("touchmove", touchMove);
    track.addEventListener("touchend", touchEnd);

    function touchStart(e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      track.style.transition = "none";
      cancelAnimationFrame(animationID);
      animationID = requestAnimationFrame(animation);
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
      resetAutoSlide();
    }

    // Buttons
    leftBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    rightBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    // Auto slide
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 4000);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    };

    window.addEventListener('resize', updateSlide);
    window.addEventListener('load', () => {
      updateSlide();
      startAutoSlide();
    });
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