document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.scroll-container');
    const projectsSection = document.getElementById('projects');
    const backToTopBtn = document.getElementById('backToTop');

    // Disable manual scrolling by user
    scrollContainer.addEventListener('wheel', e => e.preventDefault(), { passive: false });
    scrollContainer.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    scrollContainer.addEventListener('keydown', e => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (keys.includes(e.key)) e.preventDefault();
    });

    // JS-based scroll detection
    scrollContainer.addEventListener('scroll', checkScroll);

    function checkScroll() {
      const scrollPosition = scrollContainer.scrollTop;
      const windowHeight = scrollContainer.clientHeight;

      if (scrollPosition >= windowHeight * 0.9) {
        projectsSection.classList.add('visible');
      }

      if (scrollPosition > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    }

    document.querySelector('.scroll-to-projects').addEventListener('click', function (e) {
      e.preventDefault();
      projectsSection.classList.add('visible');
      projectsSection.scrollIntoView({
        behavior: 'smooth'
      });
    });

    backToTopBtn.addEventListener('click', function () {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    checkScroll();
  });