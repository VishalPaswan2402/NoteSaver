import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteNote } from '../../Utility/DeleteNote.js'
import { useReactToPrint } from "react-to-print";
import { markImportant } from '../../Utility/MarkImportant.js';
import { setAlertBox } from '../../ReduxSlice/SliceFunction.js';

export default function NoteList(props) {
    const currId = useSelector(state => state.notesaver.currentUserId);
    const [deleteOption, setDeleteOption] = useState(false);
    const [deleteText, setDeleteText] = useState("Delete");
    const [archiveText, setArchiveText] = useState("Archive");
    const [isDelete, setIsDelete] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const deletebox = useSelector(state => state.notesaver.showAlertBox);
    const deleteNoteId = useSelector(state => state.notesaver.currentNoteId);

    const handleDeleteOption = (noteid) => {
        dispatch(setAlertBox(noteid));
        setDeleteOption(prev => !prev);
    };

    const markAsImportant = async (id, onMark) => {
        await markImportant(id, navigate, onMark);
    }

    const handleArchive = () => {
        console.log("Clicked archive");
    }

    return (
        <>
            <div className='bg-blue-100 border-1 flex min-w-200 m-auto mt-3 mb-2 p-2 hover:bg-blue-200 rounded-lg'>
                <div className='flex w-full'>
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
                    <div className='w-3/1 justify-center place-content-evenly grid'>
                        <div className='flex flex-wrap justify-center'>
                            <Link to={`/v1/view-note/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-eye"></i></button></Link>
                            <Link to={`/v1/edit-page/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-pencil"></i></button></Link>
                            <button onClick={() => handleDeleteOption(props.noteId)} className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-trash"></i></button>
                            <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-share-nodes"></i></button>
                            <button className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className="fa-solid fa-print"></i></button>
                            <button onClick={() => markAsImportant(props.noteId, props.onMark)} className='w-10 cursor-pointer border-2 border-gray-400 rounded-lg p-2 m-1 text-gray-600 hover:text-black hover:border-black hover:bg-white'><i className={`fa-${props.imp ? "solid" : "regular"} fa-heart`}></i></button>
                        </div>
                        <div className=' text-center'>
                            <p className='font-xs p-1 text-rose-800 font-para text-lg font-bold'>{props.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
