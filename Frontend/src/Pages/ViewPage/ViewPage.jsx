import React, { useEffect, useState } from 'react'
import AddNew from '../../Components/AddNew/AddNew';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function ViewPage(props) {
    const backendUrl = "http://localhost:8080";
    const currId = useSelector(state => state.notesaver.currentUserId);
    const noteIds = useParams();
    const [noteView, setNoteView] = useState(null);
    console.log("noteId : ", noteIds.id);
    useEffect(() => {
        const fetchCurrentNote = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/view-note/${noteIds.id}`);
                console.log(response.data);
                setNoteView(response.data.viewNote);
            }
            catch (error) {
                toast.error("Something went wrong.");
                console.log("View page error", error);
            }
        }
        if (noteIds.id) {
            fetchCurrentNote();
        }
    }, [])

    // useEffect(() => {
    //     console.log("Note view is :");
    //     console.log(noteView);
    // }, [noteView])

    return (
        <>
            {noteView ? (
                <AddNew
                    heading="View Full Content"
                    title={noteView.title}
                    disc={noteView.description}
                />
            ) : (
                <p className='text-blue-700 text-3xl font-bold text-center m-20'>Loading...</p>
            )}
        </>
    )
}
