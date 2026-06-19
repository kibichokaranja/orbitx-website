/* ===== PAGE LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 600);
});

/* ===== SCROLL PROGRESS ===== */
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  progress.style.width = (scrolled * 100) + '%';
}, { passive: true });

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== STAR FIELD ===== */
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 140; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2.5 + 0.4;
  star.style.cssText = `
    width:${size}px; height:${size}px;
    top:${Math.random() * 100}%;
    left:${Math.random() * 100}%;
    --op:${(Math.random() * 0.5 + 0.1).toFixed(2)};
    --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
    --delay:${(Math.random() * 5).toFixed(1)}s;
  `;
  starsContainer.appendChild(star);
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const ratio = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    const value = target * eased;
    el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString()) + suffix;
    if (ratio < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ===== SCROLL REVEAL + COUNTER TRIGGER ===== */
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
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
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

toggle.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggle.classList.toggle('on', isAnnual);
  monthlyLabel.classList.toggle('active', !isAnnual);
  annualLabel.classList.toggle('active', isAnnual);
  priceNums.forEach(el => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      el.style.opacity = '1';
    }, 150);
  });
});

/* ===== FAQ ACCORDION ===== */
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
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('formSuccess');
const errorMsg = document.getElementById('formError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  const data = new FormData(form);

  // If Formspree ID not set, simulate success
  const action = form.action;
  if (action.includes('YOUR_FORM_ID')) {
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      successMsg.style.display = 'block';
    }, 1200);
    return;
  }

  try {
    const res = await fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      successMsg.style.display = 'block';
    } else {
      errorMsg.style.display = 'block';
    }
  } catch {
    errorMsg.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
  }
});

/* ===== BACK TO TOP ===== */
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.style.color = active ? 'var(--white)' : '';
  });
}, { passive: true });
