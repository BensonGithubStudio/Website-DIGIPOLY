document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.images);
  const totalImages = images.length;
  let loadedImages = 0;
  let revealed = false;

  if (totalImages === 0) {
    revealPage();
    return;
  }

  function imageLoaded() {
    loadedImages++;
    const percent = loadedImages / totalImages;

    // 當達到 40% 時顯示頁面（只執行一次）
    if (!revealed && percent >= 0.4) {
      revealPage();
      revealed = true;
    }
  }

  function revealPage() {
    document.documentElement.classList.remove("loading");
    document.getElementById("loading-screen").classList.add("hidden");
  }

  images.forEach((img) => {
    if (img.complete) {
      imageLoaded();
    } else {
      img.addEventListener("load", imageLoaded);
      img.addEventListener("error", imageLoaded); // 即使錯誤也算載入，避免卡住
    }
  });
});