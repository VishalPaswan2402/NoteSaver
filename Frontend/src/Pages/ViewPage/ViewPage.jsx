import React, { useEffect, useState } from 'react'
import AddNew from '../../Components/AddNew/AddNew';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchNote } from '../../Utility/FetchNote';

export default function ViewPage(props) {
    const backendUrl = "http://localhost:8080";
    const currId = useSelector(state => state.notesaver.currentUserId);
    const noteIds = useParams();
    const [noteView, setNoteView] = useState(null);

    useEffect(() => {
        if (noteIds.id) {
            fetchNote(noteIds.id, setNoteView);
        }
    }, [])

    return (
        <>
            {
                noteView
                    ?
                    (
                        <AddNew
                            heading="View Full Content"
                            title={noteView.title}
                            disc={noteView.description}
                        />
                    )
                    :
                    (
                        <p className='text-fuchsia-700 font-medium text-2xl text-center m-10'>Loading...</p>
                    )
            }
        </>
    )
}
