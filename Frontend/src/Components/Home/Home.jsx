import React, { useEffect, useState } from 'react'
import NoteList from '../NoteList/NoteList'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Home(props) {
    const backendUrl = "http://localhost:8080";
    const [notes, setNotes] = useState([]);
    const loadAgain = useSelector(state => state.paste.loadNotes);
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/all_notes`);
                if (response.data) {
                    console.log(response.data);
                    setNotes(response.data);
                } else {
                    console.log("Not found");
                }
            } catch (error) {
                console.log("All notes error:", error);
            }
        };
        fetchNotes();
    }, [loadAgain]);

    // useEffect(() => {
    //     console.log("Notes state updated:", notes);
    // }, [notes]);

    return (
        <>
            <div className='list-container grid overflow-auto'>
                <h1 className='font-semibold text-2xl text-center pt-2 text-rose-800'>All Your Notes Is Here...</h1>
                {notes.slice().reverse().map(
                    (note) =>
                        <NoteList key={note._id} name={note.title} desc={note.description} uid={note._id} date={note.date} />
                )}
            </div>
        </>
    )
}
