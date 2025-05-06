import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const codeSetupVerify = async (endPointUrl, data, setErrorMsg, dispatch, setShareEditCodeBox, setEditNoteData, setAnyChangeHappen, setDisplayCodeBox) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${backendUrl}${endPointUrl}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.success == true) {
            setErrorMsg(null);
            dispatch(setShareEditCodeBox(false));
            if (response.data.isPassSet == false) {
                dispatch(setEditNoteData(response.data.editNote));
            } else {
                dispatch(setEditNoteData(null));
                toast.success(response.data.message);
                dispatch(setAnyChangeHappen());
            }
            dispatch(setDisplayCodeBox(false));
        }
    }
    catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        setErrorMsg(errorMsg);
        console.log("Something went wrong.", error);
    }
}