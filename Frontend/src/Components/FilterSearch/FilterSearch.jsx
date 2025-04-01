import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterNoteType, setFilterNoteTypeIcon, setFilterOptionType, setFilterOptionTypeIcon, setSearchQuery } from '../../ReduxSlice/SliceFunction';

export default function FilterSearch(props) {
    const [isOpenType, setIsOpenType] = useState(false);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const noteType = useSelector(state => state.notesaver.filterNoteType);
    const noteTypeIcon = useSelector(state => state.notesaver.filterNoteTypeIcon);
    const filterType = useSelector(state => state.notesaver.filterOptionType);
    const filterTypeIcon = useSelector(state => state.notesaver.filterOptionTypeIcon);
    const noteCount = useSelector(state => state.notesaver.allNotes);
    const filterCount = useSelector(state => state.notesaver.filteredCount);

    const updateNoteTypeBtn = (txt, icn) => {
        setIsOpenType(prev => !prev);
        dispatch(setFilterNoteType(txt));
        dispatch(setFilterNoteTypeIcon(icn));
    }

    const updateFilterTypeBtn = (txt, icn) => {
        setIsOpenFilter(prev => !prev);
        dispatch(setFilterOptionType(txt));
        dispatch(setFilterOptionTypeIcon(icn));
    }

    useEffect(() => {
        dispatch(setSearchQuery(query));
    }, [query])

    return (
        <>
            <div className='flex w-200 m-auto mt-4 justify-between flex-wrap'>
                
                <div className='w-3/9 flex justify-between'>
                    <input onChange={(e) => setQuery(e.target.value)} placeholder='Search notes...' className='focus:outline-blue-600 border-2 w-full p-2 font-para text-xl rounded-lg'></input>
                </div>

                <div className="flex justify-between items-center relative z-50 w-2/10 font-para text-xl border-2 rounded-md">
                    <p className='text-gray-700 p-2'>
                        Notes : {filterCount < 10 ? `0${filterCount}` : filterCount}/{noteCount.length < 10 ? `0${noteCount.length}` : noteCount.length}
                    </p>
                    <i className="p-2 text-gray-600 fa-regular fa-chess-king"></i>
                </div>

                <div className="relative z-50 w-2/10 font-para text-xl">
                    <button onClick={() => setIsOpenType(!isOpenType)} className="bg-white w-full border-2 h-full p-2 rounded-md border-black focus:border-blue-500 text-gray-700 cursor-pointer flex justify-between items-center">
                        {noteType} <i className={`fa-regular fa-${noteTypeIcon}`}></i>
                    </button>
                    {isOpenType && (
                        <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1">
                            <li onClick={() => updateNoteTypeBtn("Non-Archieve", "file-lines")} className={`p-2 hover:bg-gray-200 ${noteType == "Non-Archieve" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-file-lines pr-1"></i>Non-Archieve</li>
                            <li onClick={() => updateNoteTypeBtn("All Notes", "window-restore")} className={`p-2 hover:bg-gray-200 ${noteType == "All Notes" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-window-restore pr-1"></i>All Notes</li>
                            <li onClick={() => updateNoteTypeBtn("Archive Notes", "trash-can")} className={`p-2 hover:bg-gray-200 ${noteType == "Archive Notes" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-trash-can pr-1"></i>Archive Notes</li>
                        </ul>
                    )}
                </div>

                <div className="relative z-50 w-2/10 font-para text-xl">
                    <button onClick={() => setIsOpenFilter(!isOpenFilter)} className="bg-white w-full border-2 h-full p-2 rounded-md border-black focus:border-blue-500 text-gray-700 cursor-pointer flex justify-between items-center">
                        {filterType} <i className={`fa-regular fa-${filterTypeIcon}`}></i>
                    </button>
                    {isOpenFilter && (
                        <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1">
                            <li onClick={() => updateFilterTypeBtn("Favourite", "heart")} className={`p-2 hover:bg-gray-200 ${filterType == "Favourite" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-heart pr-1"></i>Favourite</li>
                            <li onClick={() => updateFilterTypeBtn("Newest First", "clock")} className={`p-2 hover:bg-gray-200 ${filterType == "Newest First" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-clock pr-1"></i>Newest First</li>
                            <li onClick={() => updateFilterTypeBtn("Oldest First", "hourglass")} className={`p-2 hover:bg-gray-200 ${filterType == "Oldest First" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-hourglass pr-1"></i>Oldest First</li>
                            <li onClick={() => updateFilterTypeBtn("A-Z Order", "circle-up")} className={`p-2 hover:bg-gray-200 ${filterType == "A-Z Order" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-circle-up pr-1"></i>A-Z Order</li>
                            <li onClick={() => updateFilterTypeBtn("Z-A Order", "circle-down")} className={`p-2 hover:bg-gray-200 ${filterType == "Z-A Order" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-circle-down pr-1"></i>Z-A Order</li>
                            <li onClick={() => updateFilterTypeBtn("All Notes", "window-restore")} className={`p-2 hover:bg-gray-200 ${filterType == "All Notes" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-window-restore pr-1"></i>All Notes</li>
                        </ul>
                    )}
                </div>

            </div>
        </>
    )
}
