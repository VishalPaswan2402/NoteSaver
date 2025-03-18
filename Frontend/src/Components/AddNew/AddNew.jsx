import React from 'react'
import './AddNew.css'
import { Link } from 'react-router-dom'

export default function AddNew(props) {
    return (
        <>
            <div id='note-container' className='align-middle text-center'>
                <h1 className='text-2xl p-2 font-semibold text-rose-800'>{props.heading} </h1>
                <div id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input type='text' placeholder='Enter title' className='outline-2 focus:outline-2 focus:outline-blue-700 p-2 rounded-lg' defaultValue={props.title} disabled={!props.edit}></input>
                    <textarea id='note-area' type='text' placeholder='Enter description' className={`outline-2 focus:outline-2 focus:outline-blue-700 p-2 rounded-lg h-101 resize-none overflow-y-auto`} defaultValue={props.disc} disabled={!props.edit}></textarea>
                    {
                        props.edit
                            ?
                            (
                                <button type='btn' className='border-2 bg-blue-400 hover:bg-blue-600 rounded-lg p-1 mb-1 border-blue-600 hover:border-blue-400 hover:text-white cursor-pointer'> {props.btnName} </button>
                            )
                            :
                            (
                                <div className='grid grid-flow-col grid-rows-1 gap-10'>
                                    <Link to="/v1/edit-page" className='border-2 bg-blue-400 hover:bg-blue-600 rounded-lg p-1 pl-3 pr-3 mb-1 border-blue-600 hover:border-blue-400 hover:text-white cursor-pointer'><button type='btn'>Edit</button></Link>
                                    <Link to="/v1/edit-page" className='border-2 bg-blue-400 hover:bg-blue-600 rounded-lg p-1 pl-3 pr-3 mb-1 border-blue-600 hover:border-blue-400 hover:text-white cursor-pointer'><button type='btn'>Delete</button></Link>
                                    <Link to="/v1/edit-page" className='border-2 bg-blue-400 hover:bg-blue-600 rounded-lg p-1 pl-3 pr-3 mb-1 border-blue-600 hover:border-blue-400 hover:text-white cursor-pointer'><button type='btn'>Share</button></Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}
