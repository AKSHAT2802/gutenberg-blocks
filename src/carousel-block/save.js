import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } )
{
    const { slides } = attributes;

    return (
    <div { ...useBlockProps.save() } className="carousel">
    { /* Navigation Buttons */ }
    <button className="carousel-prev">&lt;</button>
    <div className="carousel-track">
                { slides.map(
                    ( slide, index ) => (
                    <div className="carousel-slide" key={ index }>
                    <img
                    src={ slide.imageUrl }
                    alt={ `Slide ${ index + 1 }` }
                    />
                    <div className="carousel-overlay">
                    <h2>{ slide.bigText }</h2>
                    <p>{ slide.smallText }</p>
                    </div>
                    </div>
                    ) 
                ) }
    </div>
    <button className="carousel-next">&gt;</button>

    { /* Dots Navigation */ }
    <div className="carousel-dots">
                { slides.map(
                    ( _, index ) => (
                    <span
                    key={ index }
                    className={ `dot ${
                        index === 0 ? 'current-dot' : ''
                        }` }
                    ></span>
                    ) 
                ) }
    </div>
    </div>
    );
}
