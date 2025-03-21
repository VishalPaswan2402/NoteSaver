import React, { useEffect, useState } from 'react'
import AddNew from '../../Components/AddNew/AddNew';

export default function ViewPage(props) {
    const backendUrl = "http://localhost:8080";

    return (
        <>
            <h1>Heading</h1>
            <AddNew heading="View Full Content" title='viewNote.title' disc='viewNote.description' />
        </>
    )
}
