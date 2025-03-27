import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const addUpdateNote = async (endpoint, data, navigate, setFormActive) => {
    try {
        const response = await axios.post(`${backendUrl}${endpoint}`, data);
        // console.log(response)
        if (response.data.success == true) {
            navigate(`${response.data.navigateUrl}`, {
                state: { toastMessage: response.data.message },
            });
        } else {
            toast.error("Fill all data.");
        }
    } catch (error) {
        toast.error("Something went wrong.");
        console.log(error);
    }
    finally {
        setFormActive(true);
    }
}