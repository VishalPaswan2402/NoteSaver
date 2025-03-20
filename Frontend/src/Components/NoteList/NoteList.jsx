import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NoteList(props) {

    return (
        <>
            <div className='bg-blue-100 border-1 flex min-w-2xl m-auto mt-3 p-2 hover:bg-blue-200 rounded-lg'>
                <div className='flex w-full  cursor-pointer'>
                    <div className=' w-7/1 p-1'>
                        <p className='font-semibold text-rose-800'>{props.name}</p>
                        <p className='text-gray-600'>{props.desc}</p>
                    </div>
                    <div className='w-3/1 justify-center place-content-evenly '>
                        <Link to={`/v1/view-note/${props.uid}`}><button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-eye"></i></button></Link>
                        <Link to="/v1/edit-page"><button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-pencil"></i></button></Link>
                        <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-trash"></i></button>
                        <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-share-nodes"></i></button>
                        <p className='font-xs p-1 text-rose-800'>{props.date}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
