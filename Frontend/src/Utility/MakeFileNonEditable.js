import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const makeFileNonEditable = async (shareId, setAnyChangeHappen, setChangeEditOption, dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${backendUrl}/v1/set-note-share-false/${shareId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success(response.data.message);
        dispatch(setAnyChangeHappen());
        dispatch(setChangeEditOption(false));
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log(error);
    }
}