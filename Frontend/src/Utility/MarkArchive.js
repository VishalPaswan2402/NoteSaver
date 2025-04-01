import axios from "axios";
import { toast } from "react-toastify";
import { handleOnArchiveNote, setAlertBox } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const markArchive = async (noteId, setIsArchive, dispatch, setActiveBtn, setArchiveText) => {
    try {
        const response = await axios.post(`${backendUrl}/v1/mark-archive/${noteId}`);
        dispatch(handleOnArchiveNote(noteId));
        toast.success(response.data.message);
    }
    catch (error) {
        toast.error("Something went wrong.");
        console.log("Archive error", error);
    }
    finally {
        setIsArchive(false);
        setActiveBtn(true);
        dispatch(setAlertBox());
        setArchiveText("Archive");
    }
}
