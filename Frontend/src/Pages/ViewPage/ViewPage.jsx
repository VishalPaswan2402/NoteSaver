import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddNew from '../../Components/AddNew/AddNew';

export default function ViewPage(props) {
    const backendUrl = "http://localhost:8080";
    const [viewNote, setViewNote] = useState([]);
    const viewId = useParams();
    // console.log(viewId);
    useEffect(() => {
        const loadView = async () => {
            try {
                const response = await axios.get(`${backendUrl}/v1/view-note/${viewId.id}`);
                if (response.data) {
                    setViewNote(response.data);
                    console.log("response :", response.data);
                }
            } catch (error) {
                console.log("View Error", error);
            }
        }
        loadView();
    }, [])

    // useEffect(() => {
    //     console.log("Notes state updated:", viewNote);
    // }, [viewNote]);

    return (
        <>
            <h1>{props.heading}</h1>
            <AddNew heading="View Full Content" title={viewNote.title} edit={false} disc={viewNote.description} />
        </>
    )
}
