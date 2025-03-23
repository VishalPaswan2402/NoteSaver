import React from 'react'
import AddNew from '../../Components/AddNew/AddNew'

export default function NewPage(props) {

    return (
        <>
            <AddNew heading="Add Your New Note" btnName="Save Note" edit={true} editType="newNote" />
        </>
    )
}
