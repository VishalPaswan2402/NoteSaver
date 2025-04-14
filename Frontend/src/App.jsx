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
import { setCurrentUserId, setIsAuthenticate, setUserName } from './ReduxSlice/SliceFunction';
import AlertOption from './Components/AlertOption/AlertOption';
import ShareOption from './Components/ShareOption/ShareOption';
import ShareLink from './Components/ShareLink/ShareLink';
import CodeBox from './Components/CodeBox/CodeBox';
import EditShare from './Pages/EditShare/EditShare';
import { jwtDecode } from "jwt-decode";
import ProfileView from './Components/ProfileView/ProfileView';
import AboutPage from './Pages/AboutPage/AboutPage';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.notesaver.isAuthenticate);
  const currentId = useSelector(state => state.notesaver.currentUserId);
  const showAlert = useSelector(state => state.notesaver.showAlertBox);
  const showCloneShare = useSelector(state => state.notesaver.displayShareOption);
  const showCodeBox = useSelector(state => state.notesaver.displayCodeBox);
  const showLinkBox = useSelector(state => state.notesaver.displayLinkBox);
  const shareEditBox = useSelector(state => state.notesaver.shareEditCodeBox);
  const profileViewBox = useSelector(state => state.notesaver.profileViewBox);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const currId = decoded.id;
      dispatch(setUserName(decoded.username));
      dispatch(setIsAuthenticate(true));
      dispatch(setCurrentUserId(currId));
    }
    else {
      dispatch(setIsAuthenticate(false));
    }
    setAuthChecked(true);
  }, [navigate, isAuthenticated]);


  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        localStorage.removeItem('token');
        dispatch(setIsAuthenticate(false));
        navigate('/');
      }
    };
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);

  if (!authChecked) return null; // loader

  return (
    <>
      {showAlert ? <AlertOption /> : null}
      {showCloneShare ? <ShareOption /> : null}
      {showCodeBox ? <CodeBox /> : null}
      {showLinkBox ? <ShareLink /> : null}
      {shareEditBox ? <CodeBox codeType={'shareEdit'} /> : null}
      {profileViewBox ? <ProfileView /> : null}
      <div className={`${(showAlert || showCloneShare || showCodeBox || showLinkBox || shareEditBox || profileViewBox) ? ' blur-sm pointer-events-none' : "bg-[#EBE8DB]"}`}>
        <Navbar />
        <div className='pt-14'></div>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={`/v1/all-notes/${currentId}`} /> : <LandingPage />} />
          <Route path={`/v1/all-notes/${currentId}`} element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
          <Route path={`/v1/add-new/${currentId}`} element={isAuthenticated ? <NewPage /> : <Navigate to="/" />} />
          <Route path="/v1/view-note/:id" element={<ViewPage />} />
          <Route path="/v1/write-original-file/:id" element={<EditShare />} />
          {/* <Route path="/v1/view-share-file/:id" element={<ShareView />} /> */}
          <Route path="/v1/edit-page/:id" element={isAuthenticated ? <EditPage /> : <Navigate to="/" />} />
          {/* <Route path="/v1/enter-share-code/:id" element={isAuthenticated ? <EnterCode /> : <Navigate to="/" />} /> */}
          <Route path="/v1/about" element={<AboutPage />} />
          <Route path="*" element={isAuthenticated ? <Navigate to={`/v1/all-notes/${currentId}`} /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
