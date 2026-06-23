// ===== Clock (local time) =====
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  el.textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 1000 * 30);

// ===== Scroll progress bar =====
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ===== Nav background on scroll =====
const nav = document.getElementById('nav');
function updateNav() {
  if (window.scrollY > 20) nav.style.borderBottomColor = 'rgba(255,255,255,0.16)';
  else nav.style.borderBottomColor = 'rgba(255,255,255,0.09)';
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ===== Active nav link highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom > 120) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
  '.about-text, .about-stats .stat, .skill-card, .project, .timeline-item, .philosophy-col, .contact-grid > *'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// stagger skill cards
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});

// ===== Contact form (front-end only demo) =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    const original = btn.innerHTML;
    btn.innerHTML = 'MESSAGE SENT ✓';
    btn.style.background = '#1a7a3c';
    btn.style.borderColor = '#1a7a3c';
    form.reset();
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 2600);
  });
}

// ===== Smooth-close mobile menu on resize =====
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) mobileMenu.classList.remove('open');
});
