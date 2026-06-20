/* ===== PAGE TRANSITIONS ===== */
const overlay = document.getElementById('pageTransition');

function navigateTo(href) {
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = href; }, 380);
}

document.addEventListener('DOMContentLoaded', () => {
  // Fade in on arrival
  overlay.classList.add('leaving');
  setTimeout(() => overlay.classList.remove('leaving'), 50);

  // Intercept nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || href.startsWith('tel')) return;
    // Allow hash anchors that include a page (e.g. index.html#section)
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target.includes('#') && target.split('#')[0] === '') return; // same-page anchor
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage = target.split('#')[0];
      if (targetPage === currentPage || targetPage === '') return;
      e.preventDefault();
      navigateTo(target);
    });
  });
});

/* ===== SCROLL PROGRESS ===== */
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  if (progress) progress.style.width = (scrolled * 100) + '%';
}, { passive: true });

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

/* ===== STAR FIELD ===== */
const starsContainer = document.getElementById('stars');
if (starsContainer) {
  for (let i = 0; i < 140; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.4;
    star.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--op:${(Math.random()*0.5+0.1).toFixed(2)};--dur:${(Math.random()*4+2).toFixed(1)}s;--delay:${(Math.random()*5).toFixed(1)}s;`;
    starsContainer.appendChild(star);
  }
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const ratio = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    el.textContent = (isFloat ? (target * eased).toFixed(1) : Math.floor(target * eased).toLocaleString()) + suffix;
    if (ratio < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');
const counterEls = document.querySelectorAll('[data-count]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 55);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });

revealEls.forEach(el => revealObserver.observe(el));
counterEls.forEach(el => counterObserver.observe(el));

/* ===== PRICING TOGGLE ===== */
const toggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('toggleMonthly');
const annualLabel = document.getElementById('toggleAnnual');
const priceNums = document.querySelectorAll('.price-num');
let isAnnual = false;
if (toggle) {
  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggle.classList.toggle('on', isAnnual);
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);
    priceNums.forEach(el => {
      el.style.opacity = '0';
      setTimeout(() => { el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly; el.style.opacity = '1'; }, 150);
    });
  });
}

/* ===== FAQ ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
if (form) {
  const submitBtn = document.getElementById('submitBtn');
  form.addEventListener('submit', () => {
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
  });
  // Show success message if redirected back after submission
  if (window.location.search.includes('sent=1')) {
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) successMsg.style.display = 'block';
  }
}

/* ===== BACK TO TOP ===== */
const backBtn = document.getElementById('backToTop');
if (backBtn) {
  window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
  });
}, { passive: true });
