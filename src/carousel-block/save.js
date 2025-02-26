import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        slides, 
        autoplay, 
        autoplaySpeed, 
        pauseOnHover, 
        infiniteLoop, 
        showArrows, 
        showDots 
    } = attributes;

    // Build data attributes to pass settings to frontend JS
    const dataAttributes = {
        'data-autoplay': autoplay ? 'true' : 'false',
        'data-autoplay-speed': autoplaySpeed,
        'data-pause-on-hover': pauseOnHover ? 'true' : 'false',
        'data-infinite-loop': infiniteLoop ? 'true' : 'false',
        'data-show-arrows': showArrows ? 'true' : 'false',
        'data-show-dots': showDots ? 'true' : 'false'
    };

    return (
        <div {...useBlockProps.save()} className="carousel" {...dataAttributes}>
            {/* Navigation Buttons - only render if showArrows is true */}
            {showArrows && (
                <>
                    <button className="carousel-prev">&lt;</button>
                    <button className="carousel-next">&gt;</button>
                </>
            )}
            
            <div className="carousel-track">
                {slides.map((slide, index) => (
                    <div className="carousel-slide" key={index}>
                        <img
                            src={slide.imageUrl}
                            alt={slide.bigText || `Slide ${index + 1}`}
                        />
                        <div className="carousel-overlay">
                            {slide.bigText && <h2>{slide.bigText}</h2>}
                            {slide.smallText && <p>{slide.smallText}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Navigation - only render if showDots is true */}
            {showDots && (
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === 0 ? 'current-dot' : ''}`}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
}