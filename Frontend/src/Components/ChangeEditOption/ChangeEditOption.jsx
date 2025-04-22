import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyChangeHappen, setChangeEditOption } from '../../ReduxSlice/SliceFunction';
import axios from 'axios';
import { toast } from 'react-toastify';
import { makeFileNonEditable } from '../../Utility/MakeFileNonEditable';

export default function ChangeEditOption(props) {
    const backendUrl = "http://localhost:8080";
    const shareId = useSelector(state => state.notesaver.sharedNoteId);


    const dispatch = useDispatch();
    const hideChangeEditBox = () => {
        dispatch(setChangeEditOption(false));
    }

    const setShareOriginalOff = async () => {
        await makeFileNonEditable(shareId, setAnyChangeHappen, setChangeEditOption, dispatch);
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-60 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-sm text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-circle-exclamation text-4xl p-1 text-[#EBE8DB]"></i><br></br>Change original shared document to non-editable.</p>
                    <div className={`grid grid-cols-2 gap-3 mt-2 mb-1`}>
                        <button onClick={setShareOriginalOff} className={`btnColor blueButton border-[#EBE8DB] text-[#3D0301] font-para text-sm border-2 rounded-sm w-25 h-10 cursor-pointer`}>Non-editable</button>
                        <button onClick={hideChangeEditBox} className="btnColor greenButton border-[#EBE8DB] text-[#3D0301] font-para text-sm border-2 rounded-sm w-25 h-10 cursor-pointer">Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
