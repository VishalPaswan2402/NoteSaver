import React from 'react'

export default function Footer(props) {

    return (
        <>
            <div>
                <div className='bg-[#B03052]'>
                    <div className='social-link flex mt-1 justify-center'>
                        <a href='#'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-linkedin-in"></i></div></a>
                        <a href='#'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-x-twitter"></i></div></a>
                        <a href='#'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-git"></i></div></a>
                        <a href='#'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-instagram"></i></div></a>
                    </div>
                    <div>
                        <p className='text-center text-[#EBE8DB]'>Note Saver India, &copy; All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
