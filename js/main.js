/* ============================================
   KALY'S FRI CHICKEN – MAIN JAVASCRIPT
   ============================================ */

// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2200);
});

// ===== AOS Init =====
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
  disable: window.innerWidth < 768 ? 'phone' : false,
});

// ===== Custom Cursor =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = document.querySelectorAll('a, button, .menu-card, .deal-card, .featured-card, .filter-btn, .pizza-card, .sauce-card, input, textarea, select');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
  });
}

// ===== Navbar =====
const mainNav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  mainNav.classList.toggle('scrolled', scrollY > 60);
  backToTop.classList.toggle('visible', scrollY > 500);
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#mainNav .nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActiveNav);

// Close mobile nav
document.querySelectorAll('#mainNav .nav-link, #mainNav .btn-order-nav').forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('navMenu');
    if (navCollapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(navCollapse)?.hide();
    }
  });
});

// Back to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Hero Background Slider =====
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  heroSlides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % heroSlides.length;
  heroSlides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000);

// ===== GSAP Animations =====
gsap.registerPlugin(ScrollTrigger);

// Hero Timeline
const heroTl = gsap.timeline({ delay: 2.4 });
heroTl
  .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  .to('.hero-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
  .to('.hero-info-pills', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

// Typewriter
const taglineText = 'The Real Recipe';
const taglineEl = document.getElementById('heroTagline');
let charIndex = 0;

function typeWriter() {
  if (charIndex < taglineText.length) {
    taglineEl.textContent += taglineText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 90);
  }
}
setTimeout(typeWriter, 3200);

// Hero Particles
(function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = ['#C41E3A', '#F5A623', '#FFD966', '#ff6b35'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};left:${Math.random()*100}%;top:${Math.random()*100}%`;
    container.appendChild(p);
    gsap.to(p, {
      opacity: Math.random() * 0.4 + 0.1,
      y: -80 - Math.random() * 150,
      x: (Math.random() - 0.5) * 80,
      duration: 3 + Math.random() * 4,
      repeat: -1, delay: Math.random() * 3,
      ease: 'power1.out'
    });
  }
})();

// Stat Counter
document.querySelectorAll('[data-count]').forEach(counter => {
  const target = parseInt(counter.getAttribute('data-count'));
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.fromTo(counter, { textContent: 0 }, {
        textContent: target, duration: 2,
        ease: 'power2.out', snap: { textContent: 1 }
      });
    }
  });
});

// Magnetic Buttons
document.querySelectorAll('.btn-fire, .btn-ghost, .btn-order-nav').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

// ===== Menu Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCategories = document.querySelectorAll('.menu-category');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    menuCategories.forEach(cat => {
      if (filter === 'all' || cat.getAttribute('data-category') === filter) {
        cat.classList.remove('hidden');
        // Re-trigger AOS for newly visible elements
        AOS.refresh();
      } else {
        cat.classList.add('hidden');
      }
    });
  });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  if (!data.name || !data.phone || !data.subject || !data.message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.className = 'form-status error';
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

  setTimeout(() => {
    formStatus.innerHTML = 'Your message has been delivered! 🍗';
    formStatus.className = 'form-status success';
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message<span class="btn-shine"></span>';
    setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
  }, 1500);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
