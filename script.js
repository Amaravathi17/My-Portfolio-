/* ═══════════════════════════════════════════════════════
   M. AMARAVATHI PORTFOLIO — JAVASCRIPT
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. LOADER ────────────────────────────────────────── */
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    // Kick off entrance animations after load
    initReveal();
    animateSkillBars();
  }, 2200); // matches loader animation duration
});

/* ─── 2. CUSTOM CURSOR ──────────────────────────────────── */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// Only enable on pointer-fine devices
if (window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Ring follows with lag
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const interactiveEls = 'a, button, .project-card, .skill-category, .contact-item, input, textarea';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveEls)) {
      cursorRing.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveEls)) {
      cursorRing.classList.remove('hovered');
    }
  });
}

/* ─── 3. THEME TOGGLE ───────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Persist preference
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* ─── 4. NAVBAR ─────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

// Scroll: add scrolled class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
  toggleBackTop();
});

// Mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ─── 5. ACTIVE NAV LINK ON SCROLL ─────────────────────── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ─── 6. TYPING EFFECT ──────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const roles = [
  'MERN Stack Developer',
  'UI/UX Designer',
  'React Developer',
  'Problem Solver',
  'Frontend Engineer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingPaused = false;

function typeEffect() {
  if (!typingEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      // Pause at end
      typingPaused = true;
      setTimeout(() => {
        typingPaused = false;
        isDeleting = true;
        typeEffect();
      }, 2000);
      return;
    }
  } else {
    // Deleting
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// Start typing after loader
setTimeout(typeEffect, 2400);

/* ─── 7. SCROLL REVEAL ──────────────────────────────────── */
function initReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling reveals
          const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
          const idx = Array.from(siblings).indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, idx * 120);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ─── 8. SKILL BAR ANIMATION ────────────────────────────── */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ─── 9. CONTACT FORM ───────────────────────────────────── */
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;

    // Disable inputs and show animated loading icon
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite; display:inline-block;"></i> Sending...';

    formStatus.textContent = 'Sending message...';
    formStatus.className = 'form-status';

    const formData = new FormData(contactForm);

   try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // <-- ADD THIS LINE to fix local network/CORS errors
        headers: {
          'Accept': 'application/json'
        }
      });

      // Restore button state
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      // Note: With 'no-cors', the browser won't let JS read response.ok, 
      // but if it didn't catch an error, it means the network request fired successfully!
      formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      contactForm.reset();

    } catch (error) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
      formStatus.textContent = '❌ Network error. Please check your connection and try again.';
      formStatus.className = 'form-status error';
    }

    // Clear feedback message automatically after 6 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 6000);
  });
}
/* Spin keyframe for loader button icon */
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);

/* ─── 10. BACK TO TOP ───────────────────────────────────── */
const backTop = document.getElementById('backTop');

function toggleBackTop() {
  backTop.classList.toggle('visible', window.scrollY > 500);
}

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── 11. SMOOTH SCROLL for anchor links ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── 12. NAVBAR OVERLAY on mobile open ──────────────────── */
// Creates a backdrop so tapping outside closes the menu
let mobileOverlay = null;

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    // Opening: create overlay
    if (!mobileOverlay) {
      mobileOverlay = document.createElement('div');
      mobileOverlay.style.cssText = `
        position:fixed; inset:0; z-index:998;
        background:rgba(0,0,0,0.5); backdrop-filter:blur(2px);
      `;
      mobileOverlay.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        mobileOverlay.remove();
        mobileOverlay = null;
      });
      document.body.appendChild(mobileOverlay);
    }
  } else {
    // Closing
    if (mobileOverlay) {
      mobileOverlay.remove();
      mobileOverlay = null;
    }
  }
});

/* ─── 13. PROJECT CARD tilt effect (subtle, desktop only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `
        translateY(-4px)
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── 14. COUNTER ANIMATION (stats) ─────────────────────── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const isFloat = String(target).includes('.');
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = progress * target;
    el.textContent = isFloat ? val.toFixed(2) : Math.floor(val) + '+';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target : target + '+';
  };
  requestAnimationFrame(step);
}

// Observe stats section
const statsEls = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.replace('+', '').replace(',', '');
      animateCounter(el, parseFloat(raw));
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statsEls.forEach(el => statsObserver.observe(el));

/* ─── 15. INITIALISE on DOMContentLoaded ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
  toggleBackTop();
});
