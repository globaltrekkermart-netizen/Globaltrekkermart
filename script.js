// ============================================================
// GLOBAL TREKKER MART — script.js
// ============================================================

/* ── LOADER ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

if (cursor && cursorTrail) {
  document.addEventListener('mousemove', e => {
    cursor.style.left      = e.clientX + 'px';
    cursor.style.top       = e.clientY + 'px';
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  });

  // Scale up cursor on clickable elements
  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

/* ── STICKY HEADER ──────────────────────────────────────────── */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ── MOBILE BURGER ──────────────────────────────────────────── */
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    // Animate spans into X
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.card, .feature, .section-header');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i * 0.08) + 's';
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Add base style
  const style = document.createElement('style');
  style.textContent = `
    .card, .feature, .section-header {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
    }
    .card.reveal-in, .feature.reveal-in, .section-header.reveal-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  revealEls.forEach(el => observer.observe(el));
}

/* ── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile nav if open
      if (mobileNav) mobileNav.classList.remove('open');
    }
  });
});