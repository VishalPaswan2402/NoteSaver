import React, { useState } from 'react'
import image from '../../assets/image';
import "./Navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticate, setProfileViewBox } from '../../ReduxSlice/SliceFunction';

export default function Navbar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
    const currId = useSelector(state => state.notesaver.currentUserId);
    const userName = useSelector(state => state.notesaver.userName);
    const [moreOption, setMoreOption] = useState(false);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.setItem('logout', Date.now()); // ⚠️ very important
        dispatch(setIsAuthenticate(false));
        setMoreOption(false);
        navigate('/');
    }

    const showProfile = () => {
        dispatch(setProfileViewBox(true));
        setMoreOption(false);
    }

    const navgiteAbout = () => {
        navigate('/v1/about');
        setMoreOption(false);
    }

    return (
        <>
            <div id='navbar' className='flex place-content-between p-2 bg-[#B03052] z-100 fixed t-0 w-screen'>
                <div id='left-navbar'>
                    <div id='left-option' className='flex pl-6 gap-3 pt-1'>
                        <div className="site-logo logo-style" style={{ backgroundImage: `url(${image.logo})` }} ></div>
                        {
                            isAuthenticated
                                ?
                                <div className='flex gap-5'>
                                    <NavLink to={`/v1/all-notes/${currId}`} className={({ isActive }) => isActive ? "active-link font-para" : "text-red-400 font-para hover:text-[#3D0301]"}>All-Notes</NavLink>
                                    <NavLink to={`/v1/add-new/${currId}`} className={({ isActive }) => isActive ? "active-link font-para" : "text-red-400 font-para hover:text-[#3D0301]"}>New-Note</NavLink>
                                </div>
                                :
                                <>
                                    <NavLink to={'/'} className={({ isActive }) => isActive ? "active-link font-para" : "text-red-400 font-para hover:text-[#3D0301]"}>NoteDrive</NavLink>
                                    <NavLink to={'/v1/about'} className={({ isActive }) => isActive ? "active-link font-para" : "text-red-400 font-para hover:text-[#3D0301]"}>About</NavLink>
                                </>
                        }
                    </div>
                </div>
                <div className='right-navbar flex'>
                    {
                        isAuthenticated
                            ?
                            <>
                                <div className="relative z-50 font-para text-lg w-35 mr-7">
                                    <button onClick={() => setMoreOption(!moreOption)} className="bg-[#EBE8DB] whiteButton btnColor pl-2 pr-2 pt-1 pb-1 w-full border-2 h-full rounded-sm hover:bg-[#3d0301b5] text-[#B03052] cursor-pointer flex gap-2 items-center moreOption hover:border-[#D76C82]">
                                        <div className='h-7 w-7 rounded-full text-[#EBE8DB] bg-[#D76C82] text-center moreOptionIcon'>{userName.length > 1 ? userName.slice(0, 2).toUpperCase() : userName.toUpperCase()}</div>
                                        {
                                            userName.length > 8
                                                ?
                                                <>{userName.slice(0, 9)}...</>
                                                :
                                                userName
                                        }
                                    </button>
                                    {
                                        moreOption
                                            ?
                                            (
                                                <ul className="absolute left-0 w-full bg-[#EBE8DB] border-2 border-gray-300 shadow-lg shadow-[#D76C82] rounded-sm mt-1">
                                                    <li onClick={showProfile} className={`p-1 pinkButton btnColor cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-solid fa-user pl-1 pr-2"></i>Profile</li>
                                                    <li onClick={navgiteAbout} className={`p-1 pinkButton btnColor cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-solid fa-circle-info pl-1 pr-2"></i>About</li>
                                                    <li className={`p-1 pinkButton btnColor cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-solid fa-sun pl-1 pr-2"></i>Mode</li>
                                                    <li onClick={handleLogOut} className={`p-1 pinkButton btnColor cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-solid fa-right-from-bracket pl-1 pr-2"></i>Log Out</li>
                                                </ul>
                                            )
                                            :
                                            null
                                    }
                                </div>
                            </>
                            :
                            <a href='/'>
                                <>
                                    <div id='right-navbar' className='mr-7 whiteButton btnColor w-25 cursor-pointer text-center font-para pt-1 pb-1 border-2 rounded-sm border-[#3D0301] hover:border-[#D76C82] text-lg'><i className="fa-solid fa-right-to-bracket pr-1"></i>Login</div>
                                </>
                            </a>
                    }
                </div>
            </div>
        </>
    )
}
