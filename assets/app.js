/* スクロール演出だけを担当します。本文とリンクは index.html にあります。 */
(() => {
  'use strict';
  const body = document.body;
  const progress = document.querySelector('#reading-progress');
  const motionButton = document.querySelector('#motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionOff = reducedMotion.matches;
  let framePending = false;

  function setMotion(off) {
    motionOff = off;
    body.classList.toggle('motion-off', off);
    body.classList.toggle('motion-enabled', !off);
    motionButton.setAttribute('aria-pressed', String(off));
    motionButton.textContent = off ? '動きをオンにする' : '動きをオフにする';
  }
  setMotion(motionOff);
  motionButton.addEventListener('click', () => setMotion(!motionOff));
  reducedMotion.addEventListener('change', event => setMotion(event.matches));

  const facts = [...document.querySelectorAll('.fact')];
  const chapters = [...document.querySelectorAll('.chapter')];
  const navLinks = [...document.querySelectorAll('.nav-link')];

  // 各章で画面の中央に最も近い記事を選び、右側の数字を更新します。
  function updateReadingState() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? Math.min(100, window.scrollY / maxScroll * 100) : 0}%`;
    const readingLine = window.innerHeight * 0.4;
    let activeChapter = null;
    chapters.forEach(chapter => {
      const rect = chapter.getBoundingClientRect();
      if (rect.top <= readingLine && rect.bottom > readingLine) activeChapter = chapter;
      const candidates = [...chapter.querySelectorAll('.fact')];
      const activeFact = candidates.reduce((closest, fact) => {
        const distance = Math.abs(fact.getBoundingClientRect().top - readingLine);
        return !closest || distance < closest.distance ? { fact, distance } : closest;
      }, null)?.fact;
      if (!activeFact || chapter.dataset.activeFact === activeFact.id) return;
      chapter.dataset.activeFact = activeFact.id;
      chapter.querySelector('.stat-value').textContent = activeFact.dataset.value;
      chapter.querySelector('.stat-unit').textContent = activeFact.dataset.unit;
      chapter.querySelector('.visual-caption').textContent = activeFact.dataset.label;
      chapter.querySelector('.visual-index').textContent = `FACT ${activeFact.dataset.index}`;
      // Web Animations は補助のみ。非対応環境でも内容の切り替えは動きます。
      const stat = chapter.querySelector('.visual-stat');
      if (!motionOff && stat.animate) stat.animate([{ opacity: 0.25, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'ease-out' });
    });
    navLinks.forEach(link => {
      if (activeChapter && link.dataset.chapter === activeChapter.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    framePending = false;
  }
  function requestReadingUpdate() {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateReadingState);
    }
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    facts.forEach(fact => observer.observe(fact));
  } else facts.forEach(fact => fact.classList.add('is-visible'));

  window.addEventListener('scroll', requestReadingUpdate, { passive: true });
  window.addEventListener('resize', requestReadingUpdate);
  window.addEventListener('pageshow', requestReadingUpdate);
  updateReadingState();
})();
