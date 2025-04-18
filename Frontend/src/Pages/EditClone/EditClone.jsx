import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { setNoteIdToVerify, setSharedEditType, setShareEditCodeBox } from '../../ReduxSlice/SliceFunction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EditClone(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const notesId = useParams();
    console.log(notesId);
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

    useEffect(() => {
        dispatch(setNoteIdToVerify(notesId.cloneId));
        dispatch(setShareEditCodeBox(true));
        dispatch(setSharedEditType('clone'));
    }, [])

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/v1/update-clone-shared/${notesId.cloneId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg);
            navigate('/');
        }
    }

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
                <h1 className='font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>Edit Cloned Note</h1>
                <form onSubmit={handleSubmit(onSubmit)} id='input-container' className='grid max-w-2xl m-auto gap-4 mt-2'>
                    <input {...register("title")} type='text' placeholder='Enter title' className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 text-[#B03052] rounded-sm font-para text-lg font-semibold'></input>
                    <textarea {...register("description")} id='note-area' type='text' placeholder='Enter description' className={`outline-2 outline-[#D76C82] text-[#B03052] focus:outline-[#3D0301] p-2 rounded-sm h-98 resize-none overflow-y-auto font-para text-md`}></textarea>
                    <button type='submit' className={`font-para border-2 rounded-sm p-1 mb-1 cursor-pointer transition-all duration-200 bg-[#D76C82] text-[#EBE8DB] hover:bg-[#B03052] hover:border-[#3D0301] border-[#B03052]`}>Update Original</button>
                </form>
            </div>
        </>
    )
}
