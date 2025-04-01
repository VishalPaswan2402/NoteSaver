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
            localStorage.setItem("currentId", response.data.logUser._id);
            toast.success("Logged in...");
            navigate(`/${response.data.navigateUrl}`);
        }
        else {
            toast.error("Fill all data.");
        }
    } catch (error) {
        if (error.status == 400) {
            toast.error(error.response.data.message);
            return console.log(error.response.data.message);
        }
        else if (error.status == 401) {
            toast.error(error.response.data.message);
            return console.log(error.response.data.message);
        }
        toast.error("Internal server error.");
        return console.log(endPoint, "Error: ", error);
    }
    finally {
        setFormActive(true);
    }
}