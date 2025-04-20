import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const mergeCloneWithOriginal = async (idClone, mergeOption, dispatch, setAnyChangeHappen, setMergeOptionBox, setCloneId) => {
    try {
        const response = await axios.post(`${backendUrl}/v1/merge-clone/original/${idClone}/${mergeOption}`);
        toast.success(response.data.message);
        dispatch(setAnyChangeHappen());
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.log("Delete error", error);
    }
    finally {
        dispatch(setMergeOptionBox(false));
        dispatch(setCloneId(null));
    }
}