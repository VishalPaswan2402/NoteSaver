import React from 'react'
import "./Home.css"
import NoteList from '../NoteList/NoteList'

export default function Home(props) {

    return (
        <>
            <div className='list-container grid max-h-143 overflow-auto'>
                <h1 className='font-semibold text-2xl text-center pt-2 text-rose-800'>All Your Notes Is Here...</h1>
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
                <NoteList name="101" />
            </div>
        </>
    )
}
