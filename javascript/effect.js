document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const track = document.getElementById('carouselTrack');
  const container = document.querySelector('.carousel-container');

  // 等圖片載入完後再取得寬度
  const updateSlide = () => {
    const images = track.querySelectorAll('img');
    if (images.length === 0) return;

    const imageWidth = images[0].getBoundingClientRect().width;
    const visibleCount = Math.floor(container.offsetWidth / imageWidth);
    const totalImages = images.length;
    const maxIndex = totalImages - visibleCount;

    // 修正 currentIndex 超過邊界時重設
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  };

  window.moveSlide = function (direction) {
    currentIndex += direction;
    updateSlide();
  };

  // 初始化
  window.addEventListener('resize', updateSlide); // RWD 時重算寬度
  window.addEventListener('load', updateSlide);   // 頁面一開始也要執行一次
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