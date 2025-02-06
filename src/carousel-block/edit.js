import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    ToggleControl,
    RangeControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } )
{
    const {
        slides = [],
        autoplay,
        autoplaySpeed,
        pauseOnHover,
        infiniteLoop,
        showArrows,
        showDots,
    } = attributes;

    const blockProps = useBlockProps(
        {
            className: 'carousel',
        } 
    );

    // Function to update a specific slide's attributes
    const updateSlide = ( index, field, value ) => {
        const updatedSlides = [ ...slides ];
        updatedSlides[ index ] = {
            ...updatedSlides[ index ],
            [ field ]: value,
        };
        setAttributes({ slides: updatedSlides });
    };

    // Function to add a new slide
    const addSlide = () => {
        const newSlide = { imageUrl: '', bigText: '', smallText: '' };
        setAttributes({ slides: [ ...slides, newSlide ] });
    };

    // Function to remove a slide
    const removeSlide = ( index ) => {
        const updatedSlides = slides.filter(( _, i ) => i !== index);
        setAttributes({ slides: updatedSlides });
    };

    return (
    <Fragment>
    <InspectorControls>
                <PanelBody title="Carousel Settings" initialOpen={ true }>
                    <ToggleControl
                        label="Autoplay"
                        checked={ autoplay }
                        onChange={ ( value ) =>
                            setAttributes({ autoplay: value })
                        }
                    />
                    { autoplay && (
                        <RangeControl
                        label="Autoplay Speed (ms)"
                        value={ autoplaySpeed }
                        onChange={ ( value ) =>
                            setAttributes({ autoplaySpeed: value })
                    }
                    min={ 1000 }
                    max={ 10000 }
                    step={ 500 }
                    />
                    ) }
                    <ToggleControl
                        label="Pause on Hover"
                        checked={ pauseOnHover }
                        onChange={ ( value ) =>
                            setAttributes({ pauseOnHover: value })
                        }
                    />
                    <ToggleControl
                        label="Infinite Loop"
                        checked={ infiniteLoop }
                        onChange={ ( value ) =>
                            setAttributes({ infiniteLoop: value })
                        }
                    />
                    <ToggleControl
                        label="Show Arrows"
                        checked={ showArrows }
                        onChange={ ( value ) =>
                            setAttributes({ showArrows: value })
                        }
                    />
                    <ToggleControl
                        label="Show Dots"
                        checked={ showDots }
                        onChange={ ( value ) =>
                            setAttributes({ showDots: value })
                        }
                    />
                </PanelBody>
                <PanelBody title="Slides" initialOpen={ true }>
                    { slides.map(
                        ( slide, index ) => (
                        <PanelBody
                        key={ index }
                        title={ `Slide ${ index + 1 }` }
                        initialOpen={ false }
                        >
                        <TextControl
                        label="Image URL"
                        value={ slide.imageUrl }
                        onChange={ ( value ) =>
                            updateSlide(index, 'imageUrl', value)
                                }
                        />
                        <TextControl
                                label="Big Text"
                                value={ slide.bigText }
                                onChange={ ( value ) =>
                                    updateSlide(index, 'bigText', value)
                                }
                        />
                        <TextControl
                                label="Small Text"
                                value={ slide.smallText }
                                onChange={ ( value ) =>
                                    updateSlide(index, 'smallText', value)
                                }
                        />
                        <Button
                                variant="secondary"
                                onClick={ () => removeSlide(index) }
                                style={ { marginTop: '10px' } }
                        >
                                Remove Slide
                        </Button>
                        </PanelBody>
                        ) 
                    ) }
                    <Button
                        variant="primary"
                        onClick={ addSlide }
                        style={ { marginTop: '20px' } }
                    >
                        Add Slide
                    </Button>
                </PanelBody>
    </InspectorControls>

    <div { ...blockProps }>
                <div className="carousel-track">
                    { slides.length > 0 ? (
                        slides.map(
                            ( slide, index ) => (
                            <div className="carousel-slide" key={ index }>
                            { slide.imageUrl && (
                                <img
                                src={ slide.imageUrl }
                                alt={
                                    slide.bigText ||
                                    `Slide ${ index + 1 }`
                            }
                            className="carousel-image"
                            />
                            ) }
                            <div className="carousel-overlay">
                            { slide.bigText && (
                                <h2>{ slide.bigText }</h2>
                            ) }
                            { slide.smallText && (
                                <p>{ slide.smallText }</p>
                            ) }
                            </div>
                            </div>
                            ) 
                        )
                    ) : (
                        <p>
                            No slides added. Use the settings panel to add
                            slides.
                        </p>
                    ) }
                </div>
    </div>
    </Fragment>
    );
}
