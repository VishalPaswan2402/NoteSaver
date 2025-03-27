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
    const location = useLocation();

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/all-notes/${userId}`);
                setNote(response.data.notes);
            } catch (error) {
                console.log("load error : ", error);
            }
        }
        fetchAllNotes();
    }, [])

    const handleDelete = (deletedNoteId) => {
        setNote(prevNotes => prevNotes.filter(note => note._id !== deletedNoteId));
    };

    useEffect(() => {
        if (location.state?.toastMessage) {
            console.log("toast msg : ", location.state.toastMessage);
            toast.success(location.state.toastMessage);
        }
    }, [location])

    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            {
                note.length > 0
                    ?
                    (
                        <div className='list-container grid overflow-auto'>
                            <h1 className='font-extrabold text-4xl text-center pt-3 text-rose-800 font-amarante'>Your Organized Notes</h1>
                            {note.slice().reverse().map((item) => (
                                <NoteList
                                    key={item._id}
                                    name={item.title}
                                    description={item.description}
                                    date={item.date}
                                    noteId={item._id}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )
                    :
                    (
                        <p className='text-fuchsia-700 font-medium text-2xl text-center m-10'>
                            Your notebook is empty. <br /> Add your first note!
                        </p>
                    )
            }
        </>
    )
}
