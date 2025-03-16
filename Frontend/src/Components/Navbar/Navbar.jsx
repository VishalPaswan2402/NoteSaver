import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginLogout } from '../../ReduxSlice/SliceFunction'
import image from '../../assets/image';
import "./Navbar.css"

export default function Navbar(props) {
    const dispatch = useDispatch();
    let isLogin = useSelector(state => state.paste.login);
    const handleLogin = () => {
        dispatch(loginLogout())
    }

    return (
        <>
            <div id='navbar' className='flex place-content-between p-3 bg-cyan-800'>
                <div id='left-navbar'>
                    <div id='left-option' className='flex pl-7 gap-7'>
                        <NavLink to="/" className="site-logo logo-style" style={{ backgroundImage: `url(${image.logo})` }} ></NavLink>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-red-400"}>All</NavLink>
                        <NavLink to="/add-new" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-red-400"}>New</NavLink>
                    </div>
                </div>
                <div id='right-navbar' className='mr-7 cursor-pointer bg-white pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-blue-400 hover:text-white' onClick={handleLogin}>{isLogin ? "SignOut" : "SignIn"}</div>
            </div>
        </>
    )
}
