import React, { useEffect, useState } from 'react'
import AddNew from '../../Components/AddNew/AddNew'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function EditPage(props) {
    const backendUrl = "http://localhost:8080";
    const editId = useParams();
    console.log("edit id : ", editId);
    const [noteView, setNoteView] = useState(null);
    useEffect(() => {
        const fetchCurrentNote = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/view-note/${editId.id}`);
                console.log(response.data);
                setNoteView(response.data.viewNote);
            }
            catch (error) {
                toast.error("Something went wrong.");
                console.log("View page error", error);
            }
        }
        if (editId.id) {
            fetchCurrentNote();
        }
    }, [])

    useEffect(() => {
        console.log("Note view is :");
        console.log(noteView);
    }, [noteView])

    return (
        <>
            {
                noteView
                    ?
                    (
                        <AddNew heading="Edit Your Note" title={noteView.title} disc={noteView.description} btnName="Update Note" edit={true} editType="editNote" editNoteId={editId.id} />
                    )
                    :
                    <p className='text-blue-700 text-3xl font-bold text-center m-20'>Loading...</p>
            }
        </>
    )
}
