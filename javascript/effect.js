// h1 和 p 的文字效果
document.addEventListener("DOMContentLoaded", function () {
    const textObserver = new IntersectionObserver((entries) => {
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
      threshold: 0.2
    });

    document.querySelectorAll("h1").forEach(el => textObserver.observe(el));
});

// 橫幅消失時，變深色模式
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector("#banner");
    const body = document.body;
    const header = document.querySelector("header");

    const bannerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                body.classList.add("change-mode");
                header.classList.add("change-mode");
            } else {
                body.classList.remove("change-mode");
                header.classList.remove("change-mode");
            }
        });
    }, {
        threshold: 0
    });

    bannerObserver.observe(banner);
});
