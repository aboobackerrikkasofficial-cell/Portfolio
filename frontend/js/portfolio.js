/* ==========================================================================
   Portfolio — JavaScript
   Hamburger menu, smooth-scroll nav, hero entrance animation, active-link
   highlighting via IntersectionObserver, form submit UX, resume download.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Element references ──────────────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobile-nav');
  const hero        = document.querySelector('.hero');
  const form        = document.getElementById('contact-form');
  const submitBtn   = document.getElementById('submitBtn');
  const resumeBtn   = document.getElementById('resume-btn');
  const resumeBtnM  = document.getElementById('resume-btn-mobile');
  const navLinks    = document.querySelectorAll('.nav__links a:not(.nav__resume)');
  const mobileLinks = document.querySelectorAll('.nav__mobile a:not(.nav__resume)');
  const allNavLinks = [...navLinks, ...mobileLinks];
  const sections    = document.querySelectorAll('section[id]');

  /* ── Hamburger toggle ────────────────────────────────────────────────── */
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      // Prevent body scroll when menu is open
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is tapped
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Smooth scroll on nav click ──────────────────────────────────────── */
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        // Update active state immediately
        allNavLinks.forEach(l => l.classList.remove('active'));
        // Activate both desktop and mobile links for this section
        allNavLinks.filter(l => l.getAttribute('href') === href)
          .forEach(l => l.classList.add('active'));
      }
    });
  });

  /* ── Active nav highlighting (IntersectionObserver) ──────────────────── */
  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -55% 0px', // fires when section is roughly in the top-middle
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          allNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  /* ── Hero entrance animation ─────────────────────────────────────────── */
  if (hero) {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show everything immediately
      hero.querySelector('.hero__content').style.opacity = '1';
      hero.querySelector('.hero__content').style.transform = 'none';
      const frame = hero.querySelector('.hero__photo-frame');
      if (frame) {
        frame.style.opacity = '1';
        frame.style.transform = 'none';
      }
    } else {
      // Trigger the CSS stagger animation
      requestAnimationFrame(() => {
        hero.classList.add('loaded');
      });
    }
  }

  /* ── Form submit UX ──────────────────────────────────────────────────── */
  if (form && submitBtn) {
    form.addEventListener('submit', () => {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    });
  }

  /* ── Resume download ─────────────────────────────────────────────────── */
  function downloadCV(e) {
    e.preventDefault();
    window.open('./images/OwnResume.pdf', '_blank');
  }

  if (resumeBtn)  resumeBtn.addEventListener('click', downloadCV);
  if (resumeBtnM) resumeBtnM.addEventListener('click', downloadCV);

});
