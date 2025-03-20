import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import NewPage from './Pages/NewPage/NewPage'
import HomePage from './Pages/HomePage/HomePage'
import ViewPage from './Pages/ViewPage/ViewPage'
import EditPage from './Pages/EditPage/EditPage'

function App() {

  return (
    <>
      <Navbar />
      <div className='pt-14'></div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/v1/all-notes/:id" element={<HomePage />}></Route>
        <Route path="/v1/add-new/:id" element={<NewPage heading="Add Your New Note" btnName="Save Note" edit={true} />}></Route>
        <Route path="/v1/view-note/:id" element={<ViewPage />}></Route>
        <Route path="/v1/edit-page" element={<EditPage />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
