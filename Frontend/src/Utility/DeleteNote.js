import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const deleteNote = async (noteId, onDelete, setDeleteText, setIsDelete) => {
    try {
        console.log("Clicked del");
        const response = await axios.delete(`${backendUrl}/v1/delete-note/${noteId}`);
        console.log("delete success", response);
        onDelete(noteId);
        toast.success(response.data.message);
    }
    catch (error) {
        toast.error("Something went wrong.");
        console.log("Delete error", error);
    }
    finally {
        setDeleteText("Delete");
        setIsDelete(false);
    }
}