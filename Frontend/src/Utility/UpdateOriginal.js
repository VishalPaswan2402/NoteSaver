import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const updateOriginal = async (navigate, noteId, data) => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
        return;
    }
    try {
        const response = await axios.post(`${backendUrl}/v1/update-original-shared/${noteId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.success == true) {
            toast.success(response.data.message);
            navigate('/');
        }
        else {
            toast.error("Oops! Couldn't update the note. Please try again.");
            navigate('/');
        }
    }
    catch (error) {
        console.log(error);
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        navigate('/');
    }
}