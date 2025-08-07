import React, { use, useEffect, useState } from 'react';
import image from '../../assets/image';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { loginLogoutRecover } from '../../Utility/LoginLogoutRecover';
import axios from 'axios';
import { recoverPassword } from '../../Utility/RecoverPassword';

export default function Banner(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [account, setAccount] = useState(true);
    const [forget, setForget] = useState(false);
    const currentId = useSelector(state => state.notesaver.currentUserId);
    const [formActive, setFormActive] = useState(true);
    const location = useLocation();
    let endPoint = null;

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        setFormActive(false);
        if (forget) {
            endPoint = '/v1/recover-password';
            await recoverPassword(endPoint, data, navigate, setFormActive);
        }
        else {
            if (account) {
                endPoint = "/v1/login";
                await loginLogoutRecover(endPoint, data, dispatch, navigate, setFormActive);
            }
            else {
                endPoint = "/v1/signup";
                await loginLogoutRecover(endPoint, data, dispatch, navigate, setFormActive);
            }
        }
    }

    const changeForm = () => {
        setAccount(!account);
        setForget(false);
    }

    useEffect(() => {
        if (location.state?.toastMessage) {
            if (!location.state.success) {
                toast.error(location.state.toastMessage);
            }
            else {
                toast.success(location.state.toastMessage);
            }
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location])

    return (
        <>
            <ToastContainer autoClose={2000} toastClassName="md:!w-80 lg:!w-80 !w-70 sm:!w-80 !h-15 mt-2" position="top-center" />
            <h1 className='lg:hidden font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>NoteDrive</h1>
            <div className='bg-[#EBE8DB] banner-container flex items-center justify-evenly'>
                <div className='w-[50%] lg:flex hidden items-center justify-center'>
                    <img className='h-143 w-full' src={image.book}></img>
                </div>

                <div className='w-[100%] mt-4 mb-2 lg:w-[50%] flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='bg-white grid grid-rows-1 md:w-100 sm:80 gap-4 w-81 lg:w-100 border-2 border-[#B03052] pt-5 pl-10 pr-10 pb-5 rounded-md shadow-2xl shadow-[#D76C82]'>
                        <h1 className='text-center text-2xl font-bold font-amarante text-[#B03052]'>
                            {
                                forget
                                    ?
                                    "Recover Password"
                                    :
                                    account
                                        ?
                                        "Login Form"
                                        :
                                        "Signup Form"
                            }
                        </h1>
                        <input disabled={!formActive} type='text' placeholder='Username' {...register("username")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]' ></input>
                        {
                            forget
                                ?
                                <input disabled={!formActive} type='email' placeholder='E-mail' {...register("email")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'></input>
                                :
                                account
                                    ?
                                    <input disabled={!formActive} type='password' placeholder='Password' {...register("password")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'></input>
                                    :
                                    (
                                        <>
                                            <input disabled={!formActive} type='text' placeholder='Full name' {...register("fullname")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]' ></input>
                                            <input disabled={!formActive} type='email' placeholder='E-mail' {...register("email")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'></input>
                                            <input disabled={!formActive} type='password' placeholder='Password' {...register("password")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'></input>
                                            <input disabled={!formActive} type='password' placeholder='Confirm password' {...register("cnfpassword")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'></input>
                                        </>
                                    )
                        }
                        <button disabled={!formActive} type='submit' className={`voiletButton btnColor border-[#B03052] hover:border-[#D76C82] border-2 text-center text-[#EBE8DB] rounded-sm p-2 cursor-pointer font-para text-md
                            ${formActive
                                ? ""
                                : "cursor-wait"
                            } 
                            `}>
                            {
                                !formActive
                                    ?
                                    "Processing..."
                                    :
                                    forget
                                        ?
                                        "Send OTP"
                                        :
                                        account
                                            ?
                                            "Login"
                                            :
                                            "Signup"
                            }
                        </button>
                        {
                            !formActive
                                ?
                                null
                                :
                                <div className='flex justify-between'>
                                    <p className='cursor-pointer text-[#B03052] hover:text-[#B03052] hover:font-semibold inline font-para text-md' onClick={changeForm} >
                                        {
                                            account
                                                ?
                                                "Join us – it's free!"
                                                :
                                                "Existing user?"
                                        }
                                    </p>
                                    {
                                        forget
                                            ?
                                            null
                                            :
                                            <p className='cursor-pointer text-[#B03052] hover:text-[#B03052] hover:font-semibold inline font-para text-md' onClick={() => setForget(!forget)} >Forget password?</p>
                                    }
                                </div>
                        }
                    </form>
                </div>
            </div>
        </>
    );
}
