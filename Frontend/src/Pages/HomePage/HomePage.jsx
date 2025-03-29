import React, { useEffect, useMemo, useState } from 'react'
import NoteList from '../../Components/NoteList/NoteList';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { handleMarkNote, handleOnDeleteNote, setAllNotes } from '../../ReduxSlice/SliceFunction';
import FilterSearch from '../../Components/FilterSearch/FilterSearch';

export default function HomePage(props) {
    const backendUrl = "http://localhost:8080";
    const userId = useSelector(state => state.notesaver.currentUserId);
    const notes = useSelector(state => state.notesaver.allNotes);
    const filterType = useSelector(state => state.notesaver.filterOption);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/all-notes/${userId}`);
                dispatch(setAllNotes(response.data.notes));
            } catch (error) {
                console.log("load error : ", error);
            }
        }
        fetchAllNotes();
    }, [])

    // useEffect(() => {
    //     console.log("my notes", notes);
    // }, [notes]);

    const handleDelete = (deletedNoteId) => {
        dispatch(handleOnDeleteNote(deletedNoteId));
    };

    const updateMark = (id) => {
        dispatch(handleMarkNote(id));
    }

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
        }
    }, [location])

    const sortedNotes = useMemo(() => {
        if (!notes) return [];
    
        return [...notes].sort((a, b) => {
            if (filterType === "Newest First") {
                return new Date(b.date).getTime() - new Date(a.date).getTime(); // Latest added first
            } else if (filterType === "Oldest First") {
                return new Date(a.date).getTime() - new Date(b.date).getTime(); // Oldest added first
            } else if (filterType === "Favourite") {
                return (b.isImportant === a.isImportant)
                    ? new Date(b.date).getTime() - new Date(a.date).getTime() // Sort by newest if importance is the same
                    : b.isImportant - a.isImportant; // Important notes first
            } else if (filterType === "A-Z Order") {
                return a.title.localeCompare(b.title); // Alphabetical order
            } else if (filterType === "Z-A Order") {
                return b.title.localeCompare(a.title); // Reverse alphabetical order
            }
            return 0;
        });
    }, [filterType, notes]);

    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            {
                sortedNotes.length > 0
                    ?
                    (
                        <div className='list-container grid overflow-auto'>
                            <h1 className='font-extrabold text-4xl text-center pt-3 text-rose-800 font-amarante'>Your Organized Notes</h1>
                            <FilterSearch />
                            {sortedNotes.map((item) => (
                                <NoteList
                                    key={item._id}
                                    name={item.title}
                                    description={item.description}
                                    date={new Date(item.date).toLocaleString()}
                                    noteId={item._id}
                                    imp={item.isImportant}
                                    onDelete={handleDelete}
                                    onMark={updateMark}
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
