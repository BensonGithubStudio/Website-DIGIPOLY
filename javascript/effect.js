document.addEventListener("DOMContentLoaded", function () {
    const groups = [];

    document.querySelectorAll("h1").forEach(h1 => {
        const section = h1.parentElement;
        const group = Array.from(section.querySelectorAll("h1, p"));
        groups.push({ group, isVisible: new Map() });

        group.forEach(el => {
            const g = groups[groups.length - 1];
            g.isVisible.set(el, false);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;

            const groupData = groups.find(g => g.group.includes(el));
            if (!groupData) return;

            groupData.isVisible.set(el, entry.isIntersecting);

            const anyVisible = Array.from(groupData.isVisible.values()).some(v => v);

            if (anyVisible) {
                groupData.group.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 0.2}s`;
                    el.classList.add("visible");
                });
            } else {
                groupData.group.forEach(el => {
                    el.style.transitionDelay = `0s`;
                    el.classList.remove("visible");
                });
            }
        });
    }, {
        threshold: 0.2
    });

    groups.forEach(({ group }) => {
        group.forEach(el => observer.observe(el));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".typewriter");

    const timers = new Map();

    const typeText = (el, text) => {
        clearInterval(timers.get(el));
        el.textContent = "";
        let index = 0;

        const interval = setInterval(() => {
            el.textContent += text.charAt(index);
            index++;
            if (index > text.length) {
                clearInterval(interval);
                el.style.borderRight = "none";
            }
        }, 50);

        timers.set(el, interval);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const fullText = el.dataset.fulltext;

            if (entry.isIntersecting) {
                typeText(el, fullText);
            }
        });
    }, {
        threshold: 0.5
    });

    elements.forEach(el => {
        el.dataset.fulltext = el.textContent;
        el.textContent = " ";
        observer.observe(el);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.floating-image-container').forEach(container => {
        const imageLeft = container.querySelector('.floating-image-left');
        const imageRight = container.querySelector('.floating-image-right');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (imageLeft) imageLeft.classList.add('visible');
                    if (imageRight) imageRight.classList.add('visible');
                } else {
                    if (imageLeft) imageLeft.classList.remove('visible');
                    if (imageRight) imageRight.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(container);
    });
});


// 橫幅消失時，變模式
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
