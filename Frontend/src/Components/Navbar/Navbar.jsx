import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadAllNotes, loginLogout } from '../../ReduxSlice/SliceFunction.js'
import image from '../../assets/image';
import "./Navbar.css"

export default function Navbar(props) {
    const dispatch = useDispatch();
    let isLogin = useSelector(state => state.paste.login);
    let isLoad = useSelector(state => state.paste.loadNotes);
    const handleLogin = () => {
        dispatch(loginLogout())
    }
    const loadAgain = () => {
        dispatch(loadAllNotes())
    }
    // console.log("Loader",isLoad);

    return (
        <>
            <div id='navbar' className='flex place-content-between p-3 bg-cyan-800 fixed t-0 w-screen'>
                <div id='left-navbar'>
                    <div id='left-option' className='flex pl-6 gap-4'>
                        <NavLink to="/" className="site-logo logo-style" style={{ backgroundImage: `url(${image.logo})` }} onClick={loadAgain} ></NavLink>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-red-400"} onClick={loadAgain}>All</NavLink>
                        <NavLink to="/v1/add-new" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-red-400"}>New</NavLink>
                    </div>
                </div>
                <div className='right-navbar flex'>
                    {
                        isLogin
                            ?
                            <div className='bg-white mr-4 h-8 w-8 text-center rounded-full pt-0.5'><i className="fa-solid fa-user"></i></div>
                            :
                            null
                    }
                    <div id='right-navbar' className='mr-7 cursor-pointer bg-white pl-4 pr-4 pt-1 pb-1 rounded-md hover:bg-blue-400 hover:text-white' onClick={handleLogin}>{isLogin ? "SignOut" : "SignIn"}</div>
                </div>
            </div>
        </>
    )
}
