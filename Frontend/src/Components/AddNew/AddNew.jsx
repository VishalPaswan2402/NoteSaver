import React from 'react'
import './AddNew.css'

export default function AddNew(props) {
    

    return (
        <>
            <div id='note-container' className='align-middle text-center'>
                <h1 className='text-2xl p-2 text-blue-950 font-semibold '>Add Your New Note</h1>
                <div id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input type='text' placeholder='Enter title' className='outline-2 focus:outline-2 focus:outline-blue-700 p-2 rounded-lg'></input>
                    <textarea id='note-area' type='text' placeholder='Enter description' className='outline-2 focus:outline-2 focus:outline-blue-700 p-2 rounded-lg h-101 resize-none overflow-y-auto '></textarea>
                    <button type='btn' className='border-2 bg-blue-400 hover:bg-blue-600 rounded-lg p-1 mb-1 border-blue-600 hover:border-blue-400 hover:text-white cursor-pointer'>Save note</button>
                </div>
            </div>
        </>
    )
}
