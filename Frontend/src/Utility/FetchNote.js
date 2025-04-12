import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem('token');
const backendUrl = "http://localhost:8080";

export const fetchNote = async (id, setNoteView) => {
    try {
        const response = await axios.get(`${backendUrl}/v1/view-note/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setNoteView(response.data.viewNote);
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("View page error", error);
    }
}