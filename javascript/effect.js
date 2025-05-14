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