import React from 'react'
import image from '../../assets/image';
import "./Navbar.css"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticate } from '../../ReduxSlice/SliceFunction';

export default function Navbar(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
    const currId = useSelector(state => state.notesaver.currentUserId);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentId');
        dispatch(setIsAuthenticate(false));
    }

    return (
        <>
            <div id='navbar' className='flex place-content-between p-3 bg-cyan-800 fixed t-0 w-screen'>
                <div id='left-navbar'>
                    <div id='left-option' className='flex pl-6 gap-4'>
                        <div className="site-logo logo-style" style={{ backgroundImage: `url(${image.logo})` }} ></div>
                        {
                            isAuthenticated
                                ?
                                <div className='flex gap-5'>
                                    <NavLink to={`/v1/all-notes/${currId}`} className={({ isActive }) => isActive ? "active-link font-amarante" : "text-white font-amarante hover:text-red-400"}>All</NavLink>
                                    <NavLink to={`/v1/add-new/${currId}`} className={({ isActive }) => isActive ? "active-link font-amarante" : "text-white font-amarante hover:text-red-400"}>New</NavLink>
                                </div>
                                :
                                <p className='text-white font-amarante'>Note Kare</p>
                        }
                    </div>
                </div>
                <div className='right-navbar flex'>
                    {
                        isAuthenticated
                            ?
                            <>
                                <div className='bg-white mr-4 h-8 w-8 text-center rounded-full pt-0.5'><i className="fa-solid fa-user"></i></div>
                                <div onClick={handleLogOut} id='right-navbar' className='mr-7 cursor-pointer bg-white pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-blue-400 hover:text-white font-amarante'>SignOut</div>
                            </>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
}
