/* ═══════════════════════════════════════════════════════
   M. AMARAVATHI PORTFOLIO — CLEAN JAVASCRIPT
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. THEME TOGGLE ───────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* ─── 2. NAVBAR & MOBILE MENU ───────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
  toggleBackTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ─── 3. ACTIVE NAV LINK ON SCROLL ─────────────────────── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ─── 4. TYPING EFFECT ──────────────────────────────────── */
const typingEl = document.getElementById('typingText');
const roles = [
  'MERN Stack Developer',
  'Flutter Developer',
  'UI/UX Designer',
  'AI & Vision Enthusiast',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1800);
      return;
    }
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 55 : 95);
}

/* ─── 5. SIMPLE SCROLL REVEAL ───────────────────────────── */
function initReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ─── 6. CONTACT FORM (AJAX FIXED) ──────────────────────── */
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = 'Sending...';
    formStatus.textContent = '';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://formsubmit.co/ajax/amaravathiany@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      const result = await response.json();

      if (response.ok) {
        formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      formStatus.textContent = 'First time? Check your Gmail to activate FormSubmit, or try again.';
      formStatus.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
    }

    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  });
}

/* ─── 7. BACK TO TOP ────────────────────────────────────── */
const backTop = document.getElementById('backTop');

function toggleBackTop() {
  backTop.classList.toggle('visible', window.scrollY > 400);
}

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── 8. INIT ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  typeEffect();
  updateActiveLink();
  toggleBackTop();
});