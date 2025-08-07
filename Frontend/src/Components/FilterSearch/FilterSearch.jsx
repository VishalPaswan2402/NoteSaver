import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterNoteType, setFilterNoteTypeIcon, setFilterOptionType, setFilterOptionTypeIcon, setOpenFiltereOption, setOpenTypeOption, setSearchQuery } from '../../ReduxSlice/SliceFunction';

export default function FilterSearch(props) {
    const isOpenType = useSelector(state => state.notesaver.openTypeOption);
    const isOpenFilter = useSelector(state => state.notesaver.openFilterOption);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const noteType = useSelector(state => state.notesaver.filterNoteType);
    const noteTypeIcon = useSelector(state => state.notesaver.filterNoteTypeIcon);
    const filterType = useSelector(state => state.notesaver.filterOptionType);
    const filterTypeIcon = useSelector(state => state.notesaver.filterOptionTypeIcon);
    const noteCount = useSelector(state => state.notesaver.allNotes);
    const filterCount = useSelector(state => state.notesaver.filteredCount);

    const updateNoteTypeBtn = (txt, icn) => {
        dispatch(setOpenTypeOption());
        dispatch(setFilterNoteType(txt));
        dispatch(setFilterNoteTypeIcon(icn));
    }

    const updateFilterTypeBtn = (txt, icn) => {
        dispatch(setOpenFiltereOption());
        dispatch(setFilterOptionType(txt));
        dispatch(setFilterOptionTypeIcon(icn));
    }

    useEffect(() => {
        dispatch(setSearchQuery(query));
    }, [query])

    return (
        <>
            {/* <div className=' flex w-200 m-auto mt-4 mb-4 justify-between flex-wrap'> */}

            <div className='sm:w-140 md:w-160 w-80 flex lg:w-200 m-auto mt-4 mb-4 justify-between flex-wrap'>
                <div className='w-3/7 md:3/9 sm:w-3/9 lg:w-3/9 flex justify-between'>
                    <input onChange={(e) => setQuery(e.target.value)} placeholder='Search notes...' className='focus:outline-[#3D0301] border-2 w-full p-2 font-para text-md rounded-lg border-[#D76C82] text-[#B03052]'></input>
                </div>

                <div className="flex justify-between items-center relative z-50 w-3/7 md:3/9 sm:w-3/9 lg:w-3/9 font-para text-md border-2 rounded-md border-[#D76C82]">
                    <p className='text-[#B03052] p-2'>
                        Notes : {filterCount < 10 ? `0${filterCount}` : filterCount}/{noteCount.length < 10 ? `0${noteCount.length}` : noteCount.length}
                    </p>
                    <i className="p-2 text-[#B03052] fa-regular fa-chess-king"></i>
                </div>
            </div>


            <div className='flex lg:w-200 w-80 sm:w-140 md:w-160 m-auto mt-4 mb-4 justify-between flex-wrap'>
                <div className="relative z-50 w-3/7 md:3/9 sm:w-3/9 lg:w-3/9 font-para text-md">
                    <button onClick={() => updateNoteTypeBtn(noteType, noteTypeIcon)} className="bg-[#EBE8DB] w-full border-2 h-full p-2 rounded-md border-[#D76C82] focus:border-[#3D0301] text-[#B03052] cursor-pointer flex justify-between items-center">
                        {noteType} <i className={`fa-regular fa-${noteTypeIcon}`}></i>
                    </button>
                    {isOpenType && (
                        <ul className="absolute left-0 w-full bg-[#EBE8DB] border-2 border-gray-300 shadow-lg shadow-[#D76C82] rounded-sm mt-1">
                            <li onClick={() => updateNoteTypeBtn("Non-Archieve", "file-lines")} className={`p-2 pinkButton btnColor ${noteType == "Non-Archieve" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-file-lines pr-1"></i>Non-Archieve</li>
                            <li onClick={() => updateNoteTypeBtn("All Notes", "window-restore")} className={`p-2 pinkButton btnColor ${noteType == "All Notes" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-window-restore pr-1"></i>All Notes</li>
                            <li onClick={() => updateNoteTypeBtn("Archive Notes", "trash-can")} className={`p-2 pinkButton btnColor ${noteType == "Archive Notes" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-trash-can pr-1"></i>Archive Notes</li>
                            <li onClick={() => updateNoteTypeBtn("Cloned Notes", "clone")} className={`p-2 pinkButton btnColor ${noteType == "Cloned Notes" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-clone pr-1"></i>Cloned Notes</li>
                        </ul>
                    )}
                </div>

                <div className="relative z-50 w-3/7 md:3/9 sm:w-3/9 lg:w-3/9 font-para text-md">
                    <button onClick={() => updateFilterTypeBtn(filterType, filterTypeIcon)} className="bg-[#EBE8DB] w-full border-2 h-full p-2 rounded-md border-[#D76C82] focus:border-[#3D0301] text-[#B03052] cursor-pointer flex justify-between items-center">
                        {filterType} <i className={`fa-regular fa-${filterTypeIcon}`}></i>
                    </button>
                    {isOpenFilter && (
                        <ul className="absolute left-0 w-full bg-[#EBE8DB] border-2 border-gray-300 shadow-lg shadow-[#D76C82] rounded-sm mt-1">
                            <li onClick={() => updateFilterTypeBtn("Favourite", "heart")} className={`p-2 pinkButton btnColor ${filterType == "Favourite" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-heart pr-1"></i>Favourite</li>
                            <li onClick={() => updateFilterTypeBtn("Newest First", "clock")} className={`p-2 pinkButton btnColor ${filterType == "Newest First" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-clock pr-1"></i>Newest First</li>
                            <li onClick={() => updateFilterTypeBtn("Oldest First", "hourglass")} className={`p-2 pinkButton btnColor ${filterType == "Oldest First" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-hourglass pr-1"></i>Oldest First</li>
                            <li onClick={() => updateFilterTypeBtn("A-Z Order", "circle-up")} className={`p-2 pinkButton btnColor ${filterType == "A-Z Order" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-circle-up pr-1"></i>A-Z Order</li>
                            <li onClick={() => updateFilterTypeBtn("Z-A Order", "circle-down")} className={`p-2 pinkButton btnColor ${filterType == "Z-A Order" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-circle-down pr-1"></i>Z-A Order</li>
                            <li onClick={() => updateFilterTypeBtn("All Notes", "window-restore")} className={`p-2 pinkButton btnColor ${filterType == "All Notes" ? 'hidden' : ''} cursor-pointer text-[#B03052] rounded-sm`}><i className="fa-regular fa-window-restore pr-1"></i>All Notes</li>
                        </ul>
                    )}
                </div>
            </div>



            {/* </div> */}
        </>
    )
}
