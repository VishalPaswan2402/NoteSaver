import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { markImportant } from '../../Utility/MarkImportant.js';
import { setAlertBox, setAnyChangeHappen, setChangeEditOption, setCloneId, setCurrentNoteArchive, setDisplayLinkBox, setDisplayShareOption, setMergeOptionBox, setSharedNoteId } from '../../ReduxSlice/SliceFunction.js';
import { toast } from 'react-toastify';
import { getRemainingDays } from '../../Utility/RemainingTime.js';
import { usePrintNote } from '../PrintNote/UsePrintNote.jsx';
import axios from 'axios';

export default function NoteList(props) {
    const backendUrl = "http://localhost:8080";
    const frontendUrl = `http://localhost:5173`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const idShared = useSelector(state => state.notesaver.sharedNoteId);
    const { printFn, HiddenPrintComponent } = usePrintNote(props.name, props.description);

    const handleDeleteOption = (noteid, archVal) => {
        dispatch(setCurrentNoteArchive(archVal));
        dispatch(setAlertBox(noteid));
    };

    const markAsImportant = async (id) => {
        await markImportant(id, navigate, dispatch);
    }

    const handleShareCloneOption = (shareId) => {
        dispatch(setSharedNoteId(shareId));
        dispatch(setDisplayShareOption());
    }

    const openShareLinkBox = (id) => {
        dispatch(setSharedNoteId(id));
        dispatch(setDisplayLinkBox());
    }

    const openShareEditBox = (id) => {
        dispatch(setChangeEditOption(true));
        dispatch(setSharedNoteId(id));
    }

    const showMergeBox = (id) => {
        dispatch(setMergeOptionBox(true));
        dispatch(setCloneId(id));
    }

    return (
        <>
            <HiddenPrintComponent />
            <div className='bg-[#ffadbd2c] sm:w-140 md:w-160 w-80 border-2 border-[#D76C82] flex lg:w-200 m-auto mb-5 p-2 lightPinkButton btnColor rounded-lg hover:border-[#B03052] hover:shadow-lg hover:shadow-[#d76c8192]' style={{ transition: '0.5s' }}>
                <div className='lg:flex md:grid sm:grid grid md:w-200 sm:w-200 lg:w-200'>
                    {/* <div className='bg-green-200 lg:w-[70%] w-[100%] p-1'> */}
                    <div className='lg:w-[70%] p-1'>
                        <p className='font-semibold text-rose-900 font-para text-2xl'>{props.name.length > 30 ? props.name.slice(0, 30) + "..." : props.name}</p>
                        {
                            props.description.length > 150
                                ?
                                <>
                                    <p className='text-gray-600 font-para text-md'>{props.description.slice(0, 150)}...</p>
                                    {/* <p className='text-gray-600 font-para text-md'>...{props.description.slice(props.description.length - 50, props.length)}</p> */}
                                </>
                                :
                                <>
                                    <p className='text-gray-600 font-para text-md'>{props.description}...</p>
                                </>
                        }
                        <p className='text-gray-600 font-para text-md'>Read full note...</p>
                        <div className='lg:hidden  text-center'>
                            <p className='p-1 text-rose-800 font-para text-md'>{props.archDate != null ? getRemainingDays(props.archDate) : props.date}</p>
                        </div>
                    </div>

                    {/* duplicate option */}
                    <div className='lg:w-[30%] flex justify-center place-content-evenly '>
                        <div className='flex flex-wrap justify-center'>
                            <Link to={`/v1/view-note/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-eye"></i></button></Link>
                            {
                                props.isArch
                                    ?
                                    null
                                    :
                                    <>
                                        <Link to={`/v1/edit-page/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-pencil"></i></button></Link>
                                        {
                                            props.isOriginal
                                                ?
                                                <>
                                                    <button onClick={() => openShareLinkBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-share-nodes"></i></button>
                                                    <button onClick={printFn} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-print"></i></button>
                                                    <button onClick={() => handleShareCloneOption(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-link"></i></button>
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            (props.isEditable && props.isOriginal)
                                                ?
                                                <button onClick={() => openShareEditBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-solid fa-ban`}></i></button>
                                                :
                                                (!props.isOriginal)
                                                    ?
                                                    <button onClick={() => showMergeBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-solid fa-layer-group`}></i></button>
                                                    :
                                                    null
                                        }
                                    </>
                            }
                            <button onClick={() => handleDeleteOption(props.noteId, props.isArch)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-trash"></i></button>
                            <button onClick={() => markAsImportant(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-${props.imp ? "solid" : "regular"} fa-heart`}></i></button>
                            <div className='text-center lg:flex hidden'>
                                <p className='p-1 text-rose-800 font-para text-md'>{props.archDate != null ? getRemainingDays(props.archDate) : props.date}</p>
                            </div>
                        </div>
                    </div>
                    {/* duplicate option */}
                    {/* </div> */}

                    {/* main option */}
                    {/* <div className='w-[30%] justify-center place-content-evenly lg:grid hidden '>
                        <div className='flex flex-wrap justify-center'>
                            <Link to={`/v1/view-note/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-eye"></i></button></Link>
                            {
                                props.isArch
                                    ?
                                    null
                                    :
                                    <>
                                        <Link to={`/v1/edit-page/${props.noteId}`}><button className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-pencil"></i></button></Link>
                                        {
                                            props.isOriginal
                                                ?
                                                <>
                                                    <button onClick={() => openShareLinkBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-share-nodes"></i></button>
                                                    <button onClick={printFn} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-print"></i></button>
                                                    <button onClick={() => handleShareCloneOption(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-link"></i></button>
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            (props.isEditable && props.isOriginal)
                                                ?
                                                <button onClick={() => openShareEditBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-solid fa-ban`}></i></button>
                                                :
                                                (!props.isOriginal)
                                                    ?
                                                    <button onClick={() => showMergeBox(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-solid fa-layer-group`}></i></button>
                                                    :
                                                    null
                                        }
                                    </>
                            }
                            <button onClick={() => handleDeleteOption(props.noteId, props.isArch)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className="fa-solid fa-trash"></i></button>
                            <button onClick={() => markAsImportant(props.noteId)} className='w-10 cursor-pointer border-2 border-[#D76C82] rounded-lg p-2 m-1 text-[#B03052] hover:text-[#3D0301] hover:border-[#B03052] hover:bg-[#EBE8DB]'><i className={`fa-${props.imp ? "solid" : "regular"} fa-heart`}></i></button>
                        </div>
                        <div className=' text-center'>
                            <p className='p-1 text-rose-800 font-para text-md'>{props.archDate != null ? getRemainingDays(props.archDate) : props.date}</p>
                        </div>
                    </div> */}
                    {/* main option */}

                </div>
            </div>
        </>
    )
}
