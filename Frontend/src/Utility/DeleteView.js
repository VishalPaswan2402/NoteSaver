import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = "http://localhost:8080";

export const deleteView = async (id, userid, navigate, setFormActive, setDeleteText) => {
    try {
        const response = await axios.delete(`${backendUrl}/v1/delete-note/${id}`);
        navigate(`/v1/all-notes/${userid}`, {
            state: { toastMessage: response.data.message },
        });
    }
    catch (error) {
        toast.error("Something went wrong.");
        console.log("Delete error", error);
    }
    finally {
        setFormActive(true);
        setDeleteText("Delete");
    }
}