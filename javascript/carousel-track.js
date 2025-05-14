document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach(container => {
    const track = container.querySelector(".carousel-track");
    const images = track.querySelectorAll("img");
    const leftBtn = container.querySelector(".arrow.left");
    const rightBtn = container.querySelector(".arrow.right");

    let currentIndex = 0;
    let imageWidth = images[0].getBoundingClientRect().width;
    let visibleCount = Math.floor(container.offsetWidth / imageWidth);
    let maxIndex = images.length - visibleCount;

    let isTouching = false;
    let startX = 0;
    let startTranslateX = 0;

    let autoSlideTimer = null;
    let isInView = false;

    const updateSlide = () => {
      imageWidth = images[0].getBoundingClientRect().width;
      visibleCount = Math.floor(container.offsetWidth / imageWidth);
      maxIndex = images.length - visibleCount;

      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % (maxIndex + 1);
        updateSlide();
      }, 3000);
    };

    const stopAutoSlide = () => clearInterval(autoSlideTimer);

    // 手機滑動事件
    track.addEventListener("touchstart", e => {
      isTouching = true;
      startX = e.touches[0].clientX;
      const transform = track.style.transform || "translateX(0px)";
      startTranslateX = parseFloat(transform.match(/-?\d+(\.\d+)?/)[0]);
      track.style.transition = "none";
      stopAutoSlide();
    });

    track.addEventListener("touchmove", e => {
      if (!isTouching) return;
      const deltaX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${startTranslateX + deltaX}px)`;
    });

    track.addEventListener("touchend", e => {
      if (!isTouching) return;
      const deltaX = e.changedTouches[0].clientX - startX;
      const movedSlides = Math.round(- (startTranslateX + deltaX) / imageWidth);
      currentIndex = Math.min(Math.max(movedSlides, 0), maxIndex);
      track.style.transition = "transform 0.5s ease";
      updateSlide();
      isTouching = false;
      if (isInView) startAutoSlide();
    });

    leftBtn.addEventListener("click", () => {
      currentIndex--;
      updateSlide();
    });

    rightBtn.addEventListener("click", () => {
      currentIndex++;
      updateSlide();
    });

    // 自動輪播僅在畫面中運行
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isInView = entry.isIntersecting;
        if (isInView) startAutoSlide();
        else stopAutoSlide();
      });
    }, { threshold: 0.5 });

    observer.observe(container);

    window.addEventListener("resize", updateSlide);
    window.addEventListener("load", updateSlide);
  });
});
