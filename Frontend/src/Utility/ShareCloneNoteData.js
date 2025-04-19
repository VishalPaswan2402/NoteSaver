import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const shareCloneNoteData = async (sharedNoteId, setSharedNoteId, copyURLtoClipboard, setDisplayCodeBox, setOriginalOrCloneShare, setDisplayShareOption, dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${backendUrl}/v1/share-clone/${sharedNoteId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.isActiveNote === true) {
            dispatch(setSharedNoteId(null));
            copyURLtoClipboard(response.data.shareCloneUrl);
        }
        else {
            dispatch(setDisplayCodeBox(true));
            dispatch(setOriginalOrCloneShare(false));
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