import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem('token');
const backendUrl = "http://localhost:8080";

export const markImportant = async (id, navigate, onMark) => {
    if (!token) {
        navigate('/');
        return;
    }
    try {
        const response = await axios.post(`${backendUrl}/v1/mark-important/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.success == true) {
            onMark(id);
            navigate(`${response.data.navigateUrl}`, {
                state: { toastMessage: response.data.message }
            });
        }
        else {
            toast.error("Something went wrong.");
        }
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("Important mark error :", error);
    }
}