import React, { useState } from 'react';
import image from '../../assets/image';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginLogout, setCurrentUserId } from '../../ReduxSlice/SliceFunction';

export default function Banner(props) {
    const backendUrl = "http://localhost:8080";
    const isLogin = useSelector(state => state.paste.login);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [account, setAccount] = useState(true);
    const [forget, setForget] = useState(false);
    const [fill, setFill] = useState(true);
    let endpoint = forget ? "/recover-password" : account ? "/login" : "/signup";
    const handleForm = () => {
        setAccount(!account);
        setForget(false);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        setFill(false);
        try {
            const response = await axios.post(`${backendUrl}/v1${endpoint}`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(response);
            if (response.status == 204 || response.status == 409) {
                console.log(response.data);
                toast.error(response.message);

            }
            else {
                console.log(response.data.message);
                toast.success(response.data.message);
                navigate(response.data.navigateUrl);
                dispatch(loginLogout());
                console.log("User id : ", response.data.logUser._id);
                dispatch(setCurrentUserId(response.data.logUser._id));
            }
        } catch (error) {
            if (error.response) {
                // Server responded with an error
                console.error("Error:", error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                console.error("Error:", error.message);
                toast.error("Something went wrong.");
            }
        } finally {
            setFill(true);
        }
    }
    // console.log(watch("example"))

    return (
        <>
            <ToastContainer autoClose={1500} position="top-center" />
            <div className='banner-container flex items-center justify-evenly bg-violet-300'>
                <div className='w-1/2 flex items-center justify-center'>
                    <img className='h-143 w-full' src={image.book}></img>
                </div>

                <div className='w-1/2 flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='bg-white grid grid-rows-1 gap-5 w-1/2 border-2 pt-5 pl-10 pr-10 pb-10 rounded-lg'>
                        <h1 className='text-center text-2xl font-bold'> {forget ? "Recover Password" : account ? "Login Form" : "Signup Form"} </h1>
                        <input disabled={!fill} type='text' placeholder='Enter username' {...register("username")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm' ></input>
                        {
                            forget
                                ?
                                <input disabled={!fill} type='email' placeholder='Enter email' {...register("email")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                :
                                account
                                    ?
                                    <input disabled={!fill} type='password' placeholder='Enter password' {...register("password")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                    :
                                    (
                                        <>
                                            <input disabled={!fill} type='text' placeholder='Enter full name' {...register("fullname")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm' ></input>
                                            <input disabled={!fill} type='email' placeholder='Enter email' {...register("email")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                            <input disabled={!fill} type='password' placeholder='Enter password' {...register("password")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                            <input disabled={!fill} type='password' placeholder='Confirm password' {...register("cnfpassword")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                        </>
                                    )
                        }
                        <button disabled={!fill} type='submit' className='bg-blue-400 border-2 rounded-sm p-1 cursor-pointer hover:bg-blue-600 hover:text-white' > {forget ? "Verify and Proceed" : account ? "Login to account" : "Create account"} </button>
                        <div>
                            <p style={{ display: fill ? "inline" : "none" }} className='cursor-pointer hover:text-blue-800 hover:font-semibold inline' onClick={() => { setAccount(!account); setForget(false); }}>
                                {account ? "Join us now – it's free!" : "Already have an account?"}
                            </p>
                            <br></br>
                            {
                                forget
                                    ?
                                    null
                                    :
                                    <p style={{ display: fill ? "inline" : "none" }} className='cursor-pointer hover:text-blue-800 hover:font-semibold inline' onClick={() => setForget(!forget)}>Forget password</p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
