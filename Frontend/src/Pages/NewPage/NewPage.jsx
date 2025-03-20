import React from 'react'
import AddNew from '../../Components/AddNew/AddNew'
import { useSelector } from 'react-redux'
import Banner from '../../Components/Banner/Banner';

export default function NewPage(props) {
    const isLogin = useSelector(state => state.paste.login);
    console.log("addnew", isLogin)

    return (
        <>
            {
                isLogin
                    ?
                    <AddNew heading="Add Your New Note" btnName="Save Note" edit={true} />
                    :
                    <Banner />
            }
        </>
    )
}
