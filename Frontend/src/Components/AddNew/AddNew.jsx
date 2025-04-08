import React, { useEffect, useState } from 'react'
import './AddNew.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { addUpdateNote } from '../../Utility/AddUpdateNote'
import { setAlertBox, setCurrentNoteArchive, setCurrentUserId, setViewPageDelete } from '../../ReduxSlice/SliceFunction'

export default function AddNew(props) {
    const frontendUrl = `http://localhost:5173`;
    const navigate = useNavigate();
    const editNoteId = props.editNoteId;
    const [formActive, setFormActive] = useState(true);
    const currNoteId = useParams();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    let endpoint = null;
    const userId = useSelector(state => state.notesaver.currentUserId);

    const onSubmit = async (data) => {
        if (props.editType == "newNote") {
            endpoint = `/v1/new-note/${userId}`;
        } else if (props.editType == "editNote") {
            endpoint = `/v1/edit-note/${editNoteId}`;
        }
        setFormActive(false);
        await addUpdateNote(endpoint, data, navigate, setFormActive);
    }

    const handleDeleteOption = (id, isArc) => {
        dispatch(setCurrentNoteArchive(isArc));
        dispatch(setAlertBox(id));
        dispatch(setViewPageDelete(true));
    }

    const copyURLtoClipboard = (id) => {
        const copyUrl = `${frontendUrl}/v1/view-note/${id}`;
        navigator.clipboard.writeText(copyUrl)
            .then(() => toast.success("URL copied to clipboard."))
            .catch(err => toast.error("Something went wrong"));
    }

    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            <div id='note-container' className='align-middle text-center'>
                <h1 className='font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>{props.heading} </h1>
                <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 text-[#B03052] rounded-sm font-para text-2xl font-semibold' defaultValue={props.title} disabled={!props.edit ? true : !formActive}></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 outline-[#D76C82] text-[#B03052] focus:outline-[#3D0301] p-2 rounded-sm ${!isAuthenticated ? 'h-110 mb-2' : 'h-98'} resize-none overflow-y-auto font-para text-2xl`} defaultValue={props.disc} disabled={!props.edit ? true : !formActive}></textarea>
                    {
                        props.edit
                            ?
                            (
                                <button disabled={!formActive} type='submit' className={`border-2 rounded-sm p-1 mb-1 cursor-pointer transition-all duration-200 bg-[#D76C82] text-[#EBE8DB] hover:bg-[#B03052] hover:border-[#3D0301] border-[#B03052]
                                    ${formActive
                                        ? "cursor-pointer"
                                        : "cursor-wait"
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
                            (null)
                    }
                </form>
                {
                    isAuthenticated
                        ?
                        (
                            !props.edit
                                ?
                                (
                                    props.isArch
                                        ?
                                        (<div className='grid grid-flow-col grid-rows-1 gap-10 max-w-2xl m-auto mt-3 mb-2'>
                                            <div onClick={() => handleDeleteOption(currNoteId.id, props.isArch)} className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-trash increaseScze cursor-pointer"></i></button></div>
                                        </div>
                                        )
                                        :
                                        (
                                            <div className='grid grid-flow-col grid-rows-1 gap-10 max-w-2xl m-auto mt-3 mb-2'>
                                                <Link to={`/v1/edit-page/${currNoteId.id}`} className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-pencil increaseScze cursor-pointer"></i></button></Link>
                                                <button onClick={() => copyURLtoClipboard(currNoteId.id)} className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><i className="fa-solid fa-share-nodes increaseScze cursor-pointer"></i></button>
                                                <Link to="/v1/edit-page" className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-print increaseScze cursor-pointer"></i></button></Link>
                                                <div onClick={() => handleDeleteOption(currNoteId.id, props.isArch)} className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><button type='btn'><i className="fa-solid fa-trash increaseScze cursor-pointer"></i></button></div>
                                            </div>
                                        )
                                )
                                :
                                (null)
                        )
                        :
                        (null)
                }
            </div>
        </>
    )
}
