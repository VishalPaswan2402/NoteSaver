import React, { useEffect, useState } from 'react'
import AddNew from '../../Components/AddNew/AddNew'
import { useParams } from 'react-router-dom'
import { fetchNote } from '../../Utility/FetchNote';

export default function EditPage(props) {
    const editId = useParams();
    const [noteView, setNoteView] = useState(null);

    useEffect(() => {
        if (editId.id) {
            fetchNote(editId.id, setNoteView);
        }
    }, [])

    return (
        <>
            {
                noteView
                    ?
                    (
                        <AddNew heading="Edit Your Note" title={noteView.title} disc={noteView.description} btnName="Update Note" edit={true} editType="editNote" editNoteId={editId.id} isArch={noteView.isArchive} />
                    )
                    :
                    <p className='text-blue-700 text-2xl font-para font-semibold text-center m-20'>Loading...</p>
            }
        </>
    )
}
