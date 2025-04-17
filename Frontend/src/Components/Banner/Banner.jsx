import React, { use, useEffect, useState } from 'react';
import image from '../../assets/image';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { loginLogoutRecover } from '../../Utility/LoginLogoutRecover';

export default function Banner(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [account, setAccount] = useState(true);
    const [forget, setForget] = useState(false);
    const currentId = useSelector(state => state.notesaver.currentUserId);
    const endPoint = forget ? '/v1/recover-password' : account ? "/v1/login" : "/v1/signup";
    const [formActive, setFormActive] = useState(true);
    const location = useLocation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        setFormActive(false);
        await loginLogoutRecover(endPoint, data, dispatch, navigate, setFormActive);
    }

    const changeForm = () => {
        setAccount(!account);
        setForget(false);
    }

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location])

    return (
        <>
            <ToastContainer autoClose={2000} position="top-center" />
            <div className='bg-[#EBE8DB] banner-container flex items-center justify-evenly'>
                <div className='w-[50%] flex items-center justify-center'>
                    <img className='h-143 w-full' src={image.book}></img>
                </div>

                <div className='w-[50%] flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='bg-white grid grid-rows-1 gap-4 w-1/2 border-2 border-[#B03052] pt-5 pl-10 pr-10 pb-5 rounded-lg shadow-2xl shadow-[#D76C82]'>
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
                        <input disabled={!formActive} type='text' placeholder='Username' {...register("username")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]' ></input>
                        {
                            forget
                                ?
                                <input disabled={!formActive} type='email' placeholder='E-mail' {...register("email")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]'></input>
                                :
                                account
                                    ?
                                    <input disabled={!formActive} type='password' placeholder='Password' {...register("password")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]'></input>
                                    :
                                    (
                                        <>
                                            <input disabled={!formActive} type='text' placeholder='Full name' {...register("fullname")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]' ></input>
                                            <input disabled={!formActive} type='email' placeholder='E-mail' {...register("email")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]'></input>
                                            <input disabled={!formActive} type='password' placeholder='Password' {...register("password")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]'></input>
                                            <input disabled={!formActive} type='password' placeholder='Confirm password' {...register("cnfpassword")} className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] p-1 pl-2 rounded-sm font-para text-[20px] text-[#B03052]'></input>
                                        </>
                                    )
                        }
                        <button disabled={!formActive} type='submit' className={`border-2 text-center text-[#EBE8DB] rounded-sm p-1 cursor-pointer hover:text-white font-para text-[20px]
                            ${formActive
                                ? "bg-[#D76C82] hover:bg-[#B03052] border-[#B03052] hover:border-[#3D0301] "
                                : "bg-[#B03052] border-[#3D0301] text-white cursor-wait"
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
                                    <p className='cursor-pointer text-[#B03052] hover:text-[#B03052] hover:font-semibold inline font-para text-[20px]' onClick={changeForm} >
                                        {
                                            account
                                                ?
                                                "Join us – it's free !"
                                                :
                                                "Existing user ?"
                                        }
                                    </p>
                                    {
                                        forget
                                            ?
                                            null
                                            :
                                            <p className='cursor-pointer text-[#B03052] hover:text-[#B03052] hover:font-semibold inline font-para text-[20px]' onClick={() => setForget(!forget)} >Forget password ?</p>
                                    }
                                </div>
                        }
                    </form>
                </div>
            </div>
        </>
    );
}
