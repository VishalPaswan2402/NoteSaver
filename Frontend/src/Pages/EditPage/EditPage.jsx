import React from 'react'
import AddNew from '../../Components/AddNew/AddNew'

export default function EditPage(props) {


    return (
        <>
            <AddNew heading="Edit Your Note" title="previous title" disc="previous discription..." btnName="Update Note" edit={true} editType="editNote" />
        </>
    )
}
