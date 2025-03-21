import React, { use, useState } from 'react';
import image from '../../assets/image';
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setCurrentUserId } from '../../ReduxSlice/SliceFunction';


export default function Banner(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [account, setAccount] = useState(true);
    const [forget, setForget] = useState(false);
    const currentId=useSelector(state=>state.notesaver.currentUserId);

    const endPoint = forget ? '/v1/recover-password' : account ? "/v1/login" : "/v1/signup";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${backendUrl}${endPoint}`, data, { withCredentials: true });
            console.log(response.data);
            console.log(response.data.logUser._id);
            dispatch(setCurrentUserId(response.data.logUser._id));
            // console.log("token :", response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("currentId", response.data.logUser._id);
            toast.success("Logged in...");
            navigate(`/v1/all-notes/${currentId}`);
        } catch (error) {
            if (error.status == 400) {
                toast.error(error.response.data.message);
                return console.log(error.response.data.message);
            }
            else if (error.status == 401) {
                toast.error(error.response.data.message);
                return console.log(error.response.data.message);
            }
            toast.error("Internal server error.");
            return console.log(endPoint, "Error: ", error);
        }
    }

    const changeForm = () => {
        setAccount(!account);
        setForget(false);
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
                        <h1 className='text-center text-2xl font-bold'>
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
                        <input type='text' placeholder='Enter username' {...register("username")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm' ></input>
                        {
                            forget
                                ?
                                <input type='email' placeholder='Enter email' {...register("email")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                :
                                account
                                    ?
                                    <input type='password' placeholder='Enter password' {...register("password")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                    :
                                    (
                                        <>
                                            <input type='text' placeholder='Enter full name' {...register("fullname")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm' ></input>
                                            <input type='email' placeholder='Enter email' {...register("email")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                            <input type='password' placeholder='Enter password' {...register("password")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                            <input type='password' placeholder='Confirm password' {...register("cnfpassword")} className='outline-2 focus:outline-blue-700 p-1 rounded-sm'></input>
                                        </>
                                    )
                        }
                        <button type='submit' className='bg-blue-400 border-2 rounded-sm p-1 cursor-pointer hover:bg-blue-600 hover:text-white' >
                            {
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
                        <div>
                            <p className='cursor-pointer hover:text-blue-800 hover:font-semibold inline' onClick={changeForm} >
                                {
                                    account
                                        ?
                                        "Join us now – it's free!"
                                        :
                                        "Already have an account?"
                                }
                            </p>
                            <br></br>
                            {
                                forget
                                    ?
                                    null
                                    :
                                    <p className='cursor-pointer hover:text-blue-800 hover:font-semibold inline' onClick={() => setForget(!forget)} >Forget password</p>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
