  // ─── RE-JUMP TO URL HASH AFTER LATE-LOADING HERO CONTENT SETTLES ───
  // (video/webfonts above the target can shift layout after the browser's
  // one-time initial fragment scroll, landing the visitor at the wrong spot)
  if (location.hash) {
    const hashTarget = document.querySelector(location.hash);
    if (hashTarget) {
      const jumpToHash = () => hashTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
      window.addEventListener('load', () => setTimeout(jumpToHash, 50));
      setTimeout(jumpToHash, 700);
    }
  }

  // ─── MY BOT WIDGET ───
  function toggleBot(force) {
    const panel = document.getElementById('bot-panel');
    const fab = document.getElementById('bot-fab');
    const open = force !== undefined ? force : !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    fab.classList.toggle('open', open);
    fab.setAttribute('aria-label', open ? 'Close MY BOT' : 'Open MY BOT');
  }
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('bot-panel');
    const fab = document.getElementById('bot-fab');
    if (panel.classList.contains('open') && !panel.contains(e.target) && !fab.contains(e.target)) {
      toggleBot(false);
    }
  });

  // ─── NAV SCROLL ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ─── MOBILE MENU ───
  function openMobile() { document.getElementById('mobile-menu').classList.add('open'); }
  function closeMobile() { document.getElementById('mobile-menu').classList.remove('open'); }
  function toggleMobileSub(btn) {
    const item = btn.closest('.mobile-menu-item');
    item.classList.toggle('open');
  }

  // ─── HERO ANIMATIONS (Home page only) ───
  (function() {
    const eyebrow = document.querySelector('.hero-eyebrow');
    const title = document.querySelector('.hero-title');
    const tagline = document.querySelector('.hero-tagline');
    const ctas = document.querySelector('.hero-ctas');
    if (!eyebrow || !title || !tagline || !ctas) return;

    const words = document.querySelectorAll('.hero-name-word');

    // Stagger word reveal
    words.forEach((w, i) => {
      w.style.transition = `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`;
      setTimeout(() => { w.style.transform = 'translateY(0)'; }, 50);
    });

    // Eyebrow
    setTimeout(() => {
      eyebrow.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      eyebrow.style.opacity = '1'; eyebrow.style.transform = 'translateY(0)';
    }, 200);

    // Title
    setTimeout(() => {
      title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      title.style.opacity = '1'; title.style.transform = 'translateY(0)';
    }, 700);

    // Tagline
    setTimeout(() => {
      tagline.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      tagline.style.opacity = '1'; tagline.style.transform = 'translateY(0)';
    }, 1000);

    // CTAs
    setTimeout(() => {
      ctas.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      ctas.style.opacity = '1'; ctas.style.transform = 'translateY(0)';
    }, 1300);
  })();

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ───
  function animateCounter(el, target, suffix) {
    const dur = 1800;
    const step = 16;
    const totalSteps = dur / step;
    const increment = target / totalSteps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.round(current) + (suffix || '');
      if (current >= target) clearInterval(timer);
    }, step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseInt(el.dataset.count);
        const isPercent = el.parentElement.querySelector('.stat-label').textContent.includes('%');
        animateCounter(el, val, isPercent ? '%' : el.parentElement.querySelector('.stat-label').textContent.includes('K') ? 'K+' : '+');
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ─── CONTACT FORM ───
  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, var(--teal-dk), var(--teal))';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.style.color = '';
      e.target.reset();
    }, 3500);
  }

  // ─── GSAP ScrollTrigger enhanced animations (Home page only, if loaded) ───
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && document.querySelector('.hero-city')) {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax skyline on scroll
    gsap.to('.hero-city', {
      y: 60, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }
