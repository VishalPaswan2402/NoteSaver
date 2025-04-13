import axios from "axios";
import { toast } from "react-toastify";
import { setAlertBox, setViewPageDelete } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const deleteViewNote = async (id, userid, navigate, dispatch, setDeleteText, setIsDelete, setActiveBtn) => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
        return;
    }
    try {
        const response = await axios.delete(`${backendUrl}/v1/delete-note/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        navigate(`/v1/all-notes/${userid}`, {
            state: { toastMessage: response.data.message },
        });
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("Delete error", error);
    }
    finally {
        dispatch(setViewPageDelete(false));
        dispatch(setAlertBox());
        setDeleteText("Delete");
        setIsDelete(false);
        setActiveBtn(true);
    }
}