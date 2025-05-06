import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "http://localhost:8080";

export const verifyOtp = async (otp, navigate, userData) => {
    console.log("My", otp);
    try {
        const response = await axios.post(`${backendUrl}/v1/verify-otp`, { otp }, { withCredentials: true });
        console.log(response.data);
        navigate(response.data.navigateUrl, {
            state: {
                success: true,
                userData: userData
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