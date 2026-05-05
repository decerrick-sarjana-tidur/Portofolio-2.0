const PROJECTS = [
  { title: "Web Resep Makanan", desc: "Memudahkan orang untuk menemukan resep makanan yang lezat.", img: "./assets/resep.png", demo: "https://decerrick-sarjana-tidur.github.io/De-TechLab/", code: null },
  { title: "Web E-BookVerse", desc: "Platform digital untuk membeli buku secara online.", img: "./assets/bookverse.png", demo: "https://decerrick-sarjana-tidur.github.io/e-book-verse/", code: null },
  { title: "Web Portofolio 1.0", desc: "Agar personal branding mudah dilihat oleh semua orang.", img: "./assets/portofolio.png", demo: "https://decerrick-sarjana-tidur.github.io/My-Portofolio/", code: null },
];

const SKILLS = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" },
];

const WA_NUMBER = '6285730700548';

const CERTS = [
  "./assets/sertifikat1.jpg",
  "./assets/sertifikat2.jpg",
  "./assets/sertifikat3.jpg",
  "./assets/sertifikat4.jpg",
];

const VISIBLE_INITIAL = 6;
let showingAll = false;

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const list = showingAll ? PROJECTS : PROJECTS.slice(0, VISIBLE_INITIAL);
  grid.innerHTML = list.map(p => `
    <div class="project-card fade-up">
      <img src="${p.img}" alt="${p.title}" class="project-img"
           onerror="this.src='https://via.placeholder.com/400x190/131c2e/00e5c9?text=Project'" />
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-links">
          ${p.code ? `<a href="${p.code}" target="_blank" class="project-link">⌨ Source Code</a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" class="project-link primary">🔗 Kunjungi</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  if (PROJECTS.length <= VISIBLE_INITIAL) {
    showMoreBtn.style.display = 'none';
  } else {
    showMoreBtn.style.display = 'inline-flex';
    showMoreBtn.textContent = showingAll ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Lebih Banyak';
  }
  observeFadeUps();
}

function toggleProjects() {
  showingAll = !showingAll;
  renderProjects();
  if (!showingAll) document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

function renderSkills() {
  const doubled = [...SKILLS, ...SKILLS];
  document.getElementById('skillsTrack').innerHTML = doubled.map(s => `
    <div class="skill-badge">
      <img src="${s.icon}" alt="${s.name}" onerror="this.style.display='none'" />
      <span>${s.name}</span>
    </div>
  `).join('');
}

function renderCerts() {
  document.getElementById('certsGrid').innerHTML = CERTS.map(c => `
    <div class="cert-card" onclick="openModal('${c}')">
      <img src="${c}" alt="Sertifikat"
           onerror="this.src='https://via.placeholder.com/300x170/131c2e/00e5c9?text=Certificate'" />
      <div class="cert-overlay"><span>Lihat Detail</span></div>
    </div>
  `).join('');
}

function openModal(src) {
  document.getElementById('modalImg').src = src;
  document.getElementById('certModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('certModal').classList.remove('open');
  document.body.style.overflow = '';
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});

let scrollYPos = 0;

function lockScroll() {
  scrollYPos = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollYPos}px`;
  document.body.style.width = '100%';
  document.body.style.overflowY = 'scroll';
}

function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';
  window.scrollTo(0, scrollYPos);
}

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileBackdrop = document.getElementById('mobileBackdrop');
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  mobileBackdrop.classList.toggle('open', isOpen);
  if (isOpen) lockScroll(); else unlockScroll();
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileBackdrop.classList.remove('open');
  unlockScroll();
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

function smoothScrollToSection(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const navbarEl = document.getElementById('navbar');
  const navOffset = navbarEl ? navbarEl.offsetHeight + 10 : 0;
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY - navOffset;
  const distance = targetY - startY;
  const duration = 700;
  const startTime = performance.now();

  const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    target.classList.remove('section-arrived');
    void target.offsetWidth;
    target.classList.add('section-arrived');
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    smoothScrollToSection(href);
  });
});

function observeFadeUps() {
  const items = document.querySelectorAll('.fade-up:not(.visible)');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => io.observe(el));
}

function sendMessage() {
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const subject = document.getElementById('fSubject').value.trim();
  const message = document.getElementById('fMessage').value.trim();
  if (!name || !email || !message) { alert('Mohon isi semua field yang wajib diisi.'); return; }
  const text = encodeURIComponent(`Halo!\n\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\n\nPesan:\n${message}`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  document.getElementById('formSuccess').style.display = 'block';
  ['fName', 'fEmail', 'fSubject', 'fMessage'].forEach(id => { document.getElementById(id).value = ''; });
}

renderProjects();
renderSkills();
renderCerts();
observeFadeUps();