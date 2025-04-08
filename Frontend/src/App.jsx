import './App.css';
import { Route, Routes, Navigate, useNavigate, useParams } from "react-router-dom";
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
import AlertOption from './Components/AlertOption/AlertOption';
import ShareOption from './Components/ShareOption/ShareOption';
// import EnterCode from './Pages/EnterCode/EnterCode';
import ShareLink from './Components/ShareLink/ShareLink';
// import ShareEdit from './Components/ShareEdit/ShareEdit';
import CodeBox from './Components/CodeBox/CodeBox';
import EditShare from './Pages/EditShare/EditShare';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
  const currentId = useSelector(state => state.notesaver.currentUserId);
  const showAlert = useSelector(state => state.notesaver.showAlertBox);
  const noteCount = useSelector(state => state.notesaver.allNotes);
  const showCloneShare = useSelector(state => state.notesaver.displayShareOption);
  const showCodeBox = useSelector(state => state.notesaver.displayCodeBox);
  const showLinkBox = useSelector(state => state.notesaver.displayLinkBox);
  const shareid = useSelector(state => state.notesaver.sharedNoteId);
  const shareEditBox = useSelector(state => state.notesaver.shareEditCodeBox);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const currId = localStorage.getItem('currentId');
    if (token) {
      dispatch(setIsAuthenticate(true));
      dispatch(setCurrentUserId(currId));
    } else {
      dispatch(setIsAuthenticate(false));
      // navigate('/');
    }
  }, [navigate, isAuthenticated])


  return (
    <>
      {showAlert ? <AlertOption /> : null}
      {showCloneShare ? <ShareOption /> : null}
      {showCodeBox ? <CodeBox /> : null}
      {showLinkBox ? <ShareLink /> : null}
      {shareEditBox ? <CodeBox codeType={'shareEdit'}/> : null }
      <div className={`${(showAlert || showCloneShare || showCodeBox || showLinkBox || shareEditBox) ? ' blur-sm pointer-events-none' : "bg-[#EBE8DB]"}`}>
        <Navbar />
        <div className='pt-14'></div>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={`/v1/all-notes/${currentId}`} /> : <LandingPage />} />
          <Route path={`/v1/all-notes/${currentId}`} element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
          <Route path={`/v1/add-new/${currentId}`} element={isAuthenticated ? <NewPage /> : <Navigate to="/" />} />
          <Route path="/v1/view-note/:id" element={<ViewPage />} />
          <Route path="/v1/write-original-file/:id" element={<EditShare />} />
          <Route path="/v1/edit-page/:id" element={isAuthenticated ? <EditPage /> : <Navigate to="/" />} />
          {/* <Route path="/v1/enter-share-code/:id" element={isAuthenticated ? <EnterCode /> : <Navigate to="/" />} /> */}
          {/* <Route path="/v1/code-page/:id" element={<EnterCode />} /> */}
          <Route path="*" element={isAuthenticated ? <Navigate to={`/v1/all-notes/${currentId}`} /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
