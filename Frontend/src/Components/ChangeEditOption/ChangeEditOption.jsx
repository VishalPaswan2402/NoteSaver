import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnyChangeHappen, setChangeEditOption } from '../../ReduxSlice/SliceFunction';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ChangeEditOption(props) {
    const backendUrl = "http://localhost:8080";
    const shareId = useSelector(state => state.notesaver.sharedNoteId);


    const dispatch = useDispatch();
    const hideChangeEditBox = () => {
        dispatch(setChangeEditOption(false));
    }

    const setShareOriginalOff = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${backendUrl}/v1/set-note-share-false/${shareId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.message);
            dispatch(setAnyChangeHappen());
            dispatch(setChangeEditOption(false));
        }
        catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg);
            console.log(error);
        }
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-70 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-triangle-exclamation text-4xl p-1 text-[#EBE8DB]"></i><br></br>Change shared document to non-editable.</p>
                    <div className={`grid grid-cols-2 gap-3 mt-2`}>
                        <button onClick={setShareOriginalOff} className={`bg-blue-400 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-blue-600 border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Non-editable</button>
                        <button onClick={hideChangeEditBox} className="bg-green-400 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-green-600 border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]">Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
