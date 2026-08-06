(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-site-header]');
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themePreference = window.matchMedia('(prefers-color-scheme: light)');

  const setTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    if (persist) localStorage.setItem('gojo-theme', theme);
    if (themeButton) {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      themeButton.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      themeButton.setAttribute('title', `Switch to ${nextTheme} theme`);
    }
  };

  const savedTheme = localStorage.getItem('gojo-theme');
  setTheme(savedTheme || (themePreference.matches ? 'light' : 'dark'));

  themeButton?.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
  });

  themePreference.addEventListener?.('change', (event) => {
    if (!localStorage.getItem('gojo-theme')) {
      setTheme(event.matches ? 'light' : 'dark');
    }
  });

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    header?.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation?.classList.toggle('is-open', willOpen);
    header?.classList.toggle('menu-open', willOpen);
  });

  navigation?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!navigation?.classList.contains('is-open')) return;
    if (!header?.contains(event.target)) closeMenu();
  });

  const updateHeader = () => {
    const scrolled = window.scrollY > 20;
    header?.classList.toggle('is-scrolled', scrolled);
    backToTop?.classList.toggle('is-visible', window.scrollY > 640);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
  });

  const calculateLearningMonths = () => {
    const learningStarted = new Date(Date.UTC(2025, 11, 1));
    const now = new Date();
    let months = (now.getUTCFullYear() - learningStarted.getUTCFullYear()) * 12;
    months += now.getUTCMonth() - learningStarted.getUTCMonth();
    if (now.getUTCDate() < learningStarted.getUTCDate()) months -= 1;
    return Math.max(8, months);
  };

  const learningMonths = calculateLearningMonths();
  document.querySelectorAll('[data-learning-months]').forEach((element) => {
    element.textContent = `${learningMonths}+`;
  });
  document.querySelectorAll('[data-learning-months-copy]').forEach((element) => {
    element.textContent = `${learningMonths}+ months`;
  });

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const revealItems = document.querySelectorAll('.reveal');
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sectionLinks = [...document.querySelectorAll('[data-navigation] a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.01, 0.3, 0.6] });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  body.classList.add('is-ready');
})();
