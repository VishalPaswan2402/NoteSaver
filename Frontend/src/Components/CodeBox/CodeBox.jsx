import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayCodeBox, setEditNoteData, setShareEditCodeBox } from '../../ReduxSlice/SliceFunction';

export default function CodeBox(props) {
    const backendUrl = "http://localhost:8080";
    const noteId = useSelector(state => state.notesaver.sharedNoteId);
    const verifyNoteId = useSelector(state => state.notesaver.noteToVerify);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const token = localStorage.getItem("token");

    const endPointUrl = props.codeType ? `/v1/verify-original-share-code/${verifyNoteId}` : `/v1/set-original-share-code/${noteId}`

    const onSubmit = async (data) => {
        if (!token) {
            setErrorMsg("Unauthorized user, please login.");
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}${endPointUrl}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success == true) {
                setErrorMsg(null);
                dispatch(setShareEditCodeBox(false));
                if (response.data.isPassSet == false) {
                    dispatch(setEditNoteData(response.data.editNote));
                } else {
                    dispatch(setEditNoteData(null));
                    toast.success(response.data.message);
                }
            }
        }
        catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
            setErrorMsg(errorMsg);
            console.log("Something went wrong.", error);
        }
        finally {
            dispatch(setDisplayCodeBox(false));
        }
    }

    const handleShareBox = () => {
        dispatch(setDisplayCodeBox(false));
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-70 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className={`fa-solid fa-${props.codeType ? 'lock' : 'key'} text-2xl p-1 text-[#EBE8DB]`}></i><br></br>{props.codeType ? 'Enter sceret key to unlock.' : 'Enter sceret key to share note.'} </p>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col items-center mt-2'>
                            <input type='text' {...register("secretKey")} placeholder='Enter key here...' className='outline-2 w-55 outline-[#D76C82] focus:outline-[#ff94b1] text-lg font-para text-center p-1 rounded-sm text-[#EBE8DB]'></input>
                            <div className='w-full flex'>
                                {
                                    props.codeType
                                        ?
                                        <>
                                            <button type='submit' className='outline-2 outline-[#ebb9c3] bg-[#3773f4] font-para text-lg w-1/2 hover:bg-[#373af4] hover:outline-[#dfbac1] p-1 m-4 rounded-sm cursor-pointer text-[#EBE8DB]'>Unlock note</button>
                                            <a href='/' className='outline-2 outline-[#ebb9c3] bg-green-500 font-para text-lg w-1/2 hover:bg-green-600 hover:outline-[#dfbac1] p-1 m-4 rounded-sm cursor-pointer text-[#EBE8DB] text-center'>Cancle</a>
                                        </>
                                        :
                                        <>
                                            <button type='submit' className='outline-2 outline-[#ebb9c3] bg-[#3773f4] font-para text-lg w-1/2 hover:bg-[#373af4] hover:outline-[#dfbac1] p-1 m-4 rounded-sm cursor-pointer text-[#EBE8DB]'>Share note</button>
                                            <button type='button' onClick={handleShareBox} className='outline-2 outline-[#ebb9c3] bg-green-500 font-para text-lg w-1/2 hover:bg-green-600 hover:outline-[#dfbac1] p-1 m-4 rounded-sm cursor-pointer text-[#EBE8DB] text-center'>Cancle</button>
                                        </>
                                }
                            </div>
                            {errorMsg ? (<p className='text-red-600 font-semibold font-para text-lg bg-[#EBE8DB] w-55 rounded-sm text-center'>{errorMsg}</p>) : null}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
