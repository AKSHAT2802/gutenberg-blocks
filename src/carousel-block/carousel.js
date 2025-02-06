document.addEventListener( 'DOMContentLoaded', function () {
	const track = document.querySelector( '.carousel-track' );
	const slides = document.querySelectorAll( '.carousel-slide' );
	const prevButton = document.querySelector( '.carousel-prev' );
	const nextButton = document.querySelector( '.carousel-next' );
	const dotsContainer = document.querySelector( '.carousel-dots' );

	let currentIndex = 0;
	let slidesPerView = getSlidesPerView();
	let autoSlideInterval;

	// Clear existing dots
	dotsContainer.innerHTML = '';

	// Create correct number of dots
	const totalDots = Math.ceil( slides.length / slidesPerView );
	for ( let i = 0; i < totalDots; i++ ) {
		const dot = document.createElement( 'span' );
		dot.className = 'dot' + ( i === 0 ? ' current-dot' : '' );
		dot.addEventListener( 'click', () => goToSlide( i ) );
		dotsContainer.appendChild( dot );
	}

	function getSlidesPerView() {
		if ( window.innerWidth <= 480 ) {
			return 1;
		}
		if ( window.innerWidth <= 768 ) {
			return 2;
		}
		return 3;
	}

	function updateCarousel() {
		const slideWidth = 100 / slidesPerView;
		track.style.transform = `translateX(-${ currentIndex * slideWidth }%)`;

		const dots = document.querySelectorAll( '.dot' );
		dots.forEach( ( dot, index ) => {
			dot.classList.toggle(
				'current-dot',
				index === Math.floor( currentIndex / slidesPerView )
			);
		} );
	}

	function goToSlide( index ) {
		currentIndex = index * slidesPerView;
		updateCarousel();
	}

	function nextSlide() {
		const maxIndex = slides.length - slidesPerView;
		currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
		updateCarousel();
	}

	function prevSlide() {
		const maxIndex = slides.length - slidesPerView;
		currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
		updateCarousel();
	}

	function startAutoSlide() {
		stopAutoSlide();
		autoSlideInterval = setInterval( nextSlide, 3000 ); // Change slide every 3 seconds
	}

	function stopAutoSlide() {
		if ( autoSlideInterval ) {
			clearInterval( autoSlideInterval );
		}
	}

	prevButton.addEventListener( 'click', () => {
		prevSlide();
		stopAutoSlide();
	} );

	nextButton.addEventListener( 'click', () => {
		nextSlide();
		stopAutoSlide();
	} );

	window.addEventListener( 'resize', () => {
		const newSlidesPerView = getSlidesPerView();
		if ( newSlidesPerView !== slidesPerView ) {
			slidesPerView = newSlidesPerView;
			// Recalculate dots
			dotsContainer.innerHTML = '';
			for ( let i = 0; i < totalDots; i++ ) {
				const dot = document.createElement( 'span' );
				dot.className = 'dot' + ( i === 0 ? ' current-dot' : '' );
				dot.addEventListener( 'click', () => goToSlide( i ) );
				dotsContainer.appendChild( dot );
			}
			updateCarousel();
		}
	} );

	// Start autoslide
	startAutoSlide();

	// Stop autoslide on hover
	track.addEventListener( 'mouseenter', stopAutoSlide );
	track.addEventListener( 'mouseleave', startAutoSlide );
} );
