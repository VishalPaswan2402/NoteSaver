import React from 'react'

export default function NoteList(props) {

    return (
        <>
            <div className='bg-blue-100 border-1 flex max-w-2xl m-auto mt-3 p-2 hover:bg-blue-200 rounded-lg'>
                <div className='flex w-full   cursor-pointer'>
                    <div className=' w-7/1 p-1'>
                        <p className='font-semibold text-rose-800'>Note {props.name}</p>
                        <p className='text-gray-600'>
                            description of note ...description of note ...description of note ...description of note ...description of note ...description of note
                        </p>
                    </div>
                    <div className='w-3/1 justify-center place-content-evenly '>
                        <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-eye"></i></button>
                        <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-pencil"></i></button>
                        <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-trash"></i></button>
                        <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-share-nodes"></i></button>
                        <p className='font-xs p-1 text-rose-800'>{new Date().toDateString()}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
