import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnyChangeHappen, setCloneId, setMergeOptionBox } from '../../ReduxSlice/SliceFunction';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mergeCloneWithOriginal } from '../../Utility/MergeClone';

export default function MergeOption(props) {
    const idClone = useSelector(state => state.notesaver.cloneId);
    const dispatch = useDispatch();

    const closeMergeBox = () => {
        dispatch(setMergeOptionBox(false));
    }

    const mergeOriginalWithClone = async (mergeOption) => {
        await mergeCloneWithOriginal(idClone, mergeOption, dispatch, setAnyChangeHappen, setMergeOptionBox, setCloneId);
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-60 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-triangle-exclamation text-4xl p-1 text-[#EBE8DB]"></i></p>
                    <p className='text-sm text-[#EBE8DB] font-para text-center p-1'> Use "Update" to update the original. "Update and Delete" also deletes the duplicate after updating.</p>
                    <div className='grid grid-cols-2 gap-3 mt-1'>
                        <button onClick={() => mergeOriginalWithClone(true)} className={`bg-blue-400 border-[#EBE8DB] text-[#3D0301] font-para text-sm hover:bg-blue-600 border-2 rounded-sm w-25 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Update & Delete</button>
                        <button onClick={() => mergeOriginalWithClone(false)} className="bg-yellow-400 border-[#EBE8DB] text-[#3D0301] font-para text-sm hover:bg-yellow-600 border-2 rounded-sm w-25 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]">Update only</button>
                    </div>
                    <div className='justify-center mt-2 mb-2'>
                        <button onClick={closeMergeBox} className={`border-[#EBE8DB] bg-green-400 text-[#3D0301] hover:bg-green-600 font-para text-sm border-2 rounded-sm w-full h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
