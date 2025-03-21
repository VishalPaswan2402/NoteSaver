import React, { useEffect, useState } from 'react'
import NoteList from '../../Components/NoteList/NoteList';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function HomePage(props) {
    const backendUrl = "http://localhost:8080";

    return (
        <>
            <ToastContainer autoClose={1500} position="bottom-center" />
            <div className='list-container grid overflow-auto '>
                <h1 className='font-semibold text-2xl text-center pt-2 text-rose-800'>All Your Notes Are Here...</h1>
                <NoteList name='note.title' desc='note.description' />
            </div>
        </>
    )
}
