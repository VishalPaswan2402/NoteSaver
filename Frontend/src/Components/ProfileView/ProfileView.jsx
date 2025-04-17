import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileViewBox } from '../../ReduxSlice/SliceFunction';
import axios from 'axios';

export default function ProfileView(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const currentId = useSelector(state => state.notesaver.currentUserId);
    const [userProfile, setUserProfile] = useState([]);
    const userName = useSelector(state => state.notesaver.userName);

    const closeProfile = () => {
        dispatch(setProfileViewBox(false));
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${backendUrl}/v1/userdata/${currentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfile(response.data.userData);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (currentId) {
            fetchUserData();
        }
    }, [currentId])

    return (
        <>
            <div className='w-screen fixed h-screen z-30'>
                <div className="bg-[#B03052] border-2 border-[#EBE8DB] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-3 w-70 rounded-md shadow-2xl shadow-gray-600">
                    <p className='text-[#EBE8DB] text-2xl font-amarante text-center'>Your Profile</p>
                    <div className='h-20 w-20 bg-pink-600 border-5 border-pink-400 text-[#EBE8DB] m-auto mt-2 rounded-full flex items-center justify-center font-para text-5xl'>{userName.length > 1 ? userName.slice(0, 2).toUpperCase() : userName}</div>
                    <div className='mt-2 font-para text-[20px] text-[#EBE8DB]'>
                        <div className='flex gap-5 m-1 border-b-1 border-red-300'>
                            <div className='w-[40%] text-pink-300'>Username</div>
                            <div className='w-[60%]'>{userProfile.username}</div>
                        </div>
                        <div className='flex gap-5 m-1 border-b-1 border-red-300'>
                            <div className='w-[40%] text-pink-300'>Full name</div>
                            <div className='w-[60%]'>{userProfile.fullname}</div>
                        </div>
                        <div className='flex gap-5 m-1 border-b-1 border-red-300'>
                            <div className='w-[40%] text-pink-300'>E-mail</div>
                            <div className='w-[60%]'>{userProfile.email}</div>
                        </div>
                    </div>
                    <button onClick={closeProfile} className='bg-green-400 w-30 p-1 ml-[26%] mt-2 mb-1 cursor-pointer hover:bg-green-600 rounded-sm border-2 border-[#EBE8DB] hover:text-[#EBE8DB]'>Close</button>
                </div>
            </div>
        </>
    )
}
