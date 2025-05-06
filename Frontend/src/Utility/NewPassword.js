import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const newPassword = async (userId, password, cnfPassword, navigate) => {
    try {
        const response = await axios.post(`${backendUrl}/v1/update-password/${userId}`, { password, cnfPassword }, { withCredentials: true });
        navigate(response.data.navigateUrl, {
            state: {
                success: true,
                toastMessage: response.data.message
            }
        });
    }
    catch (error) {
        console.log("Verify error : ", error);
        if (error.response.data.navigateUrl) {
            navigate(error.response.data.navigateUrl, {
                state: {
                    success: false,
                    toastMessage: error.response.data.message
                }
            });
        }
        else {
            toast.error(error.response.data.message);
        }
    }
}