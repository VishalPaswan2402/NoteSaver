import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlertBox, updateViewPageChange } from '../../ReduxSlice/SliceFunction';
import { deleteNote } from '../../Utility/DeleteNote';
import { markArchive } from '../../Utility/MarkArchive';
import { useNavigate } from 'react-router-dom';
import { deleteViewNote } from '../../Utility/DeleteView';

export default function AlertOption(props) {
    const dispatch = useDispatch();
    const noteId = useSelector(state => state.notesaver.currentNoteId);
    const noteArch = useSelector(state => state.notesaver.currNoteArchive);
    const isPageView = useSelector(state => state.notesaver.isViewPage);
    const userId = useSelector(state => state.notesaver.currentUserId)
    const [deleteText, setDeleteText] = useState("Delete");
    const [archiveText, setArchiveText] = useState(noteArch ? "Un-archive" : "Archive");
    const [isDelete, setIsDelete] = useState(false);
    const [isArchive, setIsArchive] = useState(false);
    const [activeBtn, setActiveBtn] = useState(true);
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(setAlertBox(null))
    }

    const deleteSelectedNote = async () => {
        setDeleteText("Deleting note...");
        setIsDelete(true);
        setActiveBtn(false);
        isPageView ?
            await deleteViewNote(noteId, userId, navigate, dispatch, setDeleteText, setIsDelete, setActiveBtn) :
            await deleteNote(noteId, dispatch, setDeleteText, setIsDelete, setActiveBtn, navigate);
    }

    const markArchiveNote = async () => {
        setIsArchive(true);
        setActiveBtn(false);
        setArchiveText(noteArch ? "Un-archiving note..." : "Archiving note...");
        dispatch(updateViewPageChange());
        await markArchive(noteId, setIsArchive, dispatch, setActiveBtn, setArchiveText, navigate);
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-70 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-triangle-exclamation text-4xl p-1 text-[#EBE8DB]"></i><br></br>Delete is permanent, but Archive lets you restore data within 10 days.</p>
                    <div className={`${(isArchive || isDelete) ? 'flex' : 'grid grid-cols-2'} gap-3 mt-2`}>
                        {
                            isDelete
                                ?
                                <button disabled={!activeBtn} className={`bg-red-400 font-para border-[#EBE8DB] text-lg hover:bg-red-600 border-2 rounded-sm hover:border-[#EBE8DB] hover:text-[#EBE8DB] text-[#3D0301] ${isDelete ? 'w-full cursor-wait' : 'w-30 cursor-pointer'} h-10`}>{deleteText}</button>
                                :
                                isArchive
                                    ?
                                    <button disabled={!activeBtn} className={`bg-yellow-400 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-yellow-600 border-2 rounded-sm hover:border-[#EBE8DB] hover:text-[#EBE8DB] ${isArchive ? 'w-full cursor-wait' : 'w-30 cursor-pointer'} h-10`}>{archiveText}</button>
                                    :
                                    <>
                                        <button disabled={!activeBtn} onClick={deleteSelectedNote} className={`bg-red-400 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-red-600 border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>{deleteText}</button>
                                        <button disabled={!activeBtn} onClick={markArchiveNote} className="bg-yellow-400 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-yellow-600 border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]">{archiveText}</button>
                                    </>
                        }
                    </div>
                    <div className='justify-center mt-4 mb-2'>
                        <button disabled={!activeBtn} onClick={() => handleDelete(null)} className={`border-[#EBE8DB] bg-green-400 text-[#3D0301] hover:bg-green-600 font-para text-lg border-2 rounded-sm w-full h-10 ${!activeBtn ? 'cursor-wait' : 'cursor-pointer'} hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
