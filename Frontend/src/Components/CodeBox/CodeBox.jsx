import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyChangeHappen, setDisplayCodeBox, setEditNoteData, setShareEditCodeBox } from '../../ReduxSlice/SliceFunction';
import { codeSetupVerify } from '../../Utility/CodeSetupVerify';

export default function CodeBox(props) {
    const backendUrl = "http://localhost:8080";
    const noteId = useSelector(state => state.notesaver.sharedNoteId);
    const verifyNoteId = useSelector(state => state.notesaver.noteToVerify);
    const [errorMsg, setErrorMsg] = useState(null);
    const isOriginalOrClone = useSelector(state => state.notesaver.originalOrCloneShare);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const endPointUrl = props.codeType == 'original' ?
        `/v1/verify-original-share-code/${verifyNoteId}`
        : props.codeType == 'clone' ?
            `/v1/verify-clone-share-code/${verifyNoteId}`
            : isOriginalOrClone ?
                `/v1/set-original-share-code/${noteId}`
                : `/v1/set-clone-share-code/${noteId}`;

    const onSubmit = async (data) => {
        await codeSetupVerify(endPointUrl, data, setErrorMsg, dispatch, setShareEditCodeBox, setEditNoteData, setAnyChangeHappen, setDisplayCodeBox);
    }

    const handleShareBox = () => {
        dispatch(setDisplayCodeBox(false));
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-60 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-sm text-[#EBE8DB] font-para text-center'><i className={`fa-solid fa-${props.codeType ? 'lock' : 'key'} text-2xl p-1 text-[#EBE8DB]`}></i></p>
                    <p className='text-sm text-[#EBE8DB] font-para text-center p-1'>{props.codeType ? 'Enter sceret key to unlock.' : 'Enter sceret key to share note.'}</p>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col items-center mt-2'>
                            <input type='text' {...register("secretKey")} placeholder='Enter key here...' className='outline-2 w-50 outline-[#D76C82] focus:outline-[#ff94b1] text-sm font-para text-center p-2 rounded-sm text-[#EBE8DB]'></input>
                            <div className='w-50 flex justify-between mt-3 mb-1'>
                                {
                                    props.codeType
                                        ?
                                        <>
                                            <button type='submit' className='outline-2 outline-[#ebb9c3] bg-[#3773f4] font-para text-sm w-[45%] hover:bg-[#373af4] hover:outline-[#dfbac1] p-2 rounded-sm cursor-pointer text-[#EBE8DB]'>Unlock note</button>
                                            <a href='/' className='outline-2 outline-[#ebb9c3] bg-green-500 font-para text-sm w-[45%] hover:bg-green-600 hover:outline-[#dfbac1] p-2 rounded-sm cursor-pointer text-[#EBE8DB] text-center'>Cancle</a>
                                        </>
                                        :
                                        <>
                                            <button type='submit' className='outline-2 outline-[#ebb9c3] bg-[#3773f4] font-para text-sm w-[45%] hover:bg-[#373af4] hover:outline-[#dfbac1] p-2 rounded-sm cursor-pointer text-[#EBE8DB]'>Share note</button>
                                            <button type='button' onClick={handleShareBox} className='outline-2 outline-[#ebb9c3] bg-green-500 font-para text-sm w-[45%] hover:bg-green-600 hover:outline-[#dfbac1] p-2 rounded-sm cursor-pointer text-[#EBE8DB] text-center'>Cancle</button>
                                        </>
                                }
                            </div>
                            {errorMsg ? (<p className='text-[#ebb9c3] font-para text-sm rounded-sm text-center mt-1'>{errorMsg}</p>) : null}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
