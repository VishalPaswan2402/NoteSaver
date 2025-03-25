import React from 'react'
import './AddNew.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function AddNew(props) {
    const backendUrl = "http://localhost:8080";
    const navigate = useNavigate();
    const editNoteId = props.editNoteId;
    if (editNoteId) {
        console.log("Edit id add new : ", editNoteId);
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    console.log("props :", props);
    let endpoint = null;
    const userId = useSelector(state => state.notesaver.currentUserId);
    console.log(userId);
    console.log("End", endpoint);
    if (props.editType == "newNote") {
        endpoint = `/v1/new-note/${userId}`;
    } else if (props.editType == "editNote") {
        endpoint = `/v1/edit-note/${editNoteId}`;
    }

    console.log(endpoint);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${backendUrl}${endpoint}`, data);
            console.log(response)
            if (response.data.success == true) {
                navigate(`/${response.data.navigateUrl}`, {
                    state: { toastMessage: response.data.message },
                });
            } else {
                toast.error("Fill all data.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }
    }

    // console.log(watch("example"))

    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            <div id='note-container' className='align-middle text-center'>
                <h1 className='text-2xl p-2 font-semibold text-rose-800'>{props.heading} </h1>
                <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 focus:outline-blue-700 p-2 rounded-lg font-bold' defaultValue={props.title} disabled={!props.edit}></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 focus:outline-blue-700 p-2 rounded-lg h-101 resize-none overflow-y-auto`} defaultValue={props.disc} disabled={!props.edit}></textarea>
                    {
                        props.edit
                            ?
                            (
                                <button type='submit' className='border-2 bg-blue-400 hover:bg-blue-600 rounded-lg p-1 mb-1 border-blue-600 hover:border-blue-400 hover:text-white cursor-pointer'> {props.btnName} </button>
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
                </form>
            </div>
        </>
    )
}
