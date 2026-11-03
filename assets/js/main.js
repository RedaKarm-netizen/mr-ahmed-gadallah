/**
 * Ahmed Gadallah English Academy - Main JavaScript
 * Lightweight, accessible, responsive, and robust
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mark JS as ready
  document.documentElement.classList.add('js-ready');

  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileBtn && mobileNav) {
    const toggleMenu = () => {
      const isOpen = mobileNav.classList.contains('open');
      mobileBtn.classList.toggle('open', !isOpen);
      mobileNav.classList.toggle('open', !isOpen);
      mobileBtn.setAttribute('aria-expanded', String(!isOpen));
    };

    mobileBtn.addEventListener('click', toggleMenu);

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Scroll Reveal Animation with Safety Fallbacks
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '60px 0px 60px 0px',
      threshold: 0.05
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Safety Fallback: after 800ms, reveal any element that hasn't triggered yet
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => el.classList.add('active'));
  }, 800);

  // 4. FAQ Accordion (100% Guaranteed Visible & Smooth)
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    // Open the first question by default so it's immediately useful and clearly interactive
    const firstItem = faqItems[0];
    const firstBtn = firstItem.querySelector('.faq-question');
    const firstAns = firstItem.querySelector('.faq-answer');
    if (firstItem && firstBtn && firstAns) {
      firstItem.classList.add('active');
      firstBtn.setAttribute('aria-expanded', 'true');
      firstAns.style.maxHeight = firstAns.scrollHeight + 30 + 'px';
    }

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (questionBtn && answer) {
        questionBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const isCurrentlyOpen = item.classList.contains('active');

          if (isCurrentlyOpen) {
            item.classList.remove('active');
            questionBtn.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0px';
          } else {
            item.classList.add('active');
            questionBtn.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
          }
        });
      }
    });

    // Adjust maxHeight on window resize for any open accordion items
    window.addEventListener('resize', () => {
      document.querySelectorAll('.faq-item.active .faq-answer').forEach(ans => {
        ans.style.maxHeight = ans.scrollHeight + 30 + 'px';
      });
    }, { passive: true });
  }

  // 5. Image Lightbox for Testimonials
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const zoomTriggers = document.querySelectorAll('[data-zoomable]');

  if (lightbox && lightboxImg && lightboxClose) {
    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'صورة مكبرة';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };

    zoomTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const img = trigger.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
      });

      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', 'button');
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const img = trigger.querySelector('img');
          if (img) openLightbox(img.src, img.alt);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // 6. Smooth Scroll with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
