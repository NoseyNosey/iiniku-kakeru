document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".l-header__menu");
  const header = document.querySelector(".l-header");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  if (!menuButton || !header || !overlay) return;

  menuButton.addEventListener("click", () => {
    const isActive = header.classList.contains("is-active");

    if (!isActive) {
      // 開く
      header.classList.add("is-active");
      overlay.classList.add("is-active");
      body.style.overflow = "hidden"; // スクロール禁止
    } else {
      // 閉じる
      header.classList.remove("is-active");
      overlay.classList.remove("is-active");
      body.style.overflow = ""; // スクロール復活
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".l-faq__item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".l-faq__q");
    const answer = item.querySelector(".l-faq__a");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-active");

      if (isOpen) {
        // close
        answer.style.height = answer.scrollHeight + "px";
        requestAnimationFrame(() => {
          answer.style.height = "0";
          answer.style.opacity = "0";
        });
        item.classList.remove("is-active");
      } else {
        // open
        item.classList.add("is-active");
        answer.style.height = answer.scrollHeight + "px";
        answer.style.opacity = "1";

        answer.addEventListener("transitionend", function handler() {
          answer.style.height = "auto";
          answer.removeEventListener("transitionend", handler);
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-slider-block").forEach((block) => {
    const swiperEl = block.querySelector(".js-swiper");
    const cursol = block.querySelector(".l-button-and-cursol__cursol");
    if (!swiperEl || !cursol) return;

    const prevBtn = cursol.children[0];
    const nextBtn = cursol.children[1];

    const slidesPerView = parseFloat(block.dataset.slides) || 3.4;
    const spaceBetween = parseInt(block.dataset.space, 10) || 40;

    const swiper = new Swiper(swiperEl, {
      slidesPerView,
      spaceBetween,

      loop: true,
      centeredSlides: true,
      centeredSlidesBounds: true,
      grabCursor: true,

      /* 👇 左右の見切れ量 */
      slidesOffsetBefore: 24,
      slidesOffsetAfter: 24,

      /* 👇 初期は中央 */
      initialSlide: Math.floor(
        swiperEl.querySelectorAll(".swiper-slide").length / 2
      ),

      /* =========================
         自動スライド設定
      ========================= */
      autoplay: {
        delay: 3500, // 次に動くまでの待ち時間（ms）
        disableOnInteraction: false, // 操作しても止まらない
        pauseOnMouseEnter: true, // hover中は止める（UX◎）
      },

      /* 👇 スライド移動スピード（ここが「ゆっくり感」） */
      speed: 900, // 600〜1200あたりが自然

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
});


document.addEventListener("DOMContentLoaded", () => {
  const CLASSNAME = "-visible";
  const DELAY_STEP = 0.06;

  const targets = document.querySelectorAll(".js-text-anim");

  const isSP = window.matchMedia("(max-width: 768px)").matches;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const container = entry.target;
        container.classList.add(CLASSNAME);
        obs.unobserve(container);
      });
    },
    {
      root: null,
      rootMargin: isSP
        ? "0px 0px -45% 0px"
        : "0px 0px -35% 0px",
      threshold: 0,
    }
  );

  targets.forEach((container) => {
    /**
     * 対象要素：
     * 1. .en .jp .sub など
     * 2. js-text-anim 直下のテキストノード
     */
    const elements = container.querySelectorAll(
      ".en, .jp, .sub, .en-insta-01, .en-insta-02"
    );

    // ① en / jp 等がある場合
    if (elements.length) {
      elements.forEach((el) => splitText(el));
    } 
    // ② 直書きテキストの場合
    else {
      splitText(container);
    }

    observer.observe(container);
  });

  /**
   * テキスト分割関数（br対応）
   */
  function splitText(el) {
    const nodes = Array.from(el.childNodes);
    el.innerHTML = "";

    let charIndex = 0;

    nodes.forEach((node) => {
      // テキストノード
      if (node.nodeType === Node.TEXT_NODE) {
        [...node.textContent].forEach((char) => {
          const span = document.createElement("span");
          span.classList.add("char");
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.transitionDelay = `${charIndex * DELAY_STEP}s`;
          el.appendChild(span);
          charIndex++;
        });
      }

      // br / strong / ruby などは保持
      if (node.nodeType === Node.ELEMENT_NODE) {
        el.appendChild(node.cloneNode(true));
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-show");
      obs.unobserve(entry.target); // ← 一度だけ
    });
  }, {
    threshold: 0.2
  });

  targets.forEach(el => observer.observe(el));
});
