import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import AddNew from './Components/AddNew/AddNew'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import ViewPage from './Components/ViewPage/ViewPage'
import EditPage from './Components/EditPage/EditPage'

function App() {

  return (
    <>
      <Navbar />
      <div className='pt-14'></div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add-new" element={<AddNew heading="Add Your New Note" btnName="Save Note" />}></Route>
        <Route path="/view-page" element={<ViewPage />}></Route>
        <Route path="/edit-page" element={<EditPage />}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
