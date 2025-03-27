import React, { useState } from 'react'
import './AddNew.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { addUpdateNote } from '../../Utility/AddUpdateNote'
import { deleteView } from '../../Utility/DeleteView'

export default function AddNew(props) {
    const backendUrl = "http://localhost:8080";
    const navigate = useNavigate();
    const editNoteId = props.editNoteId;
    const currentUserId = useSelector(state => state.notesaver.currentUserId);
    const [formActive, setFormActive] = useState(true);
    const currNoteId = useParams();
    const [deleteOption, setDeleteOption] = useState(false);
    const [deleteText, setDeleteText] = useState("Delete");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    let endpoint = null;
    const userId = useSelector(state => state.notesaver.currentUserId);

    if (props.editType == "newNote") {
        endpoint = `/v1/new-note/${userId}`;
    } else if (props.editType == "editNote") {
        endpoint = `/v1/edit-note/${editNoteId}`;
    }

    const onSubmit = async (data) => {
        setFormActive(false);
        await addUpdateNote(endpoint, data, navigate, setFormActive);
    }

    const handleDeleteOption = () => {
        setDeleteOption(prev => !prev);
    }

    const deleteViewNote = async (noteId, userId, navigate) => {
        setFormActive(false);
        setDeleteText("Deleting Note...");
        deleteView(noteId, userId, navigate, setFormActive, setDeleteText);
    }

    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            <div id='note-container' className='align-middle text-center'>
                <h1 className='text-2xl p-2 font-semibold text-rose-800 text-ost'>{props.heading} </h1>
                <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 focus:outline-blue-700 p-2 rounded-sm font-para text-2xl font-semibold' defaultValue={props.title} disabled={!props.edit ? true : !formActive}></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 focus:outline-blue-700 p-2 rounded-sm h-101 resize-none overflow-y-auto font-para text-2xl`} defaultValue={props.disc} disabled={!props.edit ? true : !formActive}></textarea>
                    {
                        props.edit
                            ?
                            (
                                <button disabled={!formActive} type='submit' className={`border-2 rounded-sm p-1 mb-1 cursor-pointer transition-all duration-200 text-black hover:text-white
                                    ${formActive
                                        ? "bg-blue-400 hover:bg-blue-600 border-blue-600 hover:border-white"
                                        : "bg-blue-600 border-white text-white cursor-wait"
                                    }`}>
                                    {
                                        formActive
                                            ?
                                            props.btnName
                                            :
                                            "Processing..."
                                    }
                                </button>
                            )
                            :
                            (
                                deleteOption
                                    ?
                                    <div className='grid grid-flow-col grid-rows-1 gap-10'>
                                        <button disabled={!formActive} onClick={() => deleteViewNote(currNoteId.id, currentUserId, navigate)} type='btn' className='border-2 bg-blue-400 rounded-sm p-1 mb-1 border-blue-600 hover:border-white hover:text-white cursor-pointer hover:bg-red-400'>{deleteText} <i className="fa-solid fa-check cursor-pointer"></i></button>
                                        <button disabled={!formActive} onClick={handleDeleteOption} type='btn' className='border-2 bg-blue-400 rounded-sm p-1 mb-1 border-blue-600 hover:border-white hover:text-white cursor-pointer hover:bg-green-400'>Cancle <i className="fa-solid fa-xmark cursor-pointer"></i></button>
                                    </div>
                                    :
                                    <div className='grid grid-flow-col grid-rows-1 gap-10'>
                                        <Link to={`/v1/edit-page/${currNoteId.id}`} className='border-2 bg-blue-400 hover:bg-blue-600 rounded-sm p-1 mb-1 border-blue-600 hover:border-white hover:text-white cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-pencil increaseScze cursor-pointer"></i></button></Link>
                                        <Link to="/v1/edit-page" className='border-2 bg-blue-400 hover:bg-blue-600 rounded-sm p-1 mb-1 border-blue-600 hover:border-white hover:text-white cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-share-nodes increaseScze cursor-pointer"></i></button></Link>
                                        <Link to="/v1/edit-page" className='border-2 bg-blue-400 hover:bg-blue-600 rounded-sm p-1 mb-1 border-blue-600 hover:border-white hover:text-white cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-print increaseScze cursor-pointer"></i></button></Link>
                                        <div onClick={handleDeleteOption} className='border-2 bg-blue-400 hover:bg-blue-600 rounded-sm p-1 mb-1 border-blue-600 hover:border-white hover:text-white cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-trash increaseScze cursor-pointer"></i></button></div>
                                    </div>
                            )
                    }
                </form>
            </div>
        </>
    )
}
