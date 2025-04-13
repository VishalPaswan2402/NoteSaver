import React, { forwardRef } from 'react'
import './PrintNote.css';

export const PrintNote = forwardRef((props, ref) => {
    return (
        <div className='print-container' ref={ref}>
            <p className='font-semibold text-rose-900 font-para text-3xl mb-5 text-center ml-15 mr-15'>{props.name}</p>
            <p className='text-gray-600 font-para text-[20px] whitespace-pre-wrap ml-15 mr-15'>{props.description}</p>
        </div>
    );
});
