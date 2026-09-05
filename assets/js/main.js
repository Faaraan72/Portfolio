/* ==========================================================================
   FAARAAN ASKARI - PORTFOLIO INTERACTION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Menu Toggle (Mobile)
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('show-menu')) {
          icon.className = 'bx bx-x';
        } else {
          icon.className = 'bx bx-menu';
        }
      }
    });
  }

  // Close Mobile Menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('show-menu');
      const icon = navToggle ? navToggle.querySelector('i') : null;
      if (icon) icon.className = 'bx bx-menu';
    });
  });

  // Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const handleScrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollActive);

  // Project Category Filter Handler
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Auto-play videos on hover / touch & reset to poster on mouseleave
  const mediaContainers = document.querySelectorAll('.project-card__media');
  mediaContainers.forEach(container => {
    const video = container.querySelector('video');
    if (!video) return;

    container.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    container.addEventListener('mouseleave', () => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
      video.load(); // Forces browser to restore the poster/preview image
    });
  });
});
