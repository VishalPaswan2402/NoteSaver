import axios from "axios";
import { toast } from "react-toastify";
import { handleOnDeleteNote, setAlertBox } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const deleteNote = async (noteId, dispatch, setDeleteText, setIsDelete, setActiveBtn,navigate) => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
        return;
    }
    try {
        const response = await axios.delete(`${backendUrl}/v1/delete-note/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(handleOnDeleteNote(noteId));
        toast.success(response.data.message);
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("Delete error", error);
    }
    finally {
        dispatch(setAlertBox());
        setDeleteText("Delete");
        setIsDelete(false);
        setActiveBtn(true);
    }
}