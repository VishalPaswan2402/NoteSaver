import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayLinkBox, setSharedNoteId } from '../../ReduxSlice/SliceFunction';

export default function ShareLink(props) {
    const dispatch = useDispatch();
    const frontendUrl = `http://localhost:5173`;
    const shareId = useSelector(state => state.notesaver.sharedNoteId);

    const hideShareLinkOption = () => {
        dispatch(setSharedNoteId(null));
        dispatch(setDisplayLinkBox());
    }

    const readFileURL = () => {
        const copyUrl = `${frontendUrl}/v1/view-note/${shareId}`;
        navigator.clipboard.writeText(copyUrl)
            .then(() => toast.success(`URL copied to clipboard.`))
            .catch(err => toast.error("Something went wrong"));
        dispatch(setSharedNoteId(null));
        dispatch(setDisplayLinkBox());
    }

    const writeOriginalFileURL = () => {
        const copyUrl = `${frontendUrl}/v1/write-original-file/${shareId}`;
        navigator.clipboard.writeText(copyUrl)
            .then(() => toast.success(`URL copied to clipboard.`))
            .catch(err => toast.error("Something went wrong"));
        dispatch(setSharedNoteId(null));
        dispatch(setDisplayLinkBox());
    }

    // const writeCloneFileURL = (originalId,cloneId) => {
    //     const copyUrl = `${frontendUrl}/v1/write-clone-file/${originalId}/${cloneId}`;
    //     console.log("COpy url : ", copyUrl);
    //     navigator.clipboard.writeText(copyUrl)
    //         .then(() => toast.success(`URL copied to clipboard.`))
    //         .catch(err => toast.error("Something went wrong"));
    // }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-70 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-share-nodes text-4xl p-1 text-[#EBE8DB]"></i><br></br>Share your notes with others.</p>
                    <div className={`flex items-center gap-2 mt-2`}>
                        <button onClick={readFileURL} className={`bg-[#3773f4] border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-[#373af4] border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Read file</button>
                        <button onClick={writeOriginalFileURL} className="bg-red-400 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-red-600 border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]">Edit original</button>
                        <button className="bg-yellow-300 border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-yellow-600 border-2 rounded-sm w-30 h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]">Edit clone</button>
                    </div>
                    <div className='justify-center mt-3 mb-2'>
                        <button onClick={hideShareLinkOption} className={`border-[#EBE8DB] bg-green-400 text-[#3D0301] hover:bg-green-600 font-para text-lg border-2 rounded-sm w-full h-10 cursor-pointer hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
