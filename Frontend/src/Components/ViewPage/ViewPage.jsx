import React from 'react'
import AddNew from '../AddNew/AddNew'

export default function ViewPage(props) {

    return (
        <>
            <h1>{props.heading}</h1>
            <AddNew heading="View Full Content" title="title..." edit={false} disc="full description is here..." />
        </>
    )
}
