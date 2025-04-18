import React, { forwardRef } from 'react'
import './PrintNote.css';

export const PrintNote = forwardRef((props, ref) => {
    return (
        <div className='print-container' ref={ref}>
            <p className='font-semibold text-rose-900 font-para text-lg mb-2 text-center'>{props.name}</p>
            <p className='text-gray-600 font-para text-md'>{props.description}</p>
        </div>
    );
});
