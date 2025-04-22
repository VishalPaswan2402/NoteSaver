import React from 'react';
import { aboutFeatures } from '../../Utility/AboutFeatures';
import './AboutPage.css';

export default function AboutPage(props) {

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className='mb-2'>
                    <h1 className='font-extrabold text-4xl text-center text-[#B03052] font-amarante mt-2'>About NoteDrive</h1>
                    <p className='text-center font-amarante text-[#D76C82]'>What You Can Do with NoteDrive.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {aboutFeatures.map((feature, index) => (
                        <div key={index} className="bg-[#ffadbd41] lightPinkButton btnColor rounded-lg p-5 hover:shadow-lg hover:border-[#B03052] hover:shadow-[#d76c8192] transition duration-300" style={{ transition: '0.5s' }}>
                            <div className="iconWrapper relative h-12 w-12 m-auto flex justify-center items-center">
                                <span className="wave absolute rounded-full border border-[#B03052] animate-wave1"></span>
                                <span className="wave absolute rounded-full border border-[#2d0af3] animate-wave2"></span>
                                <span className="wave absolute rounded-full border border-[#eb14b2] animate-wave3"></span>
                                <div className="z-10 text-[#D76C82] text-3xl">
                                    <i className={`${feature.icon}`}></i>
                                </div>
                            </div>
                            <h3 className="font-para text-center text-lg font-semibold text-[#B03052] mb-1">{feature.title}</h3>
                            <p className="text-gray-600 font-para text-md">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
