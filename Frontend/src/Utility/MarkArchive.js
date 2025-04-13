import axios from "axios";
import { toast } from "react-toastify";
import { handleOnArchiveNote, setAlertBox } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const markArchive = async (noteId, setIsArchive, dispatch, setActiveBtn, setArchiveText,navigate) => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
        return;
    }
    try {
        const response = await axios.post(`${backendUrl}/v1/mark-archive/${noteId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(handleOnArchiveNote(noteId));
        toast.success(response.data.message);
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("Archive error", error);
    }
    finally {
        setIsArchive(false);
        setActiveBtn(true);
        dispatch(setAlertBox());
        setArchiveText("Archive");
    }
}
