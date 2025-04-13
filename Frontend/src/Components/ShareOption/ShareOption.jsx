import React from 'react'
import { setDisplayCodeBox, setDisplayShareOption, setSharedNoteId } from '../../ReduxSlice/SliceFunction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    const copyURLtoClipboard = (msg, url) => {
        const copyUrl = `${frontendUrl}${url}`;
        navigator.clipboard.writeText(copyUrl)
            .then(() => toast.success(`${msg} URL copied to clipboard.`))
            .catch(err => toast.error("Something went wrong"));
    }

    const shareOriginalNote = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/v1/share-original/${sharedNoteId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.isActiveNote === true) {
                dispatch(setSharedNoteId(null));
                copyURLtoClipboard(response.data.message, response.data.shareOriginalUrl);
            }
            else {
                dispatch(setDisplayCodeBox(true));
            }
        }
        catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg);
            console.log("Share original error : ", error);
        }
        finally {
            dispatch(setDisplayShareOption());
        }
    }

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-70 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-lg text-[#EBE8DB] font-para text-center'><i className="fa-solid fa-circle-exclamation text-4xl p-1 text-[#EBE8DB]"></i><br></br>Share original to update source and use clone for a separate file.</p>
                    <div className='grid grid-cols-2 gap-3 mt-2'>
                        <button onClick={shareOriginalNote} className={`bg-[#3773f4] border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-[#373af4] border-2 rounded-sm w-30 cursor-pointer h-10 hover:border-[#EBE8DB] hover:text-[#EBE8DB]`}>Share Original</button>
                        <button className="bg-[#b4bd33] border-[#EBE8DB] text-[#3D0301] font-para text-lg hover:bg-[#b89514] border-2 rounded-sm w-30 cursor-pointer h-10 hover:border-[#EBE8DB] hover:text-[#EBE8DB]">Share Clone</button>
                    </div>
                    <div className='justify-center mt-3 mb-2'>
                        <button onClick={handleShareCloneOption} className={`border-[#EBE8DB] h-10 bg-green-400 text-[#3D0301] hover:bg-green-600 font-para text-lg border-2 rounded-sm w-full hover:border-[#EBE8DB] hover:text-[#EBE8DB] cursor-pointer`}>Cancle</button>
                    </div>
                </div>
            </div>
        </>
    )
}
