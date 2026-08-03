// MathSpark — core interactions (nav, theme, reveal-on-scroll)

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- Dark mode toggle (persisted for this session) ---- */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '🌙' : '🌞';
  };

  let savedTheme = 'light';
  try {
    savedTheme = window.localStorage.getItem('mathspark-theme') || 'light';
  } catch (e) { /* storage unavailable — default to light */ }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { window.localStorage.setItem('mathspark-theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ---- Reveal-on-scroll for cards & feature items ---- */
  const revealTargets = document.querySelectorAll('.grade-card, .feature-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el, i) => {
      el.style.setProperty('--i', i % 8);
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(el => el.classList.add('in-view'));
  }

});
