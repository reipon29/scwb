document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 1. Navigation Elements
  // -------------------------------
  const navToggle = document.querySelector('.nav-toggle');
  const overlay   = document.getElementById('mobile-menu');
  const closeBtn  = document.querySelector('.menu-close');

  // Toggle mobile overlay menu on hamburger click
  navToggle.addEventListener('click', () => {
    const isOpen = !overlay.classList.contains('open');
    overlay.classList.toggle('open', isOpen);
    overlay.setAttribute('aria-hidden', !isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label',
      isOpen ? 'メニューを閉じる' : 'メニューを開く'
    );
  });

  // Close overlay when close button clicked
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');
  });

  // -------------------------------
  // 2. Hero Text Animation
  // -------------------------------
  const hero = document.querySelector('.hero');
  window.addEventListener('load', () => {
    if (hero) hero.classList.add('loaded');
  });

  // -------------------------------
  // 3. Background Cross-Fade
  // -------------------------------
  if (hero) {
    const desktopLayers = ['desktop1.jpg', 'desktop2.jpg', 'desktop3.jpg'];
    const mobileLayers  = ['mobile1.jpg','mobile2.jpg','mobile3.jpg','mobile4.jpg','mobile5.jpg','mobile6.jpg'];

    // Viewport width helper (iPad Safariでツールバー表示/非表示によるレイアウト変動に強い)
    const getViewportWidth = () => {
      const vv = window.visualViewport;
      return Math.min(window.innerWidth, vv ? Math.round(vv.width) : window.innerWidth);
    };

    // CSSと同じ判定に合わせる（767.98px以下をモバイル）
    const isMobileMQ = () => window.matchMedia('(max-width: 767.98px)').matches;

    // PC/Tablet判定（背景fixedはPCのみ）
    const isPC = () => getViewportWidth() >= 1367;

    // 現在のレイヤーセット
    let layers = isMobileMQ() ? mobileLayers : desktopLayers;
    let idx = 0;

    function applyBg() {
      // 背景attachmentはPCのみfixed、その他はscroll（＝指定しない）
      const attachment = isPC() ? 'fixed' : 'no-repeat';
      hero.style.background = `
        linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
        url('img/${layers[idx]}') center/cover ${attachment}
      `;
    }

    // 初期適用
    applyBg();

    // リサイズ/向き変更/ビューポート変化に反応（iPad Safari対策）
    let rafId = null;
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const nextLayers = isMobileMQ() ? mobileLayers : desktopLayers;
        if (nextLayers !== layers) {
          layers = nextLayers;
          idx = 0; // セットが変わったら先頭に戻す
        }
        applyBg();
      });
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onResize, { passive: true });
    }

    // 4秒ごとに背景を巡回
    setInterval(() => {
      idx = (idx + 1) % layers.length;
      applyBg();
    }, 4000);
  }

  // -------------------------------
  // 4. Scroll-triggered Fade-in (IntersectionObserver)
  // -------------------------------
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe fade-up elements and cards
  document.querySelectorAll('.fade-up, .card').forEach(el => {
    observer.observe(el);
  });

  // Also observe footer for fade-in
  const footer = document.querySelector('.site-footer');
  if (footer) observer.observe(footer);

  // -------------------------------
  // 5. Close mobile menu on resize
  // -------------------------------
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && overlay.classList.contains('open')) {
      closeBtn.click();
    }
  });
  // -------------------------------
  // 6. Facebook Page Plugin (iframe) responsive sizing
  // -------------------------------
  (function(){
    const fbEl = document.getElementById('fbPage');
    if (!fbEl) return; // Facebook iframe が無いページはスキップ

    const FB_PAGE_URL = 'https%3A%2F%2Fwww.facebook.com%2FSuwaCityWindBand';
    const BASE = `https://www.facebook.com/plugins/page.php?href=${FB_PAGE_URL}&tabs=timeline&hide_cover=false&show_facepile=true&adapt_container_width=false`;

    const getVW = () => {
      const vv = window.visualViewport;
      return Math.min(window.innerWidth, vv ? Math.round(vv.width) : window.innerWidth);
    };
    const pickWidth  = vw => (vw <= 767 ? 300 : (vw <= 1024 ? 420 : 500));
    const pickHeight = vw => (vw <= 767 ? 560 : (vw <= 1024 ? 640 : 700));

    const applySrc = () => {
      const vw = getVW();
      const w = pickWidth(vw);
      const h = pickHeight(vw);
      fbEl.src = `${BASE}&width=${w}&height=${h}`;
      fbEl.style.height = h + 'px';
    };

    // 初期適用とイベント登録
    applySrc();
    window.addEventListener('resize', applySrc, { passive: true });
    window.addEventListener('orientationchange', applySrc);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', applySrc, { passive: true });
    }
  })();
});
