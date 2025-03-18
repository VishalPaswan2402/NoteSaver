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
        <Route path="/v1/add-new" element={<AddNew heading="Add Your New Note" btnName="Save Note" edit={true} />}></Route>
        <Route path="/v1/view-note/:id" element={<ViewPage />}></Route>
        <Route path="/v1/edit-page" element={<EditPage />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
