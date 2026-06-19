// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Star field
const starsContainer = document.getElementById('stars');
const starCount = 120;
for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  star.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    --base-opacity: ${Math.random() * 0.5 + 0.1};
    --dur: ${Math.random() * 4 + 2}s;
    --delay: ${Math.random() * 4}s;
  `;
  starsContainer.appendChild(star);
}

// Scroll reveal
const reveals = document.querySelectorAll('.service-card, .ai-card, .pricing-card, .why-point, .section-header, .statement, .contact-inner > *');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.querySelector('.btn-text').textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.querySelector('.btn-text').textContent = 'Send Message';
    btn.disabled = false;
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }, 1200);
});

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
  });
}, { passive: true });
