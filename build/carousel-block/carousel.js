/******/ (() => { // webpackBootstrap
/*!****************************************!*\
  !*** ./src/carousel-block/carousel.js ***!
  \****************************************/
document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    // Get settings from data attributes
    const autoplay = carousel.getAttribute('data-autoplay') === 'true';
    const autoplaySpeed = parseInt(carousel.getAttribute('data-autoplay-speed') || 3000);
    const pauseOnHover = carousel.getAttribute('data-pause-on-hover') === 'true';
    const infiniteLoop = carousel.getAttribute('data-infinite-loop') === 'true';
    // showArrows and showDots are handled by the existence of elements in save.js

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let autoSlideInterval;

    // Only set up dots if they exist
    if (dotsContainer) {
      // Clear existing dots
      dotsContainer.innerHTML = '';

      // Create correct number of dots
      const totalDots = Math.ceil(slides.length / slidesPerView);
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' current-dot' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
    function getSlidesPerView() {
      if (window.innerWidth <= 480) {
        return 1;
      }
      if (window.innerWidth <= 768) {
        return 2;
      }
      return 3;
    }
    function updateCarousel() {
      const slideWidth = 100 / slidesPerView;
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('current-dot', index === Math.floor(currentIndex / slidesPerView));
        });
      }
    }
    function goToSlide(index) {
      currentIndex = index * slidesPerView;
      updateCarousel();
    }
    function nextSlide() {
      const maxIndex = slides.length - slidesPerView;
      if (infiniteLoop) {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      } else {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
      }
      updateCarousel();
    }
    function prevSlide() {
      const maxIndex = slides.length - slidesPerView;
      if (infiniteLoop) {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      } else {
        currentIndex = Math.max(0, currentIndex - 1);
      }
      updateCarousel();
    }
    function startAutoSlide() {
      if (!autoplay) return;
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, autoplaySpeed);
    }
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    }

    // Add event listeners only if the navigation buttons exist
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        prevSlide();
        if (autoplay) stopAutoSlide();
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        nextSlide();
        if (autoplay) stopAutoSlide();
      });
    }
    window.addEventListener('resize', () => {
      const newSlidesPerView = getSlidesPerView();
      if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;

        // Recalculate dots only if dotsContainer exists
        if (dotsContainer) {
          const totalDots = Math.ceil(slides.length / slidesPerView);
          dotsContainer.innerHTML = '';
          for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' current-dot' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
          }
        }
        updateCarousel();
      }
    });

    // Start autoslide if enabled
    startAutoSlide();

    // Stop autoslide on hover if that option is enabled
    if (pauseOnHover && autoplay) {
      track.addEventListener('mouseenter', stopAutoSlide);
      track.addEventListener('mouseleave', startAutoSlide);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=carousel.js.map