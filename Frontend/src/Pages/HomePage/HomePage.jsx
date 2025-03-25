import React, { useEffect, useState } from 'react'
import NoteList from '../../Components/NoteList/NoteList';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function HomePage(props) {
    const backendUrl = "http://localhost:8080";
    const userId = useSelector(state => state.notesaver.currentUserId);
    const [note, setNote] = useState([]);


    useEffect(() => {
        const fetchAllNotes = async () => {
            // console.log("All notes called...");
            try {
                const response = await axios.get(`${backendUrl}/v1/all-notes/${userId}`);
                // console.log(response);
                setNote(response.data.notes);
            } catch (error) {
                console.log("load error : ", error);
            }
        }
        fetchAllNotes();
    }, [])

    // useEffect(() => {
    //     console.log("all", note);
    // }, [note])

    const location = useLocation();
    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
        }
    }, [location])

    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            <div className='list-container grid overflow-auto '>
                <h1 className='font-semibold text-2xl text-center pt-2 text-rose-800'>Your All Saved Notes</h1>
                {
                    note.reverse().map((item) =>
                        <NoteList key={item._id} name={item.title} description={item.description} date={item.date} noteId={item._id} />
                    )
                }
            </div>
        </>
    )
}
