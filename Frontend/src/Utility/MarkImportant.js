import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = "http://localhost:8080";


export const markImportant = async (id, navigate, onMark) => {
    try {
        const response = await axios.post(`${backendUrl}/v1/mark-important/${id}`);
        if (response.data.success == true) {
            onMark(id);
            navigate(`${response.data.navigateUrl}`, {
                state: { toastMessage: response.data.message }
            });
        }
        else {
            toast.error("Something went wrong.");
        }
    }
    catch (error) {
        console.log("Important mark error :", error);
        toast.error("Something went wrong");
    }
}