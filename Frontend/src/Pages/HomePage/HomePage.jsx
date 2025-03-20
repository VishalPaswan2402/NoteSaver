import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import NoteList from '../../Components/NoteList/NoteList';
import Banner from '../../Components/Banner/Banner';
import { toast, ToastContainer } from 'react-toastify';
import { loginLogout, setCurrentUserId } from '../../ReduxSlice/SliceFunction.js';
import Cookies from 'js-cookie';

export default function HomePage(props) {
    const backendUrl = "http://localhost:8080";
    const dispatch = useDispatch();
    const [notes, setNotes] = useState([]);
    const isLogin = useSelector(state => state.paste.login);
    const loadAgain = useSelector(state => state.paste.loadNotes);
    const currentUserId = useSelector(state => state.paste.currentUserId);

    useEffect(() => {
        const userId = Cookies.get("currentId");
        if (userId) {
            dispatch(setCurrentUserId(userId));
            dispatch(loginLogout());
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!currentUserId) return; 
            try {
                const response = await axios.get(`${backendUrl}/v1/all-notes/${currentUserId}`);
                if (response.data.notes.length > 0) {  
                    console.log("All notes fetched :", response.data);
                    setNotes(response.data.notes);
                } else {
                    console.log("No notes found.");
                    return;
                }
            } catch (error) {
                console.log("All notes error:", error);
                toast.error("Something went wrong. Please try again.");
            }
        };

        if (isLogin) {
            fetchNotes();
        }
    }, [isLogin, loadAgain, currentUserId]);

    return (
        <>
            <ToastContainer autoClose={1500} position="bottom-center" />
            {
                isLogin
                    ?
                    (
                        <div className='list-container grid overflow-auto '>
                            <h1 className='font-semibold text-2xl text-center pt-2 text-rose-800'>All Your Notes Are Here...</h1>
                            {notes.length > 0 ? (
                                notes.slice().reverse().map(
                                    (note) =>
                                        <NoteList key={note._id} name={note.title} desc={note.description} uid={note._id} date={note.date} />
                                )
                            ) : (
                                <p className="text-center text-gray-500 mt-5">No notes found.</p>
                            )}
                        </div>
                    )
                    :
                    <Banner />
            }
        </>
    )
}
