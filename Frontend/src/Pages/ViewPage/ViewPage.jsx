import React, { useEffect, useState } from 'react'
import AddNew from '../../Components/AddNew/AddNew';
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchNote } from '../../Utility/FetchNote';

export default function ViewPage(props) {
    const noteIds = useParams();
    const [noteView, setNoteView] = useState(null);
    const isChangeOccurs = useSelector(state => state.notesaver.viewPageChange);
    const userId = useSelector(state => state.notesaver.currentUserId);

    useEffect(() => {
        if (noteIds.id) {
            fetchNote(noteIds.id, setNoteView);
        }
        return;
    }, [isChangeOccurs])

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
                            isArch={noteView.isArchive}
                        />
                    )
                    :
                    (
                        <p className='text-[#D76C82] text-2xl font-bold font-para text-center m-10'>
                            Nothing to show. <br />
                            <Link to={`/v1/all-notes/${userId}`} className='hover:text-[#B03052]'>Go back to home page !</Link>
                        </p>
                    )
            }
        </>
    )
}
