import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayCodeBox, setNoteIdToVerify, setShareEditCodeBox } from '../../ReduxSlice/SliceFunction';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditShare(props) {
    const backendUrl = "http://localhost:8080";
    const verifyNoteId = useParams();
    const dispatch = useDispatch();
    const [codeBox, isCodeBox] = useState(true);
    const isBoxShow = useSelector(state => state.notesaver.shareEditCodeBox);
    const editDataNote = useSelector(state => state.notesaver.editNoteData);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            title: editDataNote?.title || "",
            description: editDataNote?.description || "",
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${backendUrl}/v1/update-original-shared/${verifyNoteId.id}`, data);
            if (response.data.success == true) {
                toast.success(response.data.message);
                navigate('/');
            }
            else {
                toast.error("Oops! Couldn't update the note. Please try again.");
                navigate('/');
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Error edit");
            toast.error(error.response.data.message);
            navigate('/');
        }
    }

    useEffect(() => {
        dispatch(setNoteIdToVerify(verifyNoteId.id));
        dispatch(setShareEditCodeBox(true));
    }, [])

    useEffect(() => {
        if (editDataNote) {
            reset({
                title: editDataNote.title,
                description: editDataNote.description,
            });
        }
    }, [editDataNote, reset]);

    return (
        <>
            <div id='note-container' className={` align-middle text-center`}>
                <h1 className='font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>Edit Shared Note</h1>
                <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 text-[#B03052] rounded-sm font-para text-2xl font-semibold'></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 outline-[#D76C82] text-[#B03052] focus:outline-[#3D0301] p-2 rounded-sm h-98 resize-none overflow-y-auto font-para text-2xl`}></textarea>
                    <button type='submit' className={`border-2 rounded-sm p-1 mb-1 cursor-pointer transition-all duration-200 bg-[#D76C82] text-[#EBE8DB] hover:bg-[#B03052] hover:border-[#3D0301] border-[#B03052]`}>Btn</button>
                </form>
            </div>
        </>
    )
}
