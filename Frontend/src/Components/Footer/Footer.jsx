import React from 'react'

export default function Footer(props) {

    return (
        <>
            <footer className="bg-[#B03052] text-[#EBE8DB] py-3 mt-2">
                <div className="flex justify-between px-5">
                    {/* Brand & Description */}
                    <div className='w-[35%] font-para'>
                        <h2 className="text-lg font-amarante font-bold text-[#ff89a0] mb-2">NoteDrive</h2>
                        <p className="text-[17px] text-[#EBE8DB]">
                            Securely save, manage, and share your notes. Built with the MERN stack for productivity lovers.
                        </p>
                        <a href='mailto:vishalvp.3405@gmail.com' className="text-[17px] text-red-300 hover:text-white">Have questions or feedback?</a>
                    </div>
                    {/* Quick Links */}
                    <div className='w-[35%] text-right '>
                        <h3 className="text-lg font-amarante font-bold text-[#ff89a0] mb-2">Other Sites</h3>
                        <ul className="font-para text-[17px] text-[#EBE8DB]">
                            <li><a href="https://sharewhere.onrender.com/" target='_blank' className="hover:text-red-300">Share Where</a></li>
                            <li><a href="https://attendance-tracker-4j6u.onrender.com/" target='_blank' className="hover:text-red-300">Attendance Tracker</a></li>
                            <li><a href="https://letscode-vxit.onrender.com/" target='_blank' className="hover:text-red-300">Lets Code</a></li>
                            <li><a href="https://assigncomplete.onrender.com/" target='_blank' className="hover:text-red-300">Text Formatter</a></li>
                        </ul>
                    </div>
                </div>
                {/* Bottom line */}
                <div className='social-link flex justify-center text-red-900'>
                    <a href='https://www.linkedin.com/in/vishal-paswan-59772925b' target='_blank'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-linkedin-in"></i></div></a>
                    <a href='https://x.com/VishalPaswan24' target='_blank'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-x-twitter"></i></div></a>
                    <a href='https://github.com/VishalPaswan2402' target='_blank'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-git"></i></div></a>
                    <a href='https://www.instagram.com/imvishal2402' target='_blank'><div className='bg-[#EBE8DB] cursor-pointer w-8 rounded-full p-1 mt-1 ml-2 text-center border-1 hover:bg-[#3D0301] hover:text-white'><i className="fa-brands fa-instagram"></i></div></a>
                </div>
                <div className="text-center font-para text-[18px] text-[#EBE8DB]">
                    &copy; {new Date().getFullYear()} NoteDrive. All rights reserved.
                </div>
            </footer>
        </>
    )
}
