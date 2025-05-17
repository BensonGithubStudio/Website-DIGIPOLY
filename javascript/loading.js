document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => {
        const images = Array.from(document.images);
        const totalImages = images.length;
        let loadedImages = 0;
        let revealed = false;

        // 如果沒有圖片，直接顯示畫面
        if (totalImages === 0) {
            revealPage();
            return;
        }

        function imageLoaded(img) {
            // 確保圖片有效載入（自然寬度大於 0）
            if (img.naturalWidth === 0) return;

            loadedImages++;
            const percent = loadedImages / totalImages;

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
                imageLoaded(img);
            } else {
                img.addEventListener("load", () => imageLoaded(img));
                img.addEventListener("error", () => imageLoaded(img)); // 即使載入錯誤也算一張
            }
        });
    });
});