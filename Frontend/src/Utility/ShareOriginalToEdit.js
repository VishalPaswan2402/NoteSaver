import axios from "axios";
import { toast } from "react-toastify";
import { setOriginalOrCloneShare } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const shareOriginalToEdit = async (sharedNoteId, setSharedNoteId, setDisplayCodeBox, setDisplayShareOption, copyURLtoClipboard, dispatch, navigate) => {
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
            copyURLtoClipboard(response.data.shareOriginalUrl);
        }
        else {
            dispatch(setDisplayCodeBox(true));
            dispatch(setOriginalOrCloneShare(true));
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