/**
 * ポートフォリオサイト メインJavaScript
 * モバイルメニュー / ヘッダー / フェードインアニメーション
 */

(function () {
  'use strict';

  /* モバイルメニュー */
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.header__nav-link');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      });
    });
  }

  /* スクロール時ヘッダー */
  const header = document.getElementById('header');

  function handleScroll() {
    if (header) {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* フェードインアニメーション */
  const fadeTargets = document.querySelectorAll(
    '.hero__inner, .section__header, .about__content, .work-card, .service-card, .contact__content'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  fadeTargets.forEach(function (el) {
    observer.observe(el);
  });

  /* カードの順番に遅延を付与 */
  document.querySelectorAll('.work-card').forEach(function (card, i) {
    card.style.transitionDelay = i * 0.1 + 's';
  });

  document.querySelectorAll('.service-card').forEach(function (card, i) {
    card.style.transitionDelay = i * 0.08 + 's';
  });

})();
