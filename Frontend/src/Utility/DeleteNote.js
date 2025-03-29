import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { handleOnDeleteNote, setAlertBox } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const deleteNote = async (noteId, dispatch, setDeleteText, setIsDelete, setActiveBtn, setIsArchive) => {
    try {
        console.log("Clicked del");
        const response = await axios.delete(`${backendUrl}/v1/delete-note/${noteId}`);
        console.log("delete success", response);
        dispatch(handleOnDeleteNote(noteId));
        toast.success(response.data.message);
    }
    catch (error) {
        toast.error("Something went wrong.");
        console.log("Delete error", error);
    }
    finally {
        dispatch(setAlertBox());
        setDeleteText("Delete");
        setIsDelete(false);
        setActiveBtn(true);
        setIsArchive(false);
    }
}