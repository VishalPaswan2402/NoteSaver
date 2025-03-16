import React from 'react'

export default function Footer(props) {


    return (
        <>
            <foter>
                <div className='bg-cyan-800'>
                    <div className='social-link flex mt-1 justify-center'>
                        <a href='#'><div className='bg-white cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-blue-400 hover:text-white'><i className="fa-brands fa-linkedin-in"></i></div></a>
                        <a href='#'><div className='bg-white cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-blue-400 hover:text-white'><i className="fa-brands fa-x-twitter"></i></div></a>
                        <a href='#'><div className='bg-white cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-blue-400 hover:text-white'><i className="fa-brands fa-git"></i></div></a>
                        <a href='#'><div className='bg-white cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-blue-400 hover:text-white'><i className="fa-brands fa-instagram"></i></div></a>
                    </div>
                    <div>
                        <p className='text-center text-white'>Note Saver India, &copy; All rights reserved.</p>
                    </div>
                </div>
            </foter>
        </>
    )
}
