import React, { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { newPassword } from '../../Utility/NewPassword';

export default function NewPassword(props) {
    const backendUrl = "http://localhost:8080";
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const userData = location.state?.userData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await newPassword(userData._id, password, cnfPassword, navigate);
    }

    const resetFunction = () => {
        setPassword('');
        setCnfPassword('');
    }

    return (
        <>
            <ToastContainer position='top-center' autoClose={2000} />
            <div className={`w-100 border-2 m-auto mt-18 mb-18 bg-white shadow-2xl shadow-[#D76C82] border-[#B03052] rounded-md`}>
                <h1 className='text-center text-2xl font-bold font-amarante text-[#B03052] pt-3'>New Password</h1>
                <p className='text-sm text-[#B03052] font-para text-center'>
                    Hey {userData.fullname} !<br /> Please enter a new password to secure your account.
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-4 gap-3 mb-3'>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Enter new password'
                        name='password'
                        value={password}
                        className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] w-[80%] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'
                    />
                    <input
                        onChange={(e) => setCnfPassword(e.target.value)}
                        type='password'
                        placeholder='Confirm password'
                        name='cnfPassword'
                        value={cnfPassword}
                        className='outline-2 outline-[#D76C82] focus:outline-[#3D0301] w-[80%] p-2 pl-2 rounded-sm font-para text-md text-[#B03052]'
                    />
                    <div className='flex justify-between w-[80%] h-10'>
                        <button
                            type='submit'
                            className='btnColor blueButton border-2 w-30 rounded-sm border-[#B03052] cursor-pointer font-para text-sm'
                        >
                            Update Password
                        </button>
                        <div
                            onClick={() => resetFunction()}
                            className='btnColor greenButton border-2 flex text-center items-center justify-center w-30 rounded-sm border-[#B03052] cursor-pointer font-para text-sm'
                        >
                            Reset Password
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
