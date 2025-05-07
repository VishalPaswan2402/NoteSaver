import React, { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUserId } from '../../ReduxSlice/SliceFunction';

export default function SignupVerifyPage(props) {
    const backendUrl = "http://localhost:8080";
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const userData = location.state?.userData;
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/v1/verify-newUser/otp`, { otp }, { withCredentials: true });
            dispatch(setCurrentUserId(response.data.logUser._id));
            localStorage.setItem("token", response.data.token);
            navigate(`${response.data.navigateUrl}`, {
                state: {
                    toastMessage: response.data.message,
                },
            });
        }
        catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMsg);
            console.log("Signup verify Error: ", error);
        }
    }

    const resendOtp = async () => {
        // await resendOtpToMail(userData._id, navigate);
        console.log("Resend");
    }

    return (
        <>
            <ToastContainer position='top-center' autoClose={2000} />
            <div className={`w-100 border-2 m-auto mt-18 mb-18 bg-white shadow-2xl shadow-[#D76C82] border-[#B03052] rounded-md`}>
                <h1 className='text-center text-2xl font-bold font-amarante text-[#B03052] pt-3'>Verify E-mail</h1>
                <p className='text-sm text-[#B03052] font-para text-center mt-1'>
                    An OTP has been sent to your email : <span className='text-blue-700'>{userData}</span> <br />
                    Just enter it below to confirm and complete your signup!
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-4'>
                    <input
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        type='text'
                        placeholder='Enter OTP here...'
                        name='otp'
                        className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] w-[80%] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'
                    />
                    <div className='flex justify-between w-[80%] mt-3 h-10 mb-3'>
                        <button
                            type='submit'
                            className='btnColor blueButton border-2 w-30 rounded-sm border-[#B03052] cursor-pointer font-para text-sm'
                        >
                            Verify OTP
                        </button>
                        <div
                            onClick={resendOtp}
                            className='btnColor greenButton border-2 flex text-center items-center justify-center w-30 rounded-sm border-[#B03052] cursor-pointer font-para text-sm'
                        >
                            Resend OTP
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
