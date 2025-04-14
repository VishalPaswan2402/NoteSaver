import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { markImportant } from '../../Utility/MarkImportant.js';
import { setAlertBox, setCurrentNoteArchive, setDisplayLinkBox, setDisplayShareOption, setSharedNoteId } from '../../ReduxSlice/SliceFunction.js';
import { toast } from 'react-toastify';
import { getRemainingDays } from '../../Utility/RemainingTime.js';
import { usePrintNote } from '../PrintNote/UsePrintNote.jsx';

export default function NoteList(props) {
    const frontendUrl = `http://localhost:5173`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idShared = useSelector(state => state.notesaver.sharedNoteId);
    const { printFn, HiddenPrintComponent } = usePrintNote(props.name, props.description);

    const handleDeleteOption = (noteid, archVal) => {
        dispatch(setCurrentNoteArchive(archVal));
        dispatch(setAlertBox(noteid));
    };

    const markAsImportant = async (id, onMark, isArch) => {
        console.log(id);
        if (isArch) {
            toast.error("Please restore your note first.");
            return;
        }
        await markImportant(id, navigate, onMark);
    }

    const handleShareCloneOption = (shareId) => {
        dispatch(setSharedNoteId(shareId));
        dispatch(setDisplayShareOption());
    }

    const openShareLinkBox = (id) => {
        dispatch(setSharedNoteId(id));
        dispatch(setDisplayLinkBox());
    }

    return (
        <>
            <HiddenPrintComponent />
            <div className='bg-[#ffadbd2c] border-2 border-[#D76C82] flex min-w-200 m-auto mb-5 p-2 hover:bg-[#ffadbd69] rounded-lg hover:border-[#B03052] hover:shadow-lg hover:shadow-[#d76c8192]' style={{ transition: '0.5s' }}>
                <div className='flex w-full'>
                    <div className=' w-[70%] p-1'>
                        <p className='font-semibold text-rose-900 font-para text-3xl'>{props.name.length > 30 ? props.name.slice(0, 30) + "..." : props.name}</p>
                        {
                            props.description.length > 110
                                ?
                                <>
                                    <p className='text-gray-600 font-para text-[20px]'>{props.description.slice(0, 60)}...</p>
                                    <p className='text-gray-600 font-para text-[20px]'>...{props.description.slice(props.description.length - 50, props.length)}</p>
                                </>
                                :
                                <>
                                    <p className='text-gray-600 font-para text-[20px]'>{props.description.slice(0, 60)}...</p>
                                </>

                        }
                        <p className='text-gray-600 font-para text-[20px]'>Read full note...</p>
                    </div>
                    <div className='w-[30%] justify-center place-content-evenly grid'>
                        <div className='flex flex-wrap justify-center'>

                            <Link to={`/v1/view-note/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-eye"></i></button></Link>
                            {
                                props.isArch
                                    ?
                                    null
                                    :
                                    <>
                                        <Link to={`/v1/edit-page/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-pencil"></i></button></Link>
                                        <button onClick={() => openShareLinkBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-share-nodes"></i></button>
                                        <button onClick={printFn} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-print"></i></button>
                                        <button onClick={() => handleShareCloneOption(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-clone"></i></button>
                                    </>
                            }
                            <button onClick={() => handleDeleteOption(props.noteId, props.isArch)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-trash"></i></button>
                            <button onClick={() => markAsImportant(props.noteId, props.onMark, props.isArch)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-${props.imp ? "solid" : "regular"} fa-heart`}></i></button>
                        </div>
                        <div className=' text-center'>
                            <p className='font-xs p-1 text-rose-800 font-para text-lg font-bold'>{props.archDate != null ? getRemainingDays(props.archDate) : props.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
