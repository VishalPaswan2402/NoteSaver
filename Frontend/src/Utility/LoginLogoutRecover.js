import axios from "axios";
import { toast } from "react-toastify";
import { setCurrentUserId } from "../ReduxSlice/SliceFunction";

const backendUrl = "http://localhost:8080";

export const loginLogoutRecover = async (endPoint, data, dispatch, navigate, setFormActive) => {
    try {
        const response = await axios.post(`${backendUrl}${endPoint}`, data, { withCredentials: true });
        if (response.data.success == true) {
            dispatch(setCurrentUserId(response.data.logUser._id));
            localStorage.setItem("token", response.data.token);
            navigate(`${response.data.navigateUrl}`, {
                state: { toastMessage: response.data.message },
            });
        }
        else {
            toast.error("Fill all data.");
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
        return console.log(endPoint, "Error: ", error);
    }
    finally {
        setFormActive(true);
    }
}