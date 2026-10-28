// ===================================
// PARTICLE SYSTEM
// ===================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0, 245, 255' : '180, 79, 255';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

const particles = Array.from({ length: 150 }, () => new Particle());

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.05 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===================================
// TYPING ANIMATION
// ===================================
const typingEl = document.getElementById('typing-tag');
const texts = [
  '// STUDENT_PROFILE.init()',
  '// loading skills...',
  '// passion: ["商業", "電商", "科技"]',
  '// status: 持續進化中...',
];
let tIdx = 0, cIdx = 0, deleting = false;

function typeEffect() {
  const current = texts[tIdx];
  if (!deleting) {
    typingEl.textContent = current.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, deleting ? 40 : 80);
}
typeEffect();

// ===================================
// DYNAMIC ROLE
// ===================================
const roles = ['商業經營學習者', '電子商務探索者', '智慧科技愛好者', '數位商管跨領域人才'];
let rIdx = 0;
const roleEl = document.getElementById('dynamicRole');

function switchRole() {
  roleEl.style.opacity = '0';
  roleEl.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    rIdx = (rIdx + 1) % roles.length;
    roleEl.textContent = roles[rIdx];
    roleEl.style.transition = 'opacity 0.5s, transform 0.5s';
    roleEl.style.opacity = '1';
    roleEl.style.transform = 'translateY(0)';
  }, 300);
}
setInterval(switchRole, 2500);

// ===================================
// NAVBAR SCROLL
// ===================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link highlighting
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navItems.forEach(item => {
    item.style.color = '';
    if (item.getAttribute('href') === `#${current}`) {
      item.style.color = 'var(--cyan)';
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===================================
// SKILL BAR ANIMATION
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ===================================
// FADE IN ANIMATION
// ===================================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.about-card, .skill-card, .passion-card, .timeline-item, .vision-quote, .hero-stats, .hero-cta'
).forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ===================================
// MOUSE PARALLAX ON HERO
// ===================================
const heroRight = document.querySelector('.hero-right');
document.addEventListener('mousemove', (e) => {
  if (!heroRight) return;
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;
  const x = (clientX / innerWidth - 0.5) * 20;
  const y = (clientY / innerHeight - 0.5) * 20;
  heroRight.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// ===================================
// SMOOTH NAV SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================================
// CURSOR EFFECT
// ===================================
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: rgba(0, 245, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  transition: transform 0.1s ease;
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.8);
`;

const cursorTrail = document.createElement('div');
cursorTrail.style.cssText = `
  position: fixed;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: all 0.15s ease;
`;

document.body.appendChild(cursor);
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4 + 'px';
  cursor.style.top = mouseY - 4 + 'px';
  cursorTrail.style.left = mouseX - 14 + 'px';
  cursorTrail.style.top = mouseY - 14 + 'px';
});

document.querySelectorAll('a, button, .skill-card, .passion-card, .about-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorTrail.style.transform = 'scale(1.5)';
    cursorTrail.style.borderColor = 'rgba(180, 79, 255, 0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorTrail.style.transform = 'scale(1)';
    cursorTrail.style.borderColor = 'rgba(0, 245, 255, 0.3)';
  });
});

// ===================================
// TWINKLING BACKGROUND STARS
// ===================================
function createStar() {
  const star = document.createElement('div');
  star.style.cssText = `
    position: fixed;
    width: 2px;
    height: 2px;
    background: rgba(0, 245, 255, ${Math.random() * 0.6 + 0.2});
    border-radius: 50%;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    z-index: 2;
    pointer-events: none;
    animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
    animation-delay: ${Math.random() * 3}s;
  `;
  document.body.appendChild(star);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
`;
document.head.appendChild(style);

for (let i = 0; i < 60; i++) createStar();

// ===================================
// SECTION REVEAL ANIMATION
// ===================================
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(sec => {
  sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  sectionObserver.observe(sec);
});

console.log('%c王薏澄 Portfolio Loaded ✨', 
  'color: #00f5ff; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00f5ff;');
console.log('%c數位商管跨領域人才 · 持續進化中', 
  'color: #b44fff; font-size: 12px;');
