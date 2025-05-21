document.addEventListener("DOMContentLoaded", function () {
    const groups = [];

    // 尋找每個區段內的 h1 和 p，作為一組
    document.querySelectorAll("h1").forEach(h1 => {
        const section = h1.parentElement;
        const group = Array.from(section.querySelectorAll("h1, p"));
        groups.push({ group, isVisible: new Map() });

        // 初始化可見狀態
        group.forEach(el => {
            const g = groups[groups.length - 1];
            g.isVisible.set(el, false);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;

            // 找出這個元素屬於哪一組
            const groupData = groups.find(g => g.group.includes(el));
            if (!groupData) return;

            groupData.isVisible.set(el, entry.isIntersecting);

            // 判斷整組是否有任何元素還在畫面上
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

    // 觀察所有 h1 和 p
    groups.forEach(({ group }) => {
        group.forEach(el => observer.observe(el));
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
