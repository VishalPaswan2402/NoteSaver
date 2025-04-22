import React, { useState } from 'react';
import { setDisplayCodeBox, setDisplayShareOption, setOriginalOrCloneShare, setSharedNoteId } from '../../ReduxSlice/SliceFunction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { shareOriginalToEdit } from '../../Utility/ShareOriginalToEdit';
import { shareCloneNoteData } from '../../Utility/ShareCloneNoteData';

export default function ShareOption(props) {
    const backendUrl = "http://localhost:8080";
    const frontendUrl = `http://localhost:5173`;
    const dispatch = useDispatch();
    const sharedNoteId = useSelector(state => state.notesaver.sharedNoteId);
    const navigate = useNavigate();

    const handleShareCloneOption = () => {
        dispatch(setSharedNoteId(null));
        dispatch(setDisplayShareOption());
    }

    const copyURLtoClipboard = (url) => {
        const copyUrl = `${frontendUrl}${url}`;
        navigator.clipboard.writeText(copyUrl)
            .then(() => toast.success(`Yay! URL copied to your clipboard.`))
            .catch(err => toast.error("Something went wrong"));
    }

    const shareOriginalNote = async () => {
        await shareOriginalToEdit(sharedNoteId, setSharedNoteId, setDisplayCodeBox, setDisplayShareOption, copyURLtoClipboard, dispatch, navigate);
    }

    // clone share
    const shareCloneNote = async () => {
        await shareCloneNoteData(sharedNoteId, setSharedNoteId, copyURLtoClipboard, setDisplayCodeBox, setOriginalOrCloneShare, setDisplayShareOption, dispatch);
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-60 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-link text-4xl p-1 text-[#EBE8DB]"></i></p>
                    <p className='text-sm text-[#EBE8DB] font-para text-center m-1'>Share original to update source and use clone for a separate file.</p>
                    <div className='grid grid-cols-2 gap-3 mt-2'>
                        <button onClick={shareOriginalNote} className={`blueButton btnColor border-[#EBE8DB] text-[#3D0301] font-para text-sm border-2 rounded-sm w-25 cursor-pointer h-10`}>Share Original</button>
                        <button onClick={shareCloneNote} className="yellowButton btnColor border-[#EBE8DB] text-[#3D0301] font-para text-sm border-2 rounded-sm w-25 cursor-pointer h-10">Share Clone</button>
                    </div>
                    <div className='justify-center mt-2 mb-1'>
                        <button onClick={handleShareCloneOption} className={`border-[#EBE8DB] h-10 greenButton btnColor text-[#3D0301] font-para text-sm border-2 rounded-sm w-full cursor-pointer`}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
