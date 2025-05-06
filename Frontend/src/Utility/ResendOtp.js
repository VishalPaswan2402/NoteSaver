import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const resendOtpToMail = async (userId, navigate) => {
    try {
        const response = await axios.get(`${backendUrl}/v1/resend-otp/${userId}`, { withCredentials: true });
        toast.success(response.data.message);
    }
    catch (error) {
        console.log(error);
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