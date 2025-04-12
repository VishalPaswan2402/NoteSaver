import React from 'react'
import image from '../../assets/image';
import "./Navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticate } from '../../ReduxSlice/SliceFunction';

export default function Navbar(props) {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
    const currId = useSelector(state => state.notesaver.currentUserId);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.setItem('logout', Date.now()); // ⚠️ very important
        dispatch(setIsAuthenticate(false));
        navigate('/');
    }

    return (
        <>
            <div id='navbar' className='flex place-content-between p-3 bg-[#B03052] z-100 fixed t-0 w-screen'>
                <div id='left-navbar'>
                    <div id='left-option' className='flex pl-6 gap-3'>
                        <div className="site-logo logo-style" style={{ backgroundImage: `url(${image.logo})` }} ></div>
                        {
                            isAuthenticated
                                ?
                                <div className='flex gap-5'>
                                    <NavLink to={`/v1/all-notes/${currId}`} className={({ isActive }) => isActive ? "active-link font-amarante" : "text-red-400 font-amarante hover:text-[#3D0301]"}>All-Notes</NavLink>
                                    <NavLink to={`/v1/add-new/${currId}`} className={({ isActive }) => isActive ? "active-link font-amarante" : "text-red-400 font-amarante hover:text-[#3D0301]"}>New-Note</NavLink>
                                </div>
                                :
                                <p className='text-[#EBE8DB] font-amarante'>Note Saver</p>
                        }
                    </div>
                </div>
                <div className='right-navbar flex'>
                    {
                        isAuthenticated
                            ?
                            <>
                                <div className='bg-[#EBE8DB] mr-4 h-8 w-8 text-center rounded-full pt-0.5 text-[#B03052]'><i className="fa-solid fa-user"></i></div>
                                <div onClick={handleLogOut} id='right-navbar' className='mr-7 cursor-pointer bg-[#EBE8DB] pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-[#3D0301] hover:text-white font-amarante text-[#B03052]'>LogOut</div>
                            </>
                            :
                            <a href='/'>
                                <>
                                    <div id='right-navbar' className='mr-7 cursor-pointer bg-[#EBE8DB] pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-[#3D0301] hover:text-white font-amarante text-[#B03052]'>Login</div>
                                </>
                            </a>
                    }
                </div>
            </div>
        </>
    )
}
