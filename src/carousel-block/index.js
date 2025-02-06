import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import './editor.css';
import './style.css';

registerBlockType(
    'create-block/carousel-block', {
            edit,
            save,
    } 
);
