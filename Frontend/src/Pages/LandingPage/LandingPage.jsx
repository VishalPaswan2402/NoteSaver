import React, { useEffect } from 'react'
import Banner from '../../Components/Banner/Banner'
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../HomePage/HomePage';
import axios from 'axios';

export default function LandingPage(props) {
    const backendUrl = "http://localhost:8080";

    return (
        <>
            <Banner />
        </>
    )
}
