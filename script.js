/* SHAMBHU DAYAL P.G. COLLEGE — script.js */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 500);
  });
  // fallback in case load event already fired
  setTimeout(() => loader && loader.classList.add('hide'), 3000);

  /* ---------- Scroll progress + navbar shrink ---------- */
  const progress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const fabTop = document.getElementById('fab-top');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    if (h.scrollTop > 40) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); }
    if (h.scrollTop > 500) { fabTop.classList.add('show'); } else { fabTop.classList.remove('show'); }
  }, { passive: true });

  fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Desktop dropdown click-toggle (for touch/click users) ---------- */
  document.querySelectorAll('.main-nav > ul > li').forEach(li => {
    const btn = li.querySelector(':scope > button.nav-link');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = li.classList.contains('open');
        document.querySelectorAll('.main-nav > ul > li.open').forEach(o => o.classList.remove('open'));
        if (!isOpen) li.classList.add('open');
      });
    }
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.main-nav > ul > li.open').forEach(o => o.classList.remove('open'));
  });

  /* ---------- Mobile drawer ---------- */
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    drawer.classList.add('open'); backdrop.classList.add('open'); hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open'); backdrop.classList.remove('open'); hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
  drawerClose.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('#mobile-drawer li.has-sub > button.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('li');
      const wasOpen = li.classList.contains('open');
      document.querySelectorAll('#mobile-drawer li.has-sub').forEach(l => l.classList.remove('open'));
      if (!wasOpen) li.classList.add('open');
    });
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ---------- Hero slider ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicators button');
  let heroIndex = 0;
  function showSlide(i) {
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(b => b.classList.remove('active'));
    slides[i].classList.add('active');
    indicators[i].classList.add('active');
    heroIndex = i;
  }
  indicators.forEach((btn, i) => btn.addEventListener('click', () => showSlide(i)));
  if (slides.length) {
    setInterval(() => { showSlide((heroIndex + 1) % slides.length); }, 5500);
  }

  /* ---------- Hero particles ---------- */
  const particleWrap = document.querySelector('.hero-particles');
  if (particleWrap) {
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('span');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = 0.2 + Math.random() * 0.5;
      particleWrap.appendChild(p);
    }
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Tilt effect on cards ---------- */
  const tiltEls = document.querySelectorAll('.mv-card, .dept-card, .course-card, .tilt-frame');
  tiltEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryImgs = Array.from(document.querySelectorAll('.masonry-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  let lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i;
    lightboxImg.src = galleryImgs[i].src;
    lightboxCounter.textContent = (i + 1) + ' / ' + galleryImgs.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  function nextImg(dir) {
    lbIndex = (lbIndex + dir + galleryImgs.length) % galleryImgs.length;
    lightboxImg.src = galleryImgs[lbIndex].src;
    lightboxCounter.textContent = (lbIndex + 1) + ' / ' + galleryImgs.length;
  }
  galleryImgs.forEach((img, i) => img.closest('.masonry-item').addEventListener('click', () => openLightbox(i)));
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => nextImg(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => nextImg(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImg(1);
    if (e.key === 'ArrowLeft') nextImg(-1);
  });

  /* ---------- Gallery filter ---------- */
  const filterBtns = document.querySelectorAll('.gallery-filter button');
  const items = document.querySelectorAll('.masonry-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(it => {
        it.style.display = (cat === 'all' || it.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  /* ---------- Gallery "View More" (reveal hidden items) ---------- */
  const viewMoreBtn = document.getElementById('gallery-view-more');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('.masonry-item.hidden-item').forEach(it => it.classList.remove('hidden-item'));
      viewMoreBtn.style.display = 'none';
    });
  }

  /* ---------- Testimonials carousel ---------- */
  const testiSlides = document.getElementById('testi-slides');
  const testiDots = document.querySelectorAll('.testi-dots button');
  let testiIndex = 0;
  function showTesti(i) {
    testiIndex = i;
    testiSlides.style.transform = `translateX(-${i * 100}%)`;
    testiDots.forEach(d => d.classList.remove('active'));
    testiDots[i].classList.add('active');
  }
  testiDots.forEach((d, i) => d.addEventListener('click', () => showTesti(i)));
  if (testiDots.length) {
    setInterval(() => showTesti((testiIndex + 1) % testiDots.length), 5000);
  }

  /* ---------- Contact form (front-end only) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      msg.textContent = 'Thank you! Your message has been noted. We will get back to you soon.';
      msg.style.color = '#1e8a4c';
      msg.classList.add('show');
      form.reset();
      setTimeout(() => msg.classList.remove('show'), 6000);
    });
  }

  /* ---------- Set current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});