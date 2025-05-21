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
    let deltaX = 0;
    let autoSlideTimer = null;
    let isInView = false;

    const updateSlide = () => {
      imageWidth = images[0].getBoundingClientRect().width;
      visibleCount = Math.floor(container.offsetWidth / imageWidth);
      maxIndex = images.length - visibleCount;

      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      track.style.transition = "transform 0.3s ease";
      track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    };

    const startAutoSlide = () => {
        stopAutoSlide(); // 先清除舊的

        const randomTime = () => 2500 + Math.random() * 500; // 2200~2700 毫秒

        const autoSlide = () => {
            autoSlideTimer = setTimeout(() => {
            currentIndex = (currentIndex + 1) % (maxIndex + 1);
            updateSlide();
            autoSlide(); // 再次啟動下一次輪播
            }, randomTime());
    };

  autoSlide();
};
    const stopAutoSlide = () => clearInterval(autoSlideTimer);

    // 滑動功能（保留吸附 + 小幅滑動即可切換）
    track.addEventListener("touchstart", e => {
      isTouching = true;
      startX = e.touches[0].clientX;
      deltaX = 0;
      track.style.transition = "none";
      stopAutoSlide();
    });

    track.addEventListener("touchmove", e => {
      if (!isTouching) return;
      deltaX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${-currentIndex * imageWidth + deltaX}px)`;
    });

    track.addEventListener("touchend", () => {
      isTouching = false;

      const threshold = imageWidth * 0.1; // 只要滑過10%就切
      if (deltaX > threshold && currentIndex > 0) {
        currentIndex--;
      } else if (deltaX < -threshold && currentIndex < maxIndex) {
        currentIndex++;
      }

      updateSlide();

      if (isInView) startAutoSlide();
    });

    leftBtn.addEventListener("click", () => {
      currentIndex--;
      updateSlide();
      if (isInView) startAutoSlide(); // 加這行：重啟計時
    });

    rightBtn.addEventListener("click", () => {
      currentIndex++;
      updateSlide();
      if (isInView) startAutoSlide(); // 加這行：重啟計時
    });

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
