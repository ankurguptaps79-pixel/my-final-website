// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 55);
});

// ── HAMBURGER ──
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;
  const open = () => { nav.classList.add('open'); toggle.innerHTML = '&#x2715;'; document.body.style.overflow = 'hidden'; };
  const close = () => { nav.classList.remove('open'); toggle.innerHTML = '&#9776;'; document.body.style.overflow = ''; };
  toggle.addEventListener('click', e => { e.stopPropagation(); nav.classList.contains('open') ? close() : open(); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if (!e.target.closest('nav') && nav.classList.contains('open')) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) close(); });
})();

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNT UP ──
const countObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-target'));
    const start = performance.now();
    const dur = 1600;
    const step = () => {
      const p = Math.min((performance.now() - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target;
    };
    requestAnimationFrame(step);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-target').forEach(el => countObs.observe(el));

// ── FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Sending...'; btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').style.display = 'block';
    btn.textContent = 'Sent ✓'; btn.style.background = '#25D366';
  }, 1200);
}

// ── PARALLAX (desktop only) ──
window.addEventListener('scroll', () => {
  if (window.innerWidth < 1024) return;
  const bg = document.querySelector('.hero-bg');
  if (bg) bg.style.transform = `translateY(${window.scrollY * 0.32}px)`;
});