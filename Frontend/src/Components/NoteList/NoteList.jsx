import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteNote } from '../../Utility/DeleteNote.js'

export default function NoteList(props) {
    const currId = useSelector(state => state.notesaver.currentUserId);
    const [deleteOption, setDeleteOption] = useState(false);
    const [deleteText, setDeleteText] = useState("Delete");
    const [isDelete, setIsDelete] = useState(false);

    const handleDeleteOption = () => {
        setDeleteOption(prev => !prev);
    };

    const deleteSelectedNote = async (noteId, onDel) => {
        console.log("Del cli");
        setDeleteText("Deleting...");
        setIsDelete(true);
        await deleteNote(noteId, onDel, setDeleteText, setIsDelete);
    }

    return (
        <>
            <div className='bg-blue-100 border-1 flex min-w-2xl m-auto mt-3 p-2 hover:bg-blue-200 rounded-lg'>
                <div className='flex w-full  cursor-pointer'>
                    <div className=' w-7/1 p-1'>
                        <p className='font-semibold text-rose-900 font-para text-3xl'>{props.name.length > 30 ? props.name.slice(0, 30) + "..." : props.name}</p>
                        {
                            props.description.length > 50
                                ?
                                <>
                                    <p className='text-gray-600 font-para text-2xl'>{props.description.slice(0, 55)}...</p>
                                    <p className='text-gray-600 font-para text-2xl'>...{props.description.slice(props.description.length - 50, props.length)}</p>
                                </>
                                :
                                <p className='text-gray-600 font-para text-2xl'>{props.description}</p>
                        }
                    </div>
                    <div className='w-3/1 justify-center place-content-evenly '>
                        {
                            deleteOption
                                ?
                                <>
                                    <button disabled={isDelete} onClick={() => deleteSelectedNote(props.noteId, props.onDelete)} className={` ${isDelete ? "w-48" : "w-22"} cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:border-white hover:bg-red-400 hover:text-white`}>{deleteText} <i className="fa-solid fa-check"></i></button>
                                    {
                                        !isDelete
                                            ?
                                            <button disabled={isDelete} onClick={handleDeleteOption} className='w-22 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-white hover:border-white hover:bg-green-400'>Cancle <i className="fa-solid fa-xmark"></i></button>
                                            :
                                            null
                                    }
                                </>
                                :
                                <>
                                    <Link to={`/v1/view-note/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-eye"></i></button></Link>
                                    <Link to={`/v1/edit-page/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-pencil"></i></button></Link>
                                    <button onClick={handleDeleteOption} className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-trash"></i></button>
                                    <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-share-nodes"></i></button>
                                </>
                        }
                        <p className='font-xs p-1 text-rose-800 font-para text-lg font-bold'>{props.date}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
