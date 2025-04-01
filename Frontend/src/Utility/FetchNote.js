import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const fetchNote = async (id, setNoteView) => {
    try {
        const response = await axios.get(`${backendUrl}/v1/view-note/${id}`);
        setNoteView(response.data.viewNote);
    }
    catch (error) {
        toast.error("Something went wrong.");
        console.log("View page error", error);
    }
}