import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const recoverPassword = async (endPoint, data, navigate, setFormActive) => {
    try {
        const response = await axios.post(`${backendUrl}${endPoint}`, data, { withCredentials: true });
        console.log(response);
        navigate(`${response.data.navigateUrl}`, {
            state: {
                userData: response.data.recoverUser
            }
        });
    }
    catch (error) {
        console.log("Recover error : ", error);
        toast.error(error.response.data.message);
    }
    finally {
        setFormActive(true);
    }
}