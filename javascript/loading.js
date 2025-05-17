document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => {
        const images = Array.from(document.images).filter(img => img.loading !== "lazy");
        const totalImages = images.length;
        let loadedImages = 0;
        let revealed = false;
        const minLoadingTime = 800; // 最少顯示 0.8 秒
        const startTime = Date.now();

        if (totalImages === 0) {
            revealPage();
            return;
        }

        function imageLoaded() {
            loadedImages++;
            const percent = loadedImages / totalImages;

            if (!revealed && percent >= 0.4) {
                revealed = true;
                const elapsed = Date.now() - startTime;
                const remaining = minLoadingTime - elapsed;
                if (remaining > 0) {
                    setTimeout(revealPage, remaining);
                } else {
                    revealPage();
                }
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
                img.addEventListener("error", imageLoaded);
            }
        });
    });
});