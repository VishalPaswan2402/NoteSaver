import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayCodeBox, setNoteIdToVerify, setSharedEditType, setShareEditCodeBox } from '../../ReduxSlice/SliceFunction';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { updateOriginal } from '../../Utility/UpdateOriginal';

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
        await updateOriginal(navigate, verifyNoteId.id, data);
    }

    useEffect(() => {
        dispatch(setNoteIdToVerify(verifyNoteId.id));
        dispatch(setShareEditCodeBox(true));
        dispatch(setSharedEditType("original"));
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
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 text-[#B03052] rounded-sm font-para text-lg font-semibold'></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 outline-[#D76C82] text-[#B03052] focus:outline-[#3D0301] p-2 rounded-sm h-98 resize-none overflow-y-auto font-para text-md`}></textarea>
                    <button type='submit' className={`border-2 font-para rounded-sm p-1 mb-1 cursor-pointer transition-all duration-200 bg-[#D76C82] text-[#EBE8DB] hover:bg-[#B03052] hover:border-[#3D0301] border-[#B03052]`}>Update Original</button>
                </form>
            </div>
        </>
    )
}
