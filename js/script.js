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

  // ★ 768px以上はデスクトップ画像（iPadをデスクトップ側に）
  let layers = window.innerWidth >= 768 ? desktopLayers : mobileLayers;
  let idx = 0;

  function applyBg() {
    // タブレット: 768–1023 / PC: 1024+
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isPC     = window.innerWidth >= 1024;

    // PCのみ attachment: fixed、それ以外は scroll（＝明示しない）
    hero.style.background = `
      linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
      url('img/${layers[idx]}') center/cover ${isPC ? 'fixed' : 'no-repeat'}
    `;
    // ※ 'no-repeat' は background-repeat の指定（非PC時に attachment は既定の scroll）
  }

  // 初期適用
  applyBg();

  // リサイズ時に配列を切り替え & 再適用
  window.addEventListener('resize', () => {
    layers = window.innerWidth >= 768 ? desktopLayers : mobileLayers; // ★ 変更点
    idx = 0;
    applyBg();
  });

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
});
