import axios from "axios";
import { toast } from "react-toastify";
import { setAnyChangeHappen } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const markImportant = async (id, navigate, dispatch) => {
    const token = localStorage.getItem('token');
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
            toast.success(response.data.message);
            dispatch(setAnyChangeHappen());
        }
        else {
            toast.error("Something went wrong.");
            console.log(response);
        }
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("Important mark error :", error);
    }
}