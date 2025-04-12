import React, { useEffect, useMemo, useState } from 'react'
import NoteList from '../../Components/NoteList/NoteList';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleMarkNote, handleOnArchiveNote, handleOnDeleteNote, setAllNotes, setFilterNoteCount, setFilterNoteType, setFilterOptionType } from '../../ReduxSlice/SliceFunction';
import FilterSearch from '../../Components/FilterSearch/FilterSearch';
import { filterAndSortedNote } from '../../Utility/FilterAndSortedNote';

export default function HomePage(props) {
    const backendUrl = "http://localhost:8080";
    const userId = useSelector(state => state.notesaver.currentUserId);
    const notes = useSelector(state => state.notesaver.allNotes);
    const noteType = useSelector(state => state.notesaver.filterNoteType);
    const filterType = useSelector(state => state.notesaver.filterOptionType);
    const isArch = useSelector(state => state.notesaver.isArc);
    const location = useLocation();
    const dispatch = useDispatch();
    const searchValue = useSelector(state => state.notesaver.searchQuerys);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllNotes = async () => {
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const response = await axios.get(`${backendUrl}/v1/all-notes/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setAllNotes(response.data.notes));
                dispatch(setFilterNoteType("Non-Archieve"));
                dispatch(setFilterOptionType("Newest First"));
            } catch (error) {
                console.log("load error : ", error);
            }
        }
        fetchAllNotes();
    }, [isArch])

    const handleDelete = (deletedNoteId) => {
        dispatch(handleOnDeleteNote(deletedNoteId));
    };

    const updateMark = (id) => {
        dispatch(handleMarkNote(id));
    }

    const handleArchieve = (id) => {
        dispatch(handleOnArchiveNote(id));
    }

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location])

    const sortedNotes = useMemo(() => {
        return filterAndSortedNote(notes, noteType, filterType, searchValue);
    }, [filterType, noteType, notes, searchValue]);

    useEffect(() => {
        dispatch(setFilterNoteCount(sortedNotes.length));
    }, [sortedNotes, dispatch]);


    return (
        <>
            <ToastContainer position='top-center' autoClose={1500} />
            <h1 className='font-extrabold text-4xl text-center pt-3 text-[#B03052] font-amarante'>Your Organized Notes</h1>
            {
                notes.length > 0 ? <FilterSearch /> : null
            }
            {
                (sortedNotes.length == 0 && notes.length > 0)
                    ?
                    <p className='text-[#D76C82] text-2xl font-bold font-para text-center m-10'>
                        Oops ! No matches found. <br /> Please try a different keyword !
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
                                        isArch={item.isArchive}
                                        onArchive={handleArchieve}
                                        archDate={item.archiveDate}
                                        originalId={item.originalNoteId}
                                        isEditable={item.isEditable}
                                    />
                                ))}
                            </div>
                        )
                        :
                        (
                            <p className='text-[#D76C82] text-2xl font-bold font-para text-center m-10'>
                                Your notebook is empty. <br />
                                <Link to={`/v1/add-new/${userId}`} className='hover:text-[#B03052]'>Click to add your first note !</Link>
                            </p>
                        )
            }
        </>
    )
}
