// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal (skipped if reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Language switcher: preserve query string + hash when switching locale (computed
// at click time), so /contact?type=hourly -> /fr/contact?type=hourly and
// /#pricing -> /fr/#pricing. The static hrefs still work with JS off.
document.querySelectorAll('.lang-switch .lang-opt').forEach(a => {
  const base = a.getAttribute('href');
  a.addEventListener('click', e => {
    const extra = location.search + location.hash;
    if (extra) { e.preventDefault(); location.href = base + extra; }
  });
});
