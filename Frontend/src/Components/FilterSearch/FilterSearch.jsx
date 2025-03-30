import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOption, setSearchQuery } from '../../ReduxSlice/SliceFunction';

export default function FilterSearch(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownText, setDropDownText] = useState("Newest First");
    const [dropDownIcon, setDropDownIcon] = useState("clock");
    // const filterType = useSelector(state => state.notesaver.filterOption);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    // console.log(query);

    const updateFilterBtn = (txt, icn) => {
        setDropDownIcon(icn);
        setDropDownText(txt);
        setIsOpen(prev => !prev);
        dispatch(setFilterOption(txt));
    }

    useEffect(() => {
        dispatch(setSearchQuery(query));
    }, [query])

    return (
        <>
            <div className='flex w-200 m-auto mt-4 justify-between flex-wrap'>
                <div className='w-4/6 flex justify-between'>
                    <input onChange={(e) => setQuery(e.target.value)} placeholder='Search notes...' className='focus:outline-blue-600 border-2 w-full p-2 font-para text-xl rounded-lg'></input>
                </div>
                <div className="relative z-50 w-1/4 font-para text-xl">
                    <button onClick={() => setIsOpen(!isOpen)} className="bg-white w-full border-2 h-full p-2 rounded-md border-black focus:border-blue-500 text-gray-700 cursor-pointer flex justify-between items-center">
                        {dropDownText} <i className={`fa-regular fa-${dropDownIcon}`}></i>
                    </button>
                    {isOpen && (
                        <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1">
                            <li onClick={() => updateFilterBtn("Favourite", "heart")} className={`p-2 hover:bg-gray-200 ${dropDownText == "Favourite" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-heart pr-1"></i>Favourite</li>
                            <li onClick={() => updateFilterBtn("Newest First", "clock")} className={`p-2 hover:bg-gray-200 ${dropDownText == "Newest First" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-clock pr-1"></i>Newest First</li>
                            <li onClick={() => updateFilterBtn("Oldest First", "hourglass")} className={`p-2 hover:bg-gray-200 ${dropDownText == "Oldest First" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-hourglass pr-1"></i>Oldest First</li>
                            <li onClick={() => updateFilterBtn("A-Z Order", "circle-up")} className={`p-2 hover:bg-gray-200 ${dropDownText == "A-Z Order" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-circle-up pr-1"></i>A-Z Order</li>
                            <li onClick={() => updateFilterBtn("Z-A Order", "circle-down")} className={`p-2 hover:bg-gray-200 ${dropDownText == "Z-A Order" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-circle-down pr-1"></i>Z-A Order</li>
                            <li onClick={() => updateFilterBtn("Archive Notes", "folder")} className={`p-2 hover:bg-gray-200 ${dropDownText == "Archive Notes" ? 'hidden' : ''} cursor-pointer`}><i className="fa-regular fa-folder pr-1"></i>Archive Notes</li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}
