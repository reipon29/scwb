// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const overlay   = document.getElementById('mobile-menu');
  const closeBtn  = document.querySelector('.menu-close');

  // ハンバーガーでオーバーレイのみトグル
  navToggle.addEventListener('click', () => {
    const isOpen = !overlay.classList.contains('open');
    overlay.classList.toggle('open', isOpen);
    overlay.setAttribute('aria-hidden', !isOpen);

    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  // 閉じるボタン
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');

    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');
  });

  // ヒーローのテキストアニメ
  const hero = document.querySelector('.hero');
  window.addEventListener('load', () => {
    hero && hero.classList.add('loaded');
  });

  // 背景クロスフェード（前と同様）
  if (hero) {
    const layers = ['desktop1.jpg','desktop2.jpg','desktop3.jpg'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % layers.length;
      hero.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),
        url('../img/${layers[idx]}') center/cover fixed no-repeat
      `;
    }, 7000);
  }

  // スクロールでカード等をフェードイン
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-up, .card').forEach(el => {
    observer.observe(el);
  });

  // リサイズ時にオーバーレイを閉じる
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && overlay.classList.contains('open')) {
      closeBtn.click();
    }
  });
});
