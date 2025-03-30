import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlertBox } from '../../ReduxSlice/SliceFunction';
import { deleteNote } from '../../Utility/DeleteNote';

export default function AlertOption(props) {
    const dispatch = useDispatch();
    const noteId = useSelector(state => state.notesaver.currentNoteId);
    const [deleteText, setDeleteText] = useState("Delete");
    const [isDelete, setIsDelete] = useState(false);
    const [isArchive, setIsArchive] = useState(false);
    const [activeBtn, setActiveBtn] = useState(true);

    const handleDelete = () => {
        console.log("Clic cal");
        dispatch(setAlertBox(null))
    }

    const deleteSelectedNote = async () => {
        console.log("Clic del");
        setDeleteText("Deleting note...");
        setIsDelete(true);
        setIsArchive(false);
        setActiveBtn(false);
        await deleteNote(noteId, dispatch, setDeleteText, setIsDelete, setActiveBtn, setIsArchive);
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-indigo-400 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-55 rounded-sm shadow-2xl shadow-gray-600 grid grid-rows-2 gap-3">
                    <div className=' w-full flex justify-between'>
                        {
                            isDelete
                                ?
                                <button disabled={!activeBtn} onClick={deleteSelectedNote} className={`bg-red-400 hover:bg-red-600 border-2 rounded-sm hover:text-white ${isDelete ? 'w-full cursor-wait' : 'w-23 cursor-pointer'} p-2`}>{deleteText}</button>
                                :
                                isArchive
                                    ?
                                    <button disabled={!activeBtn} className="bg-yellow-400 hover:bg-yellow-600 border-2 rounded-sm w-23 p-2 cursor-pointer hover:text-white">Archive</button>
                                    :
                                    <>
                                        <button disabled={!activeBtn} onClick={deleteSelectedNote} className={`bg-red-400 hover:bg-red-600 border-2 rounded-sm ${isDelete ? 'w-46' : 'w-23'} w-23 p-2 cursor-pointer hover:text-white`}>{deleteText}</button>
                                        <button disabled={!activeBtn} className="bg-yellow-400 hover:bg-yellow-600 border-2 rounded-sm w-23 p-2 cursor-pointer hover:text-white">Archive</button>
                                    </>
                        }
                    </div>
                    <div className='flex justify-center'>
                        <button disabled={!activeBtn} onClick={() => handleDelete(null)} className={`bg-green-400 hover:bg-green-600 border-2 rounded-sm w-full p-2 ${!activeBtn ? 'cursor-wait' : 'cursor-pointer'} hover:text-white`}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
