import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const getCloneurl = async (shareId, writeCloneFileURL, setSharedNoteId, setDisplayLinkBox, dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${backendUrl}/v1/share-clone-url/${shareId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.success == true) {
            writeCloneFileURL(response.data.cloneUrl);
        }
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("clone url error", error);
    }
    finally {
        dispatch(setSharedNoteId(null));
        dispatch(setDisplayLinkBox());
    }
}