import React, { use, useState } from 'react';
import image from '../../assets/image';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
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

    return (
        <>
            <ToastContainer autoClose={1500} position="top-center" />
            <div className='banner-container flex items-center justify-evenly bg-violet-300'>
                <div className='w-1/2 flex items-center justify-center'>
                    <img className='h-143 w-full' src={image.book}></img>
                </div>

                <div className='w-1/2 flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='bg-white grid grid-rows-1 gap-4 w-1/2 border-2 pt-5 pl-10 pr-10 pb-10 rounded-lg shadow-2xl shadow-gray-700'>
                        <h1 className='text-center text-2xl font-bold font-amarante'>
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
                        <input disabled={!formActive} type='text' placeholder='Enter username' {...register("username")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl' ></input>
                        {
                            forget
                                ?
                                <input disabled={!formActive} type='email' placeholder='Enter email' {...register("email")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl'></input>
                                :
                                account
                                    ?
                                    <input disabled={!formActive} type='password' placeholder='Enter password' {...register("password")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl'></input>
                                    :
                                    (
                                        <>
                                            <input disabled={!formActive} type='text' placeholder='Enter full name' {...register("fullname")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl' ></input>
                                            <input disabled={!formActive} type='email' placeholder='Enter email' {...register("email")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl'></input>
                                            <input disabled={!formActive} type='password' placeholder='Enter password' {...register("password")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl'></input>
                                            <input disabled={!formActive} type='password' placeholder='Confirm password' {...register("cnfpassword")} className='outline-2 outline-gray-400 focus:outline-blue-700 p-1 rounded-sm font-para text-2xl'></input>
                                        </>
                                    )
                        }
                        <button disabled={!formActive} type='submit' className={`bg-blue-400 border-2 rounded-sm p-1 cursor-pointer text-black hover:text-white font-para text-2xl
                            ${formActive
                                ? "bg-blue-400 hover:bg-blue-600 border-blue-600 hover:border-white "
                                : "bg-blue-600 border-white text-white cursor-wait"
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
                                <div>
                                    <p className='cursor-pointer hover:text-blue-800 hover:font-semibold inline font-para text-2xl' onClick={changeForm} >
                                        {
                                            account
                                                ?
                                                "Join us now – it's free !"
                                                :
                                                "Already have an account ?"
                                        }
                                    </p>
                                    <br></br>
                                    {
                                        forget
                                            ?
                                            null
                                            :
                                            <p className='cursor-pointer hover:text-blue-800 hover:font-semibold inline font-para text-2xl' onClick={() => setForget(!forget)} >Forget password ?</p>
                                    }
                                </div>
                        }
                    </form>
                </div>
            </div>
        </>
    );
}
