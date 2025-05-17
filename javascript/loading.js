document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    const images = Array.from(document.images);
    const eagerImages = images.filter(img => img.loading !== "lazy");
    const totalEager = eagerImages.length;
    let loadedEager = 0;
    let revealed = false;

    // 若沒有 eager 圖片，直接顯示
    if (totalEager === 0) {
      revealPage();
      return;
    }

    function imageLoaded(img) {
      // naturalWidth 可過濾掉錯誤或無效圖片
      if (img.naturalWidth === 0) return;

      loadedEager++;
      const percent = loadedEager / totalEager;

      if (!revealed && percent >= 0.4) {
        revealPage();
        revealed = true;
      }
    }

    function revealPage() {
      document.documentElement.classList.remove("loading");
      document.getElementById("loading-screen").classList.add("hidden");
    }

    eagerImages.forEach((img) => {
      if (img.complete) {
        imageLoaded(img);
      } else {
        img.addEventListener("load", () => imageLoaded(img));
        img.addEventListener("error", () => imageLoaded(img));
      }
    });
  });
});