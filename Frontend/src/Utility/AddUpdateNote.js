import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem('token');
const backendUrl = "http://localhost:8080";

export const addUpdateNote = async (endpoint, data, navigate, setFormActive) => {
    if (!token) {
        navigate('/');
        return;
    }
    try {
        const response = await axios.post(`${backendUrl}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.success == true) {
            navigate(`${response.data.navigateUrl}`, {
                state: { toastMessage: response.data.message },
            });
        } else {
            toast.error("Fill all data.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log(error);
    }
    finally {
        setFormActive(true);
    }
}