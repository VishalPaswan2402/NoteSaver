import React, { useEffect, useState } from 'react'
import './AddNew.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { addUpdateNote } from '../../Utility/AddUpdateNote'
import { setAlertBox, setCurrentNoteArchive, setCurrentUserId, setDisplayLinkBox, setSharedNoteId, setViewPageDelete } from '../../ReduxSlice/SliceFunction'
import axios from 'axios'
import { usePrintNote } from '../PrintNote/UsePrintNote'

export default function AddNew(props) {
    const backendUrl = "http://localhost:8080";
    const frontendUrl = `http://localhost:5173`;
    const navigate = useNavigate();
    const editNoteId = props.editNoteId;
    const [formActive, setFormActive] = useState(true);
    const currNoteId = useParams();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
    const [noteCreator, setNoteCreator] = useState(null);
    const { printFn, HiddenPrintComponent } = usePrintNote(props.title, props.disc);

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
        dispatch(setSharedNoteId(id));
        dispatch(setDisplayLinkBox());
    }

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/view-note/${currNoteId.id}`);
                setNoteCreator(response.data.viewNote.userId);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        }
        if (currNoteId?.id) {
            fetchNote();
        }
    }, [currNoteId]);

    return (
        <>
            <ToastContainer position='top-center' autoClose={2000} />
            <HiddenPrintComponent />
            <div id='note-container' className='align-middle text-center'>
                <h1 className='font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>{props.heading} </h1>
                <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 text-[#B03052] rounded-sm font-para text-lg font-semibold' defaultValue={props.title} disabled={!props.edit ? true : !formActive}></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 outline-[#D76C82] text-[#B03052] focus:outline-[#3D0301] p-2 rounded-sm ${!isAuthenticated ? 'h-110 mb-2' : 'h-98'} resize-none overflow-y-auto font-para text-md`} defaultValue={props.disc} disabled={!props.edit ? true : !formActive}></textarea>
                    {
                        (props.edit)
                            ?
                            (
                                <button disabled={!formActive} type='submit' className={`border-2 rounded-sm p-1 mb-1 cursor-pointer font-para transition-all duration-200 bg-[#D76C82] text-[#EBE8DB] hover:bg-[#B03052] hover:border-[#3D0301] border-[#B03052]
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
                    (isAuthenticated && userId == noteCreator)
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
                                                {
                                                    props.isOriginal
                                                        ?
                                                        <button onClick={() => copyURLtoClipboard(currNoteId.id)} className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><i className="fa-solid fa-share-nodes increaseScze cursor-pointer"></i></button>
                                                        :
                                                        null
                                                }
                                                <button onClick={printFn} className='border-2 bg-[#D76C82] hover:bg-[#B03052] rounded-sm p-1 mb-1 border-[#B03052] hover:border-[#3D0301] text-[#EBE8DB] cursor-pointer icon-btn'><div><i className="fa-solid fa-print increaseScze cursor-pointer"></i></div></button>
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
