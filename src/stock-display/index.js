import './style.css';
import './editor.css';

import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType(
    'create-block/stock-display', {
        edit: Edit,
    } 
);
