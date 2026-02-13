document.addEventListener("DOMContentLoaded", () => {
  initHeaderMenu();
  initHeaderScroll();
  initFaqAccordion();
  initSwiper();
  initTextAnimation();
  initFadeIn();
  initFloatingButton();
  initProductImageSwitcher();
});

/* =========================
   Header Menu
========================= */
function initHeaderMenu() {
  const menuButton = document.querySelector(".l-header__menu");
  const header = document.querySelector(".l-header");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  if (!menuButton || !header || !overlay) return;

  menuButton.addEventListener("click", () => {
    const isActive = header.classList.contains("is-active");

    header.classList.toggle("is-active", !isActive);
    overlay.classList.toggle("is-active", !isActive);
    header.classList.add("is-scroll");

    body.style.overflow = isActive ? "" : "hidden";
  });
}

/* =========================
   Header Scroll
========================= */
function initHeaderScroll() {
  const header = document.querySelector(".l-header");
  if (!header) return;

  const onScroll = () => {
    if (header.classList.contains("is-active")) return;
    header.classList.toggle("is-scroll", window.scrollY > 0);
  };

  onScroll();
  window.addEventListener("scroll", onScroll);
}

/* =========================
   FAQ Accordion
========================= */
function initFaqAccordion() {
  document.querySelectorAll(".l-faq__item").forEach((item) => {
    const q = item.querySelector(".l-faq__q");
    const a = item.querySelector(".l-faq__a");
    if (!q || !a) return;

    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-active");

      if (isOpen) {
        a.style.height = `${a.scrollHeight}px`;
        requestAnimationFrame(() => {
          a.style.height = "0";
          a.style.opacity = "0";
        });
        item.classList.remove("is-active");
      } else {
        item.classList.add("is-active");
        a.style.height = `${a.scrollHeight}px`;
        a.style.opacity = "1";

        a.addEventListener(
          "transitionend",
          function handler() {
            a.style.height = "auto";
            a.removeEventListener("transitionend", handler);
          },
          { once: true },
        );
      }
    });
  });
}

/* =========================
   Swiper Slider
========================= */
function initSwiper() {
  document.querySelectorAll(".js-slider-block").forEach((block) => {
    const swiperEl = block.querySelector(".js-swiper");
    const cursol = block.querySelector(".l-button-and-cursol__cursol");
    if (!swiperEl || !cursol) return;

    const [prevBtn, nextBtn] = cursol.children;
    const slidesPerView = parseFloat(block.dataset.slides) || 3.4;
    const spaceBetween = parseInt(block.dataset.space, 10) || 40;

    const swiper = new Swiper(swiperEl, {
      slidesPerView,
      spaceBetween,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24,
      initialSlide: Math.floor(
        swiperEl.querySelectorAll(".swiper-slide").length / 2,
      ),
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 900,
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 30,
          slidesOffsetBefore: 30,
          slidesOffsetAfter: 30,
        },
        768: {
          slidesPerView,
          spaceBetween,
          slidesOffsetBefore: 24,
          slidesOffsetAfter: 24,
        },
      },
    });

    prevBtn.addEventListener("click", () => swiper.slidePrev());
    nextBtn.addEventListener("click", () => swiper.slideNext());
  });
}

/* =========================
   Text Animation
========================= */
function initTextAnimation() {
  const TEXT_VISIBLE_CLASS = "-visible";
  const TEXT_DELAY_STEP = 0.06;
  const isSP = window.matchMedia("(max-width: 768px)").matches;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(TEXT_VISIBLE_CLASS);
        obs.unobserve(entry.target);
      });
    },
    {
      rootMargin: isSP ? "0px 0px -45% 0px" : "0px 0px -35% 0px",
    },
  );

  document.querySelectorAll(".js-text-anim").forEach((container) => {
    const targets =
      container.querySelectorAll(
        ".en, .jp, .sub, .en-insta-01, .en-insta-02",
      ) || [container];

    targets.forEach((el) => {
      const nodes = [...el.childNodes];
      el.innerHTML = "";
      let index = 0;

      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          [...node.textContent].forEach((char) => {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.transitionDelay = `${index * TEXT_DELAY_STEP}s`;
            el.appendChild(span);
            index++;
          });
        } else {
          el.appendChild(node.cloneNode(true));
        }
      });
    });

    observer.observe(container);
  });
}

/* =========================
   Fade In
========================= */
function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-show");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".fade").forEach((el) => observer.observe(el));
}

/* =========================
   Floating Button
========================= */
function initFloatingButton() {
  const floatingButton = document.querySelector(".floating-button");
  const mv = document.querySelector(".p-home-mv");
  const footer = document.querySelector("footer");
  if (!floatingButton) return;

  let isMvVisible = false;
  let isFooterVisible = false;

  const update = () => {
    floatingButton.classList.toggle(
      "is-active",
      !isMvVisible && !isFooterVisible,
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === mv) isMvVisible = entry.isIntersecting;
        if (entry.target === footer) isFooterVisible = entry.isIntersecting;
      });
      update();
    },
    { threshold: 0.1 },
  );

  if (mv) observer.observe(mv);
  if (footer) observer.observe(footer);
}

/* =========================
   Product Image Switcher
========================= */
function initProductImageSwitcher() {
  const mainImage = document.querySelector(".p-products__main-image img");
  const thumbnails = document.querySelectorAll(
    ".p-products__main-image-item",
  );

  if (!mainImage || !thumbnails.length) return;

  thumbnails.forEach((button) => {
    button.addEventListener("click", () => {
      const img = button.querySelector("img");
      if (!img) return;

      mainImage.src = img.src;
      mainImage.alt = img.alt || "";
    });
  });
}
