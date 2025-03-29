import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterOption } from '../../ReduxSlice/SliceFunction';

export default function FilterSearch(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropDownText, setDropDownText] = useState("Newest First");
    const [dropDownIcon, setDropDownIcon] = useState("clock");
    // const filterType = useSelector(state => state.notesaver.filterOption);
    const dispatch = useDispatch();

    const updateFilterBtn = (txt, icn) => {
        setDropDownIcon(icn);
        setDropDownText(txt);
        setIsOpen(prev => !prev);
        dispatch(setFilterOption(txt));
    }

    return (
        <>
            <div className='flex w-200 m-auto mt-4 justify-between flex-wrap'>
                <div className='w-4/6 flex justify-between border-2 focus-within:border-blue-600 transition-all duration-200 rounded-lg'>
                    <input placeholder='Enter keyword' className='focus:outline-none p-2 w-6/7 font-para text-xl'></input>
                    <button className='p-2 w-1/8 font-extrabold cursor-pointer text-lg hover:text-blue-800 rounded-lg'><i className="fa-solid fa-magnifying-glass"></i></button>
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
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}
