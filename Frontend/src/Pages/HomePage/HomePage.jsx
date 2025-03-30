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
    const searchValue = useSelector(state => state.notesaver.searchQuerys);

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
        let filteredNotes = [...notes];
        if (filterType === "Newest First") {
            filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (filterType === "Oldest First") {
            filteredNotes.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (filterType === "Favourite") {
            filteredNotes.sort((a, b) => (b.isImportant - a.isImportant) || (new Date(b.date) - new Date(a.date)));
        } else if (filterType === "A-Z Order") {
            filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
        } else if (filterType === "Z-A Order") {
            filteredNotes.sort((a, b) => b.title.localeCompare(a.title));
        }
        return filteredNotes.filter(note => note.title.toLowerCase().includes(searchValue.toLowerCase()));
    }, [filterType, notes, searchValue]);


    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            <h1 className='font-extrabold text-4xl text-center pt-3 text-rose-800 font-amarante'>Your Organized Notes</h1>
            {
                notes.length > 0 ? <FilterSearch /> : null
            }
            {
                (sortedNotes.length == 0 && notes.length > 0)
                    ?
                    <p className='text-fuchsia-700 font-medium text-2xl text-center m-10'>
                        Oops! No matching notes. <br /> Try a new keyword!
                    </p> :
                    notes.length > 0
                        ?
                        (
                            <div className='list-container grid overflow-auto'>
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
