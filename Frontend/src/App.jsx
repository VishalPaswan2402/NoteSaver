import './App.css';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import NewPage from './Pages/NewPage/NewPage';
import HomePage from './Pages/HomePage/HomePage';
import ViewPage from './Pages/ViewPage/ViewPage';
import EditPage from './Pages/EditPage/EditPage';
import { useDispatch, useSelector } from 'react-redux';
import LandingPage from './Pages/LandingPage/LandingPage';
import { useEffect, useState } from 'react';
import { setCurrentUserId, setIsAuthenticate } from './ReduxSlice/SliceFunction';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
  const currentId = useSelector(state => state.notesaver.currentUserId);


  useEffect(() => {
    console.log("isAuthenticated : ", isAuthenticated);
    const token = localStorage.getItem('token');
    const currId = localStorage.getItem('currentId');
    console.log(token);
    if (token) {
      dispatch(setIsAuthenticate(true));
      dispatch(setCurrentUserId(currId));
    } else {
      dispatch(setIsAuthenticate(false));
      navigate('/');
    }
  }, [navigate, isAuthenticated])


  return (
    <>
      <Navbar />
      <div className='pt-14'></div>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to={`/v1/all-notes/${currentId}`} /> : <LandingPage />} />
        <Route path={`/v1/all-notes/${currentId}`} element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path={`/v1/add-new/${currentId}`} element={isAuthenticated ? <NewPage heading="Add Your New Note" btnName="Save Note" edit={true} /> : <Navigate to="/" />} />
        <Route path="/v1/view-note/:id" element={isAuthenticated ? <ViewPage /> : <Navigate to="/" />} />
        <Route path="/v1/edit-page" element={isAuthenticated ? <EditPage /> : <Navigate to="/" />} />
        <Route path="*" element={isAuthenticated ? <Navigate to={`/v1/all-notes/${currentId}`} /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
